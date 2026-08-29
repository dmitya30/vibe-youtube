# Статический аудит production-экспортов n8n — ЭЛИОР

## 0. Итоговый статус

**Заключение: `NOT READY`**

**Причина:** базовый cold-start путь и per-video deep-link marker реализованы, но надёжный атрибутированный YouTube-probe сейчас блокируют:

1. **RISK — source не является неизменяемым first-touch:** повторный `/start` до начала анкеты может перезаписать исходный YouTube-marker на `organic`.
2. **RISK — `/stats` не является корректной воронкой:** T3 может превышать T1/T2, T2 не означает фактическое начало анкеты, нет временного окна и фильтра тестовых пользователей.
3. **RISK — нет событийной аналитики по ключевым этапам:** выбор направления, конец портрета, просмотр «Новой сферы», generation start и подтверждённая доставка не логируются как отдельные события.
4. **UNKNOWN / REQUIRED ARTIFACT — отсутствует входящий платёжный webhook/caller**, который преобразует callback платёжного провайдера и вызывает `5. ELYOR Payment`.
5. **RISK — fulfillment платежа не идемпотентен:** повторный `payment.succeeded` может повторно запустить генерацию.
6. **RISK — при сбое генерации пользователь может навсегда остаться в `status = symbol` без пользовательского recovery.
7. **RISK — в экспортированных workflow обнаружены встроенные секреты.** Они здесь не воспроизводятся; их необходимо немедленно отозвать/ротировать.
8. **RISK — доступ к символам проверяется по `symbol_id`, но не по владельцу**, что создаёт риск просмотра чужого символа при подделанном callback.
9. **RISK — пользовательский текст утверждает, что данные не передаются третьим лицам, но workflow передаёт их внешним AI/image API и в административный Telegram-чат.**

При ограничении цели только первым бесплатным символом и при ручной сверке таблиц возможен небольшой диагностический тест, но это ещё не надёжный production probe.

---

# 1. Проанализированные workflow и связи

| Workflow | ID | Назначение | Связи |
|---|---:|---|---|
| `1. ELYOR START` | `meq7Gvk7VUuryzLh` | Telegram webhook, маршрутизация, пользователи, меню, сферы, daily touches, `/stats` | Вызывает `2. Questionnaire`, `3. Symbol Generator`, `4. Consultant` |
| `2. Questionnaire` | `IRPY3ba4mQJOwMqT` | Полная анкета, короткая анкета для доп. сферы, создание платежа | YooKassa API; Payments DB |
| `3. Symbol Generator` | `nG7ztSDrntXfxeDG` | LLM-описание, генерация изображения, отправка и сохранение символа | OpenRouter, внешний image API, Telegram |
| `4. Consultant` | `6ElCM4z0bc4Yyidz` | AI-консультант и история диалога | OpenRouter, Consult Log |
| `5. ELYOR Payment` | `fbANVO6Cvfje9iOj` | Обработка нормализованного `payment.succeeded`, запуск платной генерации | Вызывает `3. Symbol Generator` |

### Недостающие обязательные артефакты

- **UNKNOWN / REQUIRED ARTIFACT — платёжный ingress/caller.**  
  `5. ELYOR Payment`, node `Start`, является `executeWorkflowTrigger`, но среди предоставленных workflow нет node, который вызывает этот workflow.
- **UNKNOWN / REQUIRED ARTIFACT — error workflow `oVF9AY4mMQntFBci`.**  
  Он указан в `settings.errorWorkflow` у всех пяти workflow, но его экспорт отсутствует.
- **UNKNOWN / REQUIRED ARTIFACT — фактические настройки и ограничения Data Tables:** уникальные индексы, типы, retention, права доступа.
- **UNKNOWN / REQUIRED ARTIFACT — реальные ответы и SLA внешних API:** Telegram, OpenRouter, YooKassa, image API.
- **UNKNOWN / REQUIRED ARTIFACT — отдельная продуктовая документация.**  
  В запросе есть ожидаемый продуктовый маршрут, но отдельный документ спецификации не приложен.

---

# 2. Фактическая user journey

## 2.1. Новый пользователь из YouTube

```text
YouTube-ссылка
  → Telegram /start <marker>
  → webhook
  → нормализация start_param
  → поиск пользователя
  → если пользователя нет:
       Send Intro
       Create User(status=new, source=<marker>)
  → кнопка «Начать Путь» / form_flow
  → status=form
  → полная анкета из 18 вопросов
  → экран проверки ответов
  → кнопка generate_symbol
  → status=symbol
  → Symbol Generator
  → LLM
  → image API
  → sendPhoto пользователю
  → запись Symbols DB
  → status=DONE
  → кнопки «Мои ЭЛИОРы» / «Новая сфера»
```

### Доказательства

- **OBSERVED IN WORKFLOW — deep-link извлекается.**  
  `1. ELYOR START`, node `extractUserInfo`:
  ```js
  normalized.start_param = msg.text.split(' ')[1];
  normalized.text = '/start';
  ```

- **OBSERVED IN WORKFLOW — пользователь создаётся только после обработки первого update.**  
  `1. ELYOR START`, node `MAIN ROUTER`:
  ```js
  if (!userRecord.user_id) {
      return [{ route: 'create-user', updateFields: {} }];
  }
  ```

- **OBSERVED IN WORKFLOW — source сохраняется в Users DB.**  
  `1. ELYOR START`, node `Create User`, field `source`:
  ```js
  const p = ...start_param;
  if (!p) return 'organic';
  if (p.startsWith('ref_')) return 'referral';
  return p;
  ```

- **OBSERVED IN WORKFLOW — первый символ запускается кнопкой `generate_symbol`.**  
  `1. ELYOR START`, node `MAIN ROUTER`:
  ```js
  if (status === 'form' && event === 'callback_query') {
    if (text === 'generate_symbol') {
      return [{ route: 'generate_symbol',
                updateFields: { status: 'symbol' } }];
    }
  }
  ```

---

## 2.2. Сколько вопросов проходит новый пользователь

**OBSERVED IN WORKFLOW — новый пользователь проходит 18 вопросов.**

Источник: `2. Questionnaire`, node `Create Form`, field `remainingQuestions`.

Категории:

1. `name`
2. `birth`
3. `animal`
4. `element`
5. `season`
6. `color_stone`
7. `elemental_force`
8. `symbol`
9. `signs`
10. `sound`
11. `scent`
12. `energy`
13. `emotion`
14. `happiness`
15. `destiny_feeling`
16. `main_request`
17. `intent`
18. `vision`

Вопросы 3–15 можно фактически «пропустить» кнопкой, но в `answers` всё равно сохраняется значение `Не указано`. Поэтому путь остаётся 18-шаговым.

---

## 2.3. Этапы пути

| Этап | Как реализован | Можно ли однозначно отличить |
|---|---|---|
| Старт | Создание/наличие строки Users DB | Частично |
| Начало анкеты | `status = form`; Forms DB `formState = work` | Частично |
| Завершение портрета, Q15 | Наличие `destiny_feeling` в JSON `answers` | Только snapshot, без timestamp |
| Выбор направления, Q16 | `main_request` в `answers` | Только snapshot, без timestamp |
| Завершение запроса, Q18 | `formState = PASSED` | Да как состояние, без event timestamp |
| Запуск генерации | `status = symbol` | Как текущее состояние, не как историческое событие |
| Успешная генерация | строка в Symbols DB, `Status = GENERATED` | Да |
| Фактическое получение пользователем | отдельного delivery event нет | Нет, не полностью |

### Важное различие

- **OBSERVED IN WORKFLOW — Symbols DB фиксирует завершённый downstream-путь.**  
  `3. Symbol Generator`, node `Ins Symbols`, fields:
  - `Status = GENERATED`
  - `symbol_id`
  - `symbol_generated_at`
  - `is_paid`
  - `image_ID`
  - `image_URL`

- **RISK — это не абсолютно надёжное подтверждение получения.**  
  `3. Symbol Generator`, node `ElyorSentUser`, проглатывает ошибки отправки:
  ```js
  try {
    ans = await .../sendPhoto
  } catch (e) {}
  ```
  После этого workflow продолжает выполнение. Нет отдельного поля `delivery=sent`.

---

## 2.4. Повторный `/start`

### Текущее поведение

`1. ELYOR START`, node `MAIN ROUTER`:

| Текущий status | Повторный `/start` |
|---|---|
| `new` | `init-user`, сообщение «Путь уже начат» |
| `form` | `ask-restart-form` |
| `symbol` | `wait-symbol` |
| `DONE` | `menu` |
| `CONSULTATION` | выход из консультации и меню |
| `KICKED` | восстановление предыдущего статуса |

### Критический дефект first-touch attribution

**RISK — повторный `/start` при `status = new` снова проходит через `Create User`, который выполняет upsert source.**

Связь:

```text
MAIN ROUTER route=init-user
→ routeCheck
→ TG Send Continue
→ Create User
```

`1. ELYOR START`, node `Create User`, field `source` вычисляется заново из текущего `start_param`.

Если пользователь сначала пришёл:

```text
/start yt_video_001
```

а затем до нажатия «Начать Путь» отправил обычный:

```text
/start
```

то `start_param` отсутствует и source может стать:

```text
organic
```

Следовательно, текущая реализация не гарантирует неизменяемый first-touch.

---

# 3. Source/deep-link contract

## 3.1. Точный синтаксис Telegram-ссылки

```text
https://t.me/yourElyor_bot?start=<SOURCE_MARKER>
```

Пример для отдельного YouTube-видео:

```text
https://t.me/yourElyor_bot?start=yt_video_001
```

Примеры схемы:

```text
yt_v001
yt_v002
yt_relationship_001
yt_channelA_v001
```

Для внешней атрибуции не следует использовать префикс `ref_`, если это не реферальная ссылка.

## 3.2. Правила интерпретации payload

**OBSERVED IN WORKFLOW — marker без `ref_`:**

```text
/start yt_v001
→ source = yt_v001
→ referred_by = ""
```

**OBSERVED IN WORKFLOW — реферальный marker:**

```text
/start ref_12345
→ source = referral
→ referred_by = 12345
```

**OBSERVED IN WORKFLOW — без marker:**

```text
/start
→ source = organic
```

Доказательство: `1. ELYOR START`, node `Create User`, fields `source`, `referred_by`.

## 3.3. Можно ли присвоить marker каждому видео

**OBSERVED IN WORKFLOW — да.** Произвольный payload, кроме специальной обработки `ref_`, сохраняется как `Users.source`.

**RISK — ограничения формата payload не валидируются workflow.** Следует использовать короткие ASCII-маркеры из букв, цифр и `_`, например:

```text
yt_v001
```

**RISK — marker сохраняется только при создании/upsert пользователя, а не как отдельное событие каждого `/start`.**

**RISK — marker может быть перезаписан повторным `/start` в статусе `new`.**

## 3.4. Отделяются ли YouTube-пользователи от прежней базы

**OBSERVED IN WORKFLOW — новые пользователи с новым marker могут быть отделены по `Users.source`.**

**RISK — прежняя база в основном останется `unknown`.** Свежий `/stats` показывает:

- `unknown`: 155
- `site_elyor_footer`: 1
- `organic`: 1

**RISK — существующий пользователь, открывший YouTube deep link, не получает новый source.**  
Если строка пользователя уже существует, `MAIN ROUTER` не выбирает `create-user`; marker не логируется как touch/campaign event.

Следовательно:

- новый Telegram-пользователь/новая строка — может быть атрибутирован;
- существующий пользователь — YouTube-переход отдельно не фиксируется;
- ретаргетинг старой базы и cold-start acquisition не разделены событийно.

---

# 4. Фактическая карта состояний

```text
нет записи
  → create-user
  → new

new
  → form_flow
  → form

form
  → 18 ответов
  → formState=PASSED
  → generate_symbol
  → symbol

symbol
  → успешная генерация
  → DONE

DONE
  → /start → menu
  → произвольное сообщение → CONSULTATION
  → new_sphere → выбор ns_<direction>
  → form + pending_direction
  → короткая анкета из 2 вопросов
  → pending payment
  → DONE
  → payment.succeeded
  → paid symbol generation
  → DONE

CONSULTATION
  → exit_consult, /start или /menu
  → previous_status, обычно DONE

любой сохранённый пользователь
  → block bot
  → KICKED или удаление строки для незавершённых пользователей
```

---

# 5. Таблица событий и доступных полей

Здесь «событие» означает то, что можно реконструировать из текущих таблиц. Большинство пунктов не являются append-only event log.

| Событие/этап | Фактический маркер | Поля | Надёжность |
|---|---|---|---|
| Пользователь существует | Users row | `user_id`, `source`, `status` | Средняя |
| Первый source | Users row | `source`, `referred_by` | Низкая: mutable |
| Начало анкеты | `Users.status != new` в `/stats` | `status` | Низкая: это не точное событие |
| Активная анкета | Users + Forms | `status=form`, `formState=work` | Средняя |
| Ответ на вопрос | Forms snapshot | `answers`, `currentCategory` | Низкая: нет timestamp |
| Портрет завершён | `destiny_feeling` присутствует | `answers` | Реконструируемо |
| Направление выбрано | `main_request` присутствует | `answers` | Реконструируемо |
| Запрос завершён | `formState=PASSED` | Forms fields | Средняя |
| Generation start | `Users.status=symbol` | `status` | Низкая как история |
| Символ сгенерирован | Symbols row | `symbol_id`, `direction`, `symbol_generated_at`, `is_paid`, `Status` | Высокая для генерации |
| Символ доставлен | Нет отдельного поля | Косвенно `image_ID` | Недостаточно |
| Просмотр «Мои ЭЛИОРы» | Не логируется | — | Не измеряется |
| Просмотр «Новая сфера» | Не логируется | — | Не измеряется |
| Выбор дополнительной сферы | Временно `pending_direction` | `pending_direction` | Mutable; после оплаты очищается |
| Начало короткой анкеты | Forms `formState=short` | `currentCategory=intent` | Средняя |
| Payment created | Payments row | `payment_id`, `amount`, `direction`, `status=pending`, `created_at`, `idempotence_key` | Высокая |
| Payment succeeded | Payments update | `status=succeeded`, `paid_at` | Зависит от отсутствующего caller |
| Paid fulfillment | Symbols row | `is_paid=true` | Риск повторов |
| Вход в консультант | Consult Log user row | `user_id`, `ts`, `symbol_id`, `role=user` | Высокая |
| Ответ консультанта | Consult Log assistant row | `role=assistant`, `message`, `ts` | Высокая |
| Daily touch sent | Touch State update | `last_touch_date`, `touch_streak`, `last_touch_key` | Только успешная доставка |
| Daily touch failed | Не сохраняется | transient `delivery`, `tg_error` | Исторически не измеряется |
| Частота сообщений | Users row | `touch_frequency` | Текущее состояние |
| Блокировка | `status=KICKED` только для части пользователей | `previous_status` | Неполная |

---

# 6. Что можно измерить сейчас

## 6.1. По источникам

**OBSERVED IN WORKFLOW — можно посчитать:**

- текущее число Users по `source`;
- число уникальных пользователей с Symbols DB по source через join `user_id`;
- платящих пользователей по source;
- число payment rows и выручку;
- generated symbols по `direction`;
- free/paid symbols через `is_paid`;
- пользователей, входивших в Consultant;
- пользователей с успешными daily touches;
- текущую частоту сообщений и число `touch_frequency=off`.

## 6.2. Первый бесплатный символ как YouTube conversion artifact

**INFERENCE — да, первый бесплатный символ может быть основным conversion artifact для YouTube.**

Практическое определение:

```text
Users.source = <YouTube marker>
AND
Symbols.user_id = Users.user_id
AND
Symbols.is_paid = false
AND
Symbols.symbol_generated_at попадает в окно теста
```

Это лучше текущего T3 `/stats`, потому что позволяет:

- выделить конкретное видео;
- отделить free symbol от paid symbol;
- использовать timestamp Symbols DB;
- не смешивать количество символов с числом пользователей.

**RISK — это гарантирует генерацию/сохранение, но не на 100% подтверждает успешную доставку пользователю.**

Для строгого conversion artifact нужен отдельный append-only event:

```text
symbol_delivered
```

после подтверждённого успешного Telegram `sendPhoto`.

---

# 7. Что нельзя измерить сейчас

1. **UNKNOWN / RISK — реальное количество `/start`.**  
   T1 считает строки Users, а не update-события `/start`.

2. **RISK — первый и повторные `/start` отдельно.**  
   Нет start event log и timestamp.

3. **RISK — точное начало анкеты.**  
   T2 использует `status != new`, а не событие `questionnaire_started`.

4. **RISK — completion rate каждого вопроса во времени.**  
   `answers` — mutable JSON snapshot без per-answer timestamps.

5. **RISK — точный переход Q15 → Q16.**

6. **RISK — просмотр кнопки/экрана «Новая сфера».**  
   Callback `new_sphere` не логируется.

7. **RISK — переход первый символ → просмотр «Новой сферы».**

8. **RISK — click-through на конкретную дополнительную сферу исторически.**  
   `pending_direction` временный и очищается.

9. **RISK — generation attempts и failure rate.**  
   Нет отдельного generation log.

10. **RISK — время от generation start до delivery.**

11. **RISK — гарантированную доставку символа.**

12. **RISK — ошибки daily touches исторически.**  
    Ветка `blocked/error` у `Route Delivery` не подключена к persistent log.

13. **RISK — YouTube reactivation существующих пользователей.**  
    Deep-link marker существующего пользователя не логируется.

14. **RISK — конверсию по временному окну в текущем `/stats`.**

15. **RISK — чистые production-метрики без внутренних и тестовых пользователей.**

---

# 8. Актуальные цены и paywall

## 8.1. Первый символ

**OBSERVED IN WORKFLOW — первый символ бесплатный.**

После полной анкеты кнопка:

```text
generate_symbol
```

сразу вызывает `3. Symbol Generator`; платёжной ветки перед первым символом нет.

## 8.2. Paywall после первого символа

Фактический путь:

```text
первый символ
→ «Новая сфера»
→ выбор одной из ещё не созданных сфер
→ короткая анкета: intent + vision
→ создание платежа
→ кнопка YooKassa
→ после payment.succeeded автоматическая генерация
```

**OBSERVED IN WORKFLOW — короткая анкета состоит из двух вопросов.**

Источник:

- `1. ELYOR START`, node `SF Form`:
  - `currentCategory = intent`
  - `remainingQuestions = [{category: vision, ...}]`
  - `formState = short`

## 8.3. Фактическая текущая цена

**OBSERVED IN WORKFLOW — активная цена одной дополнительной сферы: `690 ₽`.**

`2. Questionnaire`, node `Pay Create`:

```js
const tier = 'el_direct';
const PRICES = {
  el_direct: 69000,
  el_pack: 199000
};
```

Суммы хранятся в копейках:

```text
69000 → 690 ₽
```

## 8.4. Цена пакета

**OBSERVED IN WORKFLOW — в коде присутствует `el_pack = 1990 ₽`.**

Но:

```js
const tier = 'el_direct';
```

зафиксирован жёстко.

**RISK — пакет за 1990 ₽ недоступен из фактического пользовательского пути.**  
Нет ветки выбора `el_pack`, нет кнопки пакета, нет переключения tier.

Итого:

| Продукт | Настроенная цена | Доступность |
|---|---:|---|
| Первый символ | Бесплатно | Доступен |
| Одна дополнительная сфера | 690 ₽ | Доступна |
| Пакет символов | 1990 ₽ | Не достижим из UI |

---

# 9. Платёжный аудит

## 9.1. Создание платежа

**OBSERVED IN WORKFLOW — создаётся YooKassa payment с redirect confirmation.**

`2. Questionnaire`, node `Pay Create`:

- `capture: true`
- `confirmation.type: redirect`
- metadata:
  - `user_id`
  - `tier`
  - `direction`
  - `symbol_id`

Затем создаётся строка Payments DB:

- `payment_id`
- `user_id`
- `direction`
- `amount`
- `status=pending`
- `created_at`
- `idempotence_key`

## 9.2. Idempotence-Key создания платежа

**OBSERVED IN WORKFLOW — технический key передаётся провайдеру:**

```js
const idempotenceKey = `${user_id}_${tier}_${Date.now()}`;
```

**RISK — это не защищает от повторного клика или повторного запуска workflow.**  
Каждый запуск получает новый `Date.now()`, следовательно, новый ключ и потенциально новый payment.

Нет:

- поиска существующего pending payment;
- business key на пользователя+сферу;
- срока действия pending;
- блокировки повторного создания.

## 9.3. Обработка success

`5. ELYOR Payment`, node `ok?` принимает только:

```text
event == payment.succeeded
```

Затем:

1. `Pay Upd` → `status=succeeded`, `paid_at=now`;
2. `Dir Upd` → `pending_direction=direction`;
3. `Call Gen` → `3. Symbol Generator`.

## 9.4. Критические неизвестные

**UNKNOWN / REQUIRED ARTIFACT — кто вызывает `5. ELYOR Payment`.**

Не предоставлены:

- webhook node;
- проверка подлинности callback;
- преобразование реального payload в плоские поля:
  - `event`
  - `payment_id`
  - `user_id`
  - `direction`;
- проверка суммы;
- проверка валюты;
- проверка metadata;
- сопоставление с исходной pending payment row.

Поэтому успешность production payment fulfillment статически не подтверждается.

## 9.5. Fulfillment не идемпотентен

**RISK — повторный `payment.succeeded` повторно вызывает генератор.**

В `5. ELYOR Payment` нет проверки:

```text
payment.status already succeeded?
symbol already exists for payment_id?
fulfillment_completed?
```

`3. Symbol Generator`, node `Prompt`, создаёт новый ID по timestamp:

```js
const symbol_id = `${uid}_${direction}_${stamp}`;
```

Повторный callback может создать ещё один символ.

**RISK — `payment_id` не сохраняется в Symbols DB.**  
Нельзя однозначно доказать, какой символ был fulfillment конкретного платежа.

---

# 10. Сбой генерации изображения

## 10.1. Что происходит

`3. Symbol Generator`, node `GEN ELYOR`:

- создаёт external image job;
- опрашивает статус каждые 5 секунд;
- максимум 60 попыток;
- максимальное ожидание около 5 минут;
- при `failed/error` бросает исключение;
- при timeout бросает исключение.

## 10.2. Retry

- **OBSERVED IN WORKFLOW — LLM имеет retry:**  
  node `LLM`: `retryOnFail=true`, `maxTries=5`, `waitBetweenTries=5000`.

- **OBSERVED IN WORKFLOW — image generation node не имеет n8n retryOnFail.**  
  Внутри только polling одной созданной задачи.

## 10.3. Пользовательское поведение после ошибки

Перед генерацией:

- `Upd Status-symbol` ставит `status=symbol`;
- пользователю отправляется сообщение ожидания;
- может быть отправлен WAIT sticker.

При исключении workflow прекращается до:

- `Ins Symbols`;
- `UPD Users`, где должен быть установлен `status=DONE`.

**RISK — пользователь остаётся в `status=symbol`.**

Повторный `/start` маршрутизируется в:

```text
wait-symbol
→ TG be calm
```

То есть бот продолжает говорить «подождите», даже если генерация уже необратимо упала.

## 10.4. Error workflow

**UNKNOWN / REQUIRED ARTIFACT — поведение error workflow `oVF9AY4mMQntFBci`.**

Без него нельзя установить:

- уведомляется ли администратор;
- выполняется ли retry;
- сбрасывается ли `status`;
- получает ли пользователь сообщение об ошибке;
- создаётся ли dead-letter запись.

---

# 11. «Новая сфера» и прямое направление

## 11.1. Можно ли измерить просмотр «Новой сферы»

**OBSERVED IN WORKFLOW — нет.**

Callback:

```text
new_sphere
```

маршрутизируется в `Get Syms2 → New Sph`, но отдельная запись в таблицу не создаётся.

Можно увидеть только более поздние состояния:

- выбранная сфера временно попадает в `pending_direction`;
- может появиться pending payment;
- может появиться новый symbol.

**RISK — view-to-selection и first-symbol-to-new-sphere-view не измеряются.**

## 11.2. Можно ли направить пользователя сразу в сферу «отношения»

**OBSERVED IN WORKFLOW — текущий source marker не управляет onboarding.**

Deep link:

```text
/start yt_relationship
```

сохранит только:

```text
source = yt_relationship
```

Но пользователь всё равно пройдёт 18 вопросов и выберет `main_request` на Q16.

**RISK — payload не разбирается в `pending_direction` или предварительно выбранный `main_request`.**

Следовательно:

- атрибутировать видео про отношения можно;
- автоматически открыть/выбрать `relationship` нельзя;
- нормальный onboarding не ломается, но прямого routing нет.

**INFERENCE — безопасный текущий вариант:** использовать marker, отражающий тему видео, но оставить реальный выбор пользователю:

```text
yt_relationship_v001
```

---

# 12. Daily Messages и консультант

## 12.1. Ежедневные Послания

`1. ELYOR START`, ветка `Schedule → Get Users → Get Symbols → Touch State → Get Touches → Selector → Send Touch`.

**OBSERVED IN WORKFLOW:**

- selector использует timezone `Europe/Moscow`;
- частоты:
  - `daily`;
  - `few_week` — понедельник, среда, пятница;
  - `off`;
- выбирается `active_symbol_id`;
- fallback — самый свежий символ;
- daily dedup — по `last_touch_date`;
- рассчитывается streak;
- `Touch State` обновляется только после `delivery=sent`.

## 12.2. Ошибки доставки daily message

`Send Touch` классифицирует:

```text
sent
blocked
error
```

Но `Route Delivery` подключён только по ветке `sent`.

**RISK — blocked/error не сохраняются и не получают retry.**

**RISK — пользователь с фактической блокировкой, обнаруженной scheduled send, не переводится в `KICKED`.**  
Он может снова попадать в последующие scheduled attempts.

## 12.3. Возвраты в консультанта

**OBSERVED IN WORKFLOW — любое обычное сообщение пользователя со статусом `DONE` переводит его в `CONSULTATION`.**

`1. ELYOR START`, node `MAIN ROUTER`:

```js
case 'DONE':
  return [{
    route: 'consultant',
    updateFields: {
      previous_status: 'DONE',
      status: 'CONSULTATION',
      symbol_blocked: true
    }
  }];
```

Консультант сохраняет:

- user message;
- assistant response;
- timestamp;
- active `symbol_id`;
- последние 15 реплик используются как контекст.

**OBSERVED IN WORKFLOW — `/start`, `/menu` и `exit_consult` возвращают из консультанта.**

## 12.4. Аналитика консультанта

`/stats` считает уникальные `user_id` из всей таблицы Consult Log.

**RISK — это lifetime reach, а не retention или return rate.**

Не учитываются:

- дата первого входа;
- количество сессий;
- повторные входы;
- source;
- временное окно;
- успешная доставка ответа;
- internal/test filtering.

---

# 13. Разбор свежего `/stats`

Исходные значения:

| Метрика | Значение |
|---|---:|
| T1 | 157 |
| T2 | 157 |
| T3 | 295 |
| T4 | 1 уникальный плательщик |
| Sales | 2 payment rows |
| Revenue | 2 ₽ |
| Touch recipients | 151 |
| Active 1d / 7d / 30d | 129 / 130 / 132 |
| Consultant users | 5 |

## 13.1. T1 — «старт бота: 157»

**OBSERVED IN WORKFLOW — T1 фактически равен числу текущих строк Users DB:**

```js
const T1 = users.length;
```

Это не число:

- `/start`;
- уникальных стартов за период;
- новых пользователей за период;
- YouTube arrivals.

**RISK — подпись «старт бота» некорректна.**  
Корректнее: «строк в Users DB на момент отчёта».

## 13.2. T2 — «начали анкету: 157»

Код:

```js
const T2 = users.filter(u => u.status && u.status !== 'new').length;
```

**RISK — T2 не означает начало анкеты.**

В T2 попадают, например:

- `form`;
- `symbol`;
- `DONE`;
- `CONSULTATION`;
- `KICKED`.

100% означает только, что среди текущих 157 строк нет `status=new`, а не то, что каждый реально начал анкету в одной когорте.

## 13.3. T3 — «получили символ: 295»

Код:

```js
const usersWithSymbol = new Set(symbols.map(s => String(s.user_id)));
const T3 = usersWithSymbol.size;
```

**OBSERVED IN WORKFLOW — T3 считается по уникальным user_id Symbols DB.**

**RISK — T3 и T1 имеют разные population bases.**

Причина возможного `295 > 157`:

- Symbols DB содержит пользователей, которых уже нет в Users DB;
- при блокировке незавершённые Users rows могут удаляться;
- Symbols DB при этом не очищается;
- старые или тестовые symbols остаются;
- временного фильтра нет.

`1. ELYOR START`, node `DELETE User`, удаляет пользователя при блокировке, если status не `DONE`, но каскадного удаления Symbols DB не видно.

Поэтому `187.9%` не является conversion rate.

## 13.4. T4 — «купили доп: 1»

Код считает уникальных плативших:

```js
new Set(
  payments
    .filter(p => p.status === 'succeeded')
    .map(p => String(p.user_id))
)
```

**OBSERVED IN WORKFLOW — T4 = уникальные платившие пользователи, а не продажи.**

Две продажи и один T4 согласуются, если один пользователь имеет две succeeded payment rows.

**RISK — `0.3% от T3` статистически некорректно**, потому что T3 содержит исторических/orphan users из другой population base.

## 13.5. Revenue: 2 sales, 2 ₽

Код:

```js
Number(p.amount) / 100
```

**OBSERVED IN WORKFLOW — в Payments DB сумма трактуется как копейки.**

Две succeeded rows с общей суммой 200 копеек дадут 2 ₽.

**RISK — это резко расходится с текущей configured price 690 ₽.**

Возможные объяснения нельзя утверждать без данных:

- старые тестовые платежи;
- payment records по 1 ₽;
- ручные записи;
- историческая конфигурация;
- sandbox/test transactions.

**UNKNOWN / REQUIRED ARTIFACT — содержимое двух succeeded payment rows и среда YooKassa.**

## 13.6. Источники

```text
unknown 155
site_elyor_footer 1
organic 1
```

**OBSERVED IN WORKFLOW — `unknown` используется в отчёте, если `u.source` пуст:**

```js
const s = u.source || 'unknown';
```

Это означает:

- 98.7% текущей Users DB не имеют сохранённого source;
- текущая аналитика почти полностью unattributed;
- source rollout был добавлен после формирования основной базы либо данные ранее не заполнялись.

## 13.7. Платящие по источникам

```text
organic: 1
```

Это один уникальный user_id из succeeded payments, соединённый с текущим `Users.source`.

**RISK — отсутствующий Users row дал бы `unknown`; повторно изменённый source изменил бы историческую атрибуцию платежа.**

Payment row не хранит immutable acquisition source.

## 13.8. Retention

### «Получали касания: 151»

Это:

```js
touchStates.length
```

**OBSERVED IN WORKFLOW — число строк Touch State, а не пользователей текущей когорты.**

### Active 1d / 7d / 30d

Активность считается по `last_touch_date`, то есть по последней успешной автоматической отправке.

**RISK — это не user activity и не классический retention.**

Пользователь может:

- не открыть сообщение;
- не нажать кнопку;
- не вернуться в бот;
- но считаться active, если Telegram принял отправку.

Корректное название:

```text
пользователи с успешно доставленным daily touch за последние N дней
```

### Streak 55.4 / max 65

**OBSERVED IN WORKFLOW — streak отражает последовательные даты успешной отправки, а не пользовательские сессии.**

### Отключили 9 — 5.7%

**OBSERVED IN WORKFLOW — считается текущее `touch_frequency=off` относительно T1.**

### Consultant 5 — 1.7% от T3

**RISK — denominator T3 некорректен.**

Кроме того, 5 — lifetime unique users в Consult Log, а не пользователи, вернувшиеся после символа в выбранном периоде.

---

# 14. Test/internal-user filtering

## 14.1. Входящие Telegram updates

`1. ELYOR START` фильтрует:

- несколько фиксированных service/bot IDs;
- group/channel updates;
- часть non-person updates.

**OBSERVED IN WORKFLOW — есть service filtering**, nodes:

- `SERVICES?`
- `NOT PERSON?`

## 14.2. Аналитика

**RISK — `/stats` не исключает:**

- двух администраторов, которым доступна `/stats`;
- разработчиков;
- тестовые user IDs;
- test source markers;
- тестовые платежи;
- sandbox payments;
- internal/admin symbols;
- старые записи.

Admin IDs используются только для авторизации команды `/stats` в `MAIN ROUTER`, но не исключаются из таблиц в `Stats Calc`.

Следовательно, для YouTube probe текущий analytics output загрязняем внутренними и историческими данными.

---

# 15. Безопасность и приватность

## 15.1. Экспортированные секреты

**RISK — в JSON присутствуют встроенные production-like секреты:**

- Telegram bot token в URL двух webhook setup nodes;
- bearer token внешнего image API в Code node;
- credential references к OpenRouter;
- ссылки на внутренние таблицы и инфраструктуру.

Точные значения здесь намеренно не воспроизводятся.

### Обязательное действие

- отозвать и перевыпустить обнаруженные токены;
- заменить hardcoded secrets на n8n credentials/environment variables;
- проверить историю репозитория, backups и chat attachments;
- перепривязать Telegram webhook после ротации.

## 15.2. Несоответствие privacy copy

**OBSERVED IN WORKFLOW — пользователю показывается утверждение, что персональные данные не передаются третьим лицам.**

`2. Questionnaire`, node `Create Form`, текст Q1 содержит соответствующее обещание.

При этом:

- анкета отправляется в OpenRouter через `3. Symbol Generator`, node `LLM`;
- visual prompt отправляется во внешний image API через `GEN ELYOR`;
- имя, возраст, описание, мантра, image и user ID отправляются в административный Telegram-чат через `Elyor 2 Admin`;
- сообщения консультанта отправляются OpenRouter через `4. Consultant`, node `AI Agent`.

**RISK — фактический data flow противоречит пользовательскому обещанию.**

## 15.3. Доступ к чужому symbol_id

**RISK — ownership filter отсутствует.**

`1. ELYOR START`:

- node `Get Sym1` фильтрует только по `symbol_id`;
- node `Get Sym2` фильтрует только по `symbol_id`;
- node `Get Sym` записывает `active_symbol_id`, полученный из callback.

Нет условия:

```text
symbol.user_id == current user_id
```

Пользователь может попытаться отправить поддельный callback:

```text
sym_<foreign_symbol_id>
full_<foreign_symbol_id>
setact_<foreign_symbol_id>
```

Если ID известен или угадан, возможно раскрытие чужого описания/изображения.

---

# 16. Расхождения с продуктовым описанием и интерфейсными утверждениями

| Ожидание/утверждение | Фактическая реализация | Оценка |
|---|---|---|
| T1 — старт бота | Количество текущих Users rows | **RISK — расхождение** |
| T2 — начали анкету | Любой status, кроме `new` | **RISK — расхождение** |
| T3 — получили символ | Уникальные user_id в Symbols DB | **RISK — не delivery и другая база** |
| Retention | Успешная автоматическая отправка touch | **RISK — не user retention** |
| Данные не передаются третьим лицам | Передаются AI/image API и admin Telegram chat | **RISK — существенное расхождение** |
| Точный first-touch source | Source mutable при повторном `/start` в `new` | **RISK** |
| Дополнительные цены | UI фактически предлагает только 690 ₽ | 1990 ₽ не достижимо |
| Payment success автоматически создаёт symbol | Caller success workflow отсутствует | **UNKNOWN** |
| Ошибки обрабатываются | Error workflow отсутствует; status может зависнуть | **UNKNOWN / RISK** |
| «Получили символ» | Нет persisted `symbol_delivered` | **RISK** |
| Переход в «Новую сферу» измеряется | Callback не логируется | **RISK** |
| Deep link может вести в нужную сферу | Payload используется только как source | **OBSERVED — не реализовано** |

---

# 17. Блокирующие дефекты для YouTube probe

## 17.1. Блокеры атрибуции

1. **RISK — source может быть перезаписан повторным `/start` при `status=new`.**
2. **RISK — переход существующего пользователя по YouTube link не логируется.**
3. **RISK — нет `created_at`/`first_started_at` у пользователя.**
4. **RISK — нет append-only start event.**
5. **RISK — `/stats` не поддерживает фильтр source и период для funnel.**
6. **RISK — нет test/internal exclusion.**

## 17.2. Блокеры funnel measurement

1. T1/T2/T3 построены на несовместимых популяциях.
2. T2 не означает начало анкеты.
3. T3 не означает подтверждённую доставку.
4. T3 включает orphan/historical symbol users.
5. Нет событий Q15/Q16/Q18.
6. Нет `new_sphere_view`.
7. Нет generation failure event.
8. Нет delivery event.

## 17.3. Блокеры product reliability

1. Пользователь зависает в `symbol` после ошибки.
2. Missing error workflow.
3. Missing payment ingress.
4. Неидемпотентный paid fulfillment.
5. Silent catches вокруг Telegram delivery.
6. Ownership vulnerability по `symbol_id`.
7. Экспортированные production secrets.

## 17.4. Блокеры compliance

1. Privacy copy не соответствует наблюдаемому data flow.
2. ФИО, дата рождения и сообщения используются во внешних API.
3. Полные персональные результаты отправляются в admin Telegram chat.
4. Нет предоставленной политики retention/deletion.

---

# 18. Неблокирующие ограничения

1. **OBSERVED IN WORKFLOW — полный onboarding длинный:** 18 вопросов.
2. **OBSERVED IN WORKFLOW — прямой routing в сферу отсутствует.**
3. **OBSERVED IN WORKFLOW — пакет 1990 ₽ не доступен.**
4. **RISK — `symbol_id` содержит user ID, direction и timestamp.**
5. **RISK — генератор может ждать около пяти минут.**
6. **RISK — daily touches работают по успешной отправке, а не чтению.**
7. **RISK — Consultant Log хранит полный текст сообщений без видимого retention policy.**
8. **RISK — source хранится только в Users DB, не дублируется в Payments/Symbols как immutable acquisition snapshot.**
9. **UNKNOWN — timezone самого Schedule Trigger:** selector использует Moscow, но instance/workflow timezone из экспорта однозначно не подтверждён.

---

# 19. Минимальный безопасный тест

До исправления блокирующих дефектов безопасен только ручной диагностический smoke test без реальной широкой YouTube-публикации.

## 19.1. Перед тестом

1. Ротировать обнаруженные токены.
2. Проверить/предоставить error workflow.
3. Проверить платёжный webhook caller.
4. Использовать новую тестовую Telegram-учётную запись, которой нет в Users DB.
5. Не вводить реальные ФИО, дату рождения, медицинскую или финансовую информацию.
6. Не проводить реальную оплату до подтверждения payment ingress и идемпотентности.

## 19.2. Marker

Использовать уникальный marker:

```text
yt_probe_v001_a
```

Ссылка:

```text
https://t.me/yourElyor_bot?start=yt_probe_v001_a
```

## 19.3. Последовательность

1. Открыть ссылку один раз.
2. Не нажимать повторно `/start` без payload.
3. Проверить Users DB:
   ```text
   source = yt_probe_v001_a
   status = new
   ```
4. Нажать «Начать Путь».
5. Пройти 18 вопросов синтетическими данными.
6. Проверить Forms DB:
   ```text
   formState = PASSED
   answers содержит 18 категорий
   ```
7. Нажать `generate_symbol`.
8. Проверить:
   ```text
   Symbols.is_paid = false
   Symbols.direction = выбранная сфера
   Symbols.symbol_generated_at заполнено
   Users.status = DONE
   ```
9. Вручную подтвердить, что photo действительно получено.
10. Нажать «Новая сфера» и зафиксировать вручную время, поскольку событие не логируется.
11. Выбрать сферу, ответить на два коротких вопроса.
12. Дойти только до payment button.
13. Не оплачивать в production до проверки отсутствующего callback caller.
14. Проверить, что создана одна pending payment row на 69000 копеек.

## 19.4. Критерий успеха бесплатного probe

```text
Новый user
+ source == test marker
+ один free symbol row
+ ручное подтверждение Telegram delivery
+ no status=stuck
```

---

# 20. Ответы на дополнительные вопросы — кратко

1. **Сколько вопросов проходит новый пользователь?**  
   **OBSERVED IN WORKFLOW — 18.**

2. **Можно ли отличить этапы?**  
   **Частично.** Старт, form, PASSED, symbol и generated различимы; Q15/Q16 — только по mutable answers; фактическая доставка отдельно не фиксируется.

3. **Что при сбое image generation?**  
   **RISK — workflow падает, пользователь, вероятно, остаётся в `status=symbol`; повторный `/start` просит ждать. Поведение error workflow неизвестно.**

4. **Как сохраняется source marker?**  
   **OBSERVED — в `Elyor Users DB.source` при `Create User`; `ref_` превращается в `source=referral` и `referred_by=<suffix>`.**

5. **Отдельный marker каждому видео?**  
   **Да:** `?start=yt_v001`, `?start=yt_v002`.

6. **Paywall после первого бесплатного символа?**  
   «Новая сфера» → выбор сферы → два вопроса → YooKassa payment.

7. **Текущая цена?**  
   **690 ₽ за дополнительную сферу.** 1990 ₽ присутствует в коде как недоступный pack.

8. **Можно ли измерить first symbol → “New sphere” view?**  
   **Нет.** Callback `new_sphere` не логируется.

9. **Можно ли сразу вести в “отношения”?**  
   **Нет.** Marker только атрибутирует source; Q16 остаётся обязательным выбором.

10. **Daily messages и consultant returns?**  
    Daily successful sends учитываются через Touch State; consultant lifetime entry — через Consult Log. Это не классический retention.

11. **YouTube отделяется от прежней базы?**  
    Только новые пользователи с marker. Существующие переходы с YouTube отдельно не фиксируются.

12. **Может ли первый бесплатный symbol быть conversion artifact?**  
    **INFERENCE — да, и это лучший текущий YouTube KPI**, если считать free Symbols rows по source и вручную контролировать delivery.

---

# 21. Рекомендуемый минимальный набор событий до запуска

Для статуса `READY FOR ATTRIBUTED PROBE` необходим append-only event log минимум с такими событиями:

```text
bot_started
questionnaire_started
portrait_completed
direction_selected
request_completed
generation_started
generation_failed
symbol_delivered
new_sphere_viewed
new_sphere_selected
payment_created
payment_succeeded
paid_symbol_delivered
consultant_entered
consultant_returned
touch_sent
touch_failed
```

Общие поля:

```text
event_id
event_name
occurred_at
user_id
source_first
source_current
start_payload
campaign
video_id
direction
symbol_id
payment_id
is_paid
is_internal
workflow_execution_id
delivery_status
error_code
```

---

# 22. Финальная оценка

## Сейчас

**`NOT READY`**

## Что уже работает

- cold-start Telegram deep link;
- marker на отдельное видео;
- 18-вопросный onboarding;
- бесплатный первый символ;
- дополнительные сферы;
- configured paywall 690 ₽;
- symbol/source join;
- daily touches;
- consultant log;
- базовый payment ledger.

## Что нужно исправить перед внешним probe

1. Сделать `source_first` неизменяемым.
2. Логировать каждый `/start` отдельно.
3. Добавить timestamps и append-only funnel events.
4. Добавить `symbol_delivered`.
5. Добавить `new_sphere_viewed`.
6. Переписать `/stats` на cohort/source/time-window funnel.
7. Исключить internal/test users.
8. Предоставить и проверить payment webhook caller.
9. Сделать payment fulfillment идемпотентным.
10. Добавить recovery из `status=symbol`.
11. Проверять ownership символа по `user_id`.
12. Ротировать секреты.
13. Привести privacy notice в соответствие с фактическими внешними процессорами.

После этих исправлений маршрут сможет претендовать на **`READY FOR ATTRIBUTED PROBE`**.

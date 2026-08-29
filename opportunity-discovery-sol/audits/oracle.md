# Статический аудит `Mystic Oracle`

## Итоговый статус

**RISK — `NOT READY`**

**RISK:** Текущая реализация позволяет технически атрибутировать новых пользователей по `source`, но не готова к внешнему YouTube probe как безопасный и достоверно измеримый маршрут. Основные причины:

1. отсутствуют safety-классификация и high-stakes guardrails;
2. нельзя deep-link’ом открыть только безопасный «Оракул решений»;
3. меню открывает предсказательные, кармические и «диагностические» ветки;
4. нет транзакционного журнала и идемпотентности платежей;
5. «успешный ответ» фиксируется до подтверждённой доставки пользователю;
6. нет событийной аналитики и `/stats`;
7. существующие, внутренние и тестовые пользователи не исключаются;
8. приложенный CSV содержит несовместимые с текущей логикой значения `lang`;
9. часть русских текстов и системных промптов в предоставленном JSON выглядит утраченной или повреждённой, поэтому полный safety-аудит формулировок невозможен.

---

# 1. Проанализированные workflow и связи

| Метка | Workflow / артефакт | Роль и связи |
|---|---|---|
| OBSERVED IN WORKFLOW | `Mystic Oracle`, ID `xYNtGnDBeXZhfE8q` | Единственный приложенный workflow. Обрабатывает Telegram updates, пользователей, меню, AI-ответы, изображения, платежи, referrals и reminders. |
| OBSERVED IN WORKFLOW | `Telegram Trigger` | Подписан на `message`, `callback_query`, `pre_checkout_query`, `inline_query`. |
| OBSERVED IN WORKFLOW | `ORACLE Users` / `Mystic Oracle Users`, Data Table ID скрыт | Хранит пользователей, баланс, источник, состояния, счётчики и агрегированный `route_stats`. |
| OBSERVED IN WORKFLOW | Telegram Bot API | Вызывается через Telegram nodes и напрямую через HTTP: `sendInvoice`, `answerPreCheckoutQuery`, `sendPhoto`, `deleteMessage`, `sendMessage`, `editMessageReplyMarkup`. |
| OBSERVED IN WORKFLOW | OpenRouter | Используется в `OpenRouter Chat Model`, `OpenRouter Chat Model1`, `AI Agent`, `Router LLM`. |
| OBSERVED IN WORKFLOW | KIE API | Используется в `Generate Image` и `Transcribe Voice`. |
| OBSERVED IN WORKFLOW | Локальная файловая система и `ffmpeg` | `Pick Cards`, `Create Collage`, `Download Voice`, `Delete Collage`. |
| OBSERVED IN WORKFLOW | Публичный файловый домен | Используется для карт, временных коллажей и голосовых MP3. Полный URL здесь не воспроизводится. |
| UNKNOWN / REQUIRED ARTIFACT | Error workflow | В `settings.errorWorkflow` указан отсутствующий workflow ID. Его обработка ошибок не может быть проверена. |
| UNKNOWN / REQUIRED ARTIFACT | Локальные каталоги карт | Содержимое `/data/files/Oracle/Tarot`, `/Runes`, `/tmp` не приложено. |
| UNKNOWN / REQUIRED ARTIFACT | Внешние API и модели | Фактические moderation policies, SLA, retries и поведение Telegram/OpenRouter/KIE нельзя вывести из JSON. |
| UNKNOWN / REQUIRED ARTIFACT | Отдельное product description | Помимо текстов внутри workflow отдельная продуктовая спецификация не приложена. Сравнение ниже выполнено с UI-copy и заявленной в запросе целью YouTube-маршрута. |

### Поток верхнего уровня

**OBSERVED IN WORKFLOW:**  
`Telegram Trigger → Dictionary → Get User → Check User Exists`.

После `Check User Exists` выполнение расходится параллельно:

- создание нового пользователя;
- сохранение языка;
- сброс истёкшего premium;
- обработка callback/message через `Switch`.

**RISK:** Параллельные ветки `Save New`, `Save Lang` и основной пользовательский путь не транзакционны. Для нового пользователя возможны гонки между upsert-операциями.

---

# 2. Фактическая user journey

## 2.1 Новый пользователь

1. **OBSERVED IN WORKFLOW:** Telegram update поступает в `Telegram Trigger`.
2. **OBSERVED IN WORKFLOW:** `Get User` ищет запись по Telegram user ID.
3. **OBSERVED IN WORKFLOW:** `Check User Exists` создаёт виртуальную модель нового пользователя:
   - `balance: 3`;
   - `current_state: "idle"`;
   - `last_free_date: new Date().toISOString()`;
   - `source`, рассчитанный из `/start`;
   - `referrer_id`, если есть `ref_...`.
4. **OBSERVED IN WORKFLOW:** `Filter New → Save New` сохраняет пользователя.
5. **OBSERVED IN WORKFLOW:** `/start` попадает в output `Start` узла `Switch`.
6. **OBSERVED IN WORKFLOW:** `If Lang Unknown` выбирает:
   - `Send Onboarding Lang`, если Telegram language code не `ru` и не `en`;
   - `Send Onboarding` иначе.
7. **OBSERVED IN WORKFLOW:** Стартовый экран предлагает пять «ситуаций» и переход ко всем восьми оракулам.

## 2.2 Выбор ситуации

**OBSERVED IN WORKFLOW:** Callback `pain_*` обрабатывает `Pain Select`.

Фактическая карта:

| Ситуация | Допустимые оракулы |
|---|---|
| `pain_love` | `tarot`, `karma` |
| `pain_money` | `numerology`, `decision`, `tarot` |
| `pain_dream` | `dream` |
| `pain_choice` | `decision`, `tarot` |
| `pain_future` | `astro`, `energy` |

Доказательство: node `Pain Select`, поле `PAIN_MAP`.

**OBSERVED IN WORKFLOW:** Если допустим один оракул, он выбирается без LLM. Если несколько — `Router LLM` выбирает один только из разрешённого списка.

**RISK:** Даже относительно нейтральный выбор «отношения», «деньги», «выбор» или «будущее» может автоматически отправить пользователя в Tarot, Karma, Astrology, Numerology или Energy Scanner.

## 2.3 Выбор конкретного оракула

**OBSERVED IN WORKFLOW:** Callback `service_<service>` обрабатывает `Service Select`.

Доступны:

- `tarot`;
- `runes`;
- `astro`;
- `dream`;
- `numerology`;
- `karma`;
- `decision`;
- `energy`.

**OBSERVED IN WORKFLOW:** После проверки баланса `Save State` устанавливает:

```text
current_state = waiting_question
selected_service = выбранный service или pain_*
reminder_count = 0
```

## 2.4 Отправка вопроса

**OBSERVED IN WORKFLOW:** Текст без `/` попадает в output `User Question` узла `Switch`.

**OBSERVED IN WORKFLOW:** Голос принимается только при:

```text
message.voice !== undefined
&& current_state === "waiting_question"
```

Доказательство: output `Voice Question` узла `Switch`.

**OBSERVED IN WORKFLOW:** `Check State` считает вопрос валидным только когда сохранённое состояние равно `waiting_question`.

**OBSERVED IN WORKFLOW:** Валидный вопрос переводит пользователя в `processing` через `Set Proc`.

**RISK:** Telegram `update_id`, message ID вопроса или idempotency key не сохраняются. Два параллельных сообщения могут оба увидеть `waiting_question`, оба перейти в обработку и привести к двум ответам/списаниям.

## 2.5 Маршрутизация и генерация

**OBSERVED IN WORKFLOW:**

```text
Set Proc
→ Build Route Prompt
→ If1
→ Router LLM или прямой выбор
→ Apply Route
→ Pick Cards
→ Get Sys Prompt
→ Send Waiting
→ AI Agent
→ Parse Response
```

- Для Tarot/Runes выбираются три карты/руны.
- Для других сервисов модель может вернуть `IMAGE_PROMPT`.
- Для Astrology/Numerology/Karma/Energy возможно извлечение персональных данных через `USER_DATA`.

## 2.6 Завершение ответа

**OBSERVED IN WORKFLOW:** После изображения или коллажа вызывается:

```text
Deduct Balance → Save Deduct → Send Answer → Send Buttons
```

`Deduct Balance`:

- уменьшает баланс на 1, если premium неактивен;
- устанавливает `last_free_date`;
- увеличивает `total_readings`;
- обновляет `route_stats`;
- сбрасывает `current_state` в `idle`.

**RISK:** `Save Deduct` выполняется **до** `Send Answer`. Поэтому `total_readings` и списание означают «pipeline дошёл до отправки», а не подтверждённую доставку ответа.

**RISK:** При ошибке `Send Answer` выполняется `Save Error`, но баланс уже списан. Пользователь может не получить ответ и всё равно потерять reading.

## 2.7 Повторный `/start`

**OBSERVED IN WORKFLOW:** Любой текст, начинающийся с `/start`, снова показывает onboarding.

**OBSERVED IN WORKFLOW:** Для существующего пользователя `Check User Exists` возвращает сохранённый `source`, а `Save New` не выполняется.

**OBSERVED IN WORKFLOW:** Повторный `/start <другой_marker>` не меняет persisted `source`.

**OBSERVED IN WORKFLOW:** Повторный referral `/start ref_...` существующего пользователя не выдаёт новый referral bonus.

**INFERENCE:** `source` является практически first-touch attribution, но только на уровне первой созданной записи пользователя.

---

# 3. Точный source/deep-link contract

## 3.1 Формат ссылки

**OBSERVED IN WORKFLOW:** Общий Telegram deep link должен иметь форму:

```text
https://t.me/mistic_oracle_bot?start=<marker>
```

## 3.2 Разбор marker

Доказательство: `Mystic Oracle → Check User Exists`:

```javascript
if (startParam && startParam.startsWith('/start')) {
  const param = startParam.replace('/start', '').trim();
  if (param) {
    if (param.startsWith('ref_')) {
      source = 'referral';
    } else {
      source = param
        .replace(/[^a-zA-Z0-9_]/g, '')
        .slice(0, 64) || 'organic';
    }
  }
}
```

### Точный контракт

| Вход | Сохранённый `source` |
|---|---|
| `/start` | `organic` |
| `/start yt_probe_001` | `yt_probe_001` |
| `/start youtube_video_abc` | `youtube_video_abc` |
| `/start ref_123...` | `referral` |
| Marker с `-`, пробелами, Unicode | Недопустимые символы удаляются |
| Marker длиннее 64 символов | Обрезается до 64 символов |

**OBSERVED IN WORKFLOW:** Разрешены только ASCII:

```text
A-Z a-z 0-9 _
```

**OBSERVED IN WORKFLOW:** Внутреннее ограничение — 64 символа после sanitization.

**UNKNOWN:** Дополнительные ограничения Telegram на start payload не проверяются этим JSON.

## 3.3 Можно ли делать marker для каждого видео?

**OBSERVED IN WORKFLOW:** Да. Например:

```text
yt_<channel>_<video>
```

при условии использования только `[A-Za-z0-9_]` и длины не более 64 символов в логике workflow.

**RISK:** Marker сохранится только для нового пользователя. Старый пользователь, перешедший по новой YouTube-ссылке, останется со старым `source`.

**RISK:** Нет `campaign`, `video_id`, `first_source`, `last_source`, `start_history` или timestamp перехода. Есть только одно строковое поле `source`.

## 3.4 Referral и campaign attribution

**OBSERVED IN WORKFLOW:** Если payload начинается с `ref_`, `source` принудительно становится `referral`.

**RISK:** Одновременно сохранить referral и YouTube marker невозможно. Например, referral-переход из YouTube потеряет YouTube campaign attribution.

---

# 4. Три бесплатных ответа и ежедневный бесплатный ответ

## 4.1 Стартовые три ответа

**OBSERVED IN WORKFLOW:** Новый пользователь получает:

```text
balance = 3
last_free_date = время регистрации
```

Доказательство: `Check User Exists`, ветка нового пользователя.

**OBSERVED IN WORKFLOW:** За каждый успешно дошедший до `Deduct Balance` reading списывается 1, кроме active premium.

**RISK:** Это не «три гарантированно доставленных ответа», а три списания pipeline. Ошибка доставки после `Save Deduct` тоже может съесть единицу.

## 4.2 Ежедневный бесплатный ответ

Доказательство: `Service Select` и `Pain Select`:

```javascript
let canUseFree = diffMs >= 86400000 && user.balance === 0;
if (canUseFree) currentBalance = 1;
```

**OBSERVED IN WORKFLOW:** Ежедневный бесплатный ответ доступен только если одновременно:

1. persisted `balance === 0`;
2. с `last_free_date` прошло не менее 86 400 000 ms;
3. premium не нужен.

**OBSERVED IN WORKFLOW:** Это rolling 24-hour window, а не календарный «раз в день».

**OBSERVED IN WORKFLOW:** Пользователь с положительным балансом не получает дополнительную ежедневную единицу.

**OBSERVED IN WORKFLOW:** После третьего стартового ответа `last_free_date` обновляется, поэтому первый daily free станет доступен только через 24 часа после последнего reading.

**OBSERVED IN WORKFLOW:** Временная единица daily free не записывается в `balance` при выборе сервиса. Она только допускает переход к вопросу. После ответа `Deduct Balance` оставляет persisted balance равным нулю и обновляет `last_free_date`.

**RISK:** Если пользователь выбрал сервис, но ответ не был завершён, `last_free_date` не обновляется. Ограничение расходуется только при завершении pipeline.

---

# 5. Таблица событий и полей

| Метка | Событие | Где фиксируется | Поля | Ограничение |
|---|---|---|---|---|
| OBSERVED IN WORKFLOW | Создание пользователя | `Save New` | `user_id`, `createdAt`, `source`, `balance`, `referrer_id`, язык | Нет отдельного acquisition event. |
| OBSERVED IN WORKFLOW | Source / first touch | `Check User Exists → Save New` | `source` | Только одно значение, без timestamp/history. |
| OBSERVED IN WORKFLOW | Выбор ситуации | `Save State` | `selected_service = pain_*`, `reached_pain = true` | `selected_service` позже очищается. Остаётся только boolean `reached_pain`. |
| OBSERVED IN WORKFLOW | Выбор прямого оракула | `Save State` | `selected_service = service` | Нет `reached_oracle` и timestamp. |
| OBSERVED IN WORKFLOW | Ожидание вопроса | `Save State` | `current_state = waiting_question` | Состояние перезаписывается. |
| OBSERVED IN WORKFLOW | Отправка первого вопроса | `Set Proc` | `current_state = processing` | Нет `first_question_at`, question ID или persisted question event. |
| OBSERVED IN WORKFLOW | Выбор маршрута | `Deduct Balance` | `route_stats` | Агрегированный счётчик, без timestamp. |
| OBSERVED IN WORKFLOW | Завершённый reading pipeline | `Deduct Balance → Save Deduct` | `total_readings += 1` | Происходит до `Send Answer`; не является delivery receipt. |
| OBSERVED IN WORKFLOW | Остаток баланса | `Save Deduct` | `balance` | Ноль можно определить snapshot’ом, но нет `balance_exhausted_at`. |
| OBSERVED IN WORKFLOW | Paywall показан | `Mark Paywall` | `reached_paywall = true` | Нет количества показов, timestamp или package clicked. |
| OBSERVED IN WORKFLOW | Платёж | `Update Balance → Save Balance` | `balance`, `is_premium`, `premium_until`, `total_spent` | Нет transaction ledger и Telegram charge IDs. |
| OBSERVED IN WORKFLOW | Referral attribution invitee | `Save New` | `referrer_id`, `source = referral` | Нет campaign source вместе с referral. |
| OBSERVED IN WORKFLOW | Referral outcome referrer | `Save Ref` | `balance + 1`, `referred_someone = true` | Boolean не показывает число referrals. |
| OBSERVED IN WORKFLOW | Referral link generated | `Generate Link` | Только runtime `ref_link` | Не сохраняется как событие. |
| OBSERVED IN WORKFLOW | Блокировка бота | `Send Reminder` error → `Update Blocked` | `current_state = error` | Фактическая строка зависит от Telegram error output. |
| OBSERVED IN WORKFLOW | Ошибка AI/pipeline | `Reset Proc`, `Save Error` | `current_state` | Нет централизованного event log. |
| UNKNOWN | Подтверждённая доставка Telegram | Не фиксируется | — | В workflow нет сохранения Telegram response/message ID как delivery event. |

---

# 6. Актуальные цены и paywall

## 6.1 Пакеты Telegram Stars

| Метка | Пакет | Callback | Invoice payload | Стоимость |
|---|---:|---|---|---:|
| OBSERVED IN WORKFLOW | 3 readings | `pay_3_50` | `balance_3_50` | 50 XTR |
| OBSERVED IN WORKFLOW | 10 readings | `pay_10_150` | `balance_10_150` | 150 XTR |
| OBSERVED IN WORKFLOW | Unlimited 30 days | `pay_unlimited_400` | `balance_unlimited_400` | 400 XTR |

Доказательства:

- `Send Invoice 50-3`;
- `Send Invoice 150-10`;
- `Send Invoice 400-unlim`;
- `Update Balance`.

## 6.2 Фактическая логика начисления

```text
50 XTR  → +3 balance
150 XTR → +10 balance
400 XTR → premium на 30 × 24 часа
```

**OBSERVED IN WORKFLOW:** Premium устанавливается на 30 дней от момента платежа, а не продлевается от уже существующего `premium_until`.

**RISK:** Покупка пакета 50/150 активным premium-пользователем записывает:

```text
is_premium = false
premium_until = null
```

Доказательство: `Update Balance` и `Save Balance`. Переменные по умолчанию `isPremium = false`, `premiumUntil = null`, и только сумма `400` включает premium.

**RISK:** Покупка 400 XTR выводит сообщение `payment_success` с `added = 0`, поскольку premium-покупка не добавляет readings. UI может сообщить «+0 readings», не объясняя включение premium.

## 6.3 Проверка платежа

**RISK:** `Answer Pre-Checkout Query` безусловно отвечает:

```json
"ok": true
```

Проверки отсутствуют для:

- payload;
- currency;
- amount;
- user;
- существования продукта;
- повторной транзакции.

**RISK:** `Update Balance` доверяет только `successful_payment.total_amount`.

**RISK:** Не проверяются `invoice_payload`, `currency`, `telegram_payment_charge_id`, `provider_payment_charge_id`.

**RISK:** Неизвестная сумма всё равно может увеличить `total_spent`, хотя не даст balance/premium.

**RISK:** Charge ID не хранится, поэтому duplicate delivery успешного платежного update может повторно начислить balance.

**RISK:** `currentBalance + addBalance` является read-modify-write без блокировки. Параллельные платежи или reading/payment одновременно могут перезаписать значения.

---

# 7. `/stats` и свежая расшифровка CSV

## 7.1 Наличие `/stats`

**OBSERVED IN WORKFLOW:** В `Switch` нет правила для `/stats`.

**OBSERVED IN WORKFLOW:** `User Question` исключает тексты, начинающиеся с `/`.

**OBSERVED IN WORKFLOW:** Следовательно, `/stats` не попадёт ни в question flow, ни в отдельную ветку.

**INFERENCE:** `/stats` фактически останется без ответа.

**OBSERVED IN WORKFLOW:** Другого analytics output, dashboard или export workflow в JSON нет.

## 7.2 Состояние приложенного CSV

**OBSERVED IN WORKFLOW:** В CSV содержится 76 записей пользователей.

**OBSERVED IN WORKFLOW:** Максимальный `updatedAt` в приложенной выгрузке — `2026-08-28T16:30:25.232Z`.

### Общий snapshot

| Метка | Показатель | Значение |
|---|---:|---:|
| OBSERVED IN WORKFLOW | Пользователей | 76 |
| OBSERVED IN WORKFLOW | `source = site_oracle` | 32 |
| OBSERVED IN WORKFLOW | `source = organic` | 16 |
| OBSERVED IN WORKFLOW | `source = referral` | 2 |
| OBSERVED IN WORKFLOW | Source отсутствует | 26 |
| OBSERVED IN WORKFLOW | `total_readings > 0` | 64 |
| OBSERVED IN WORKFLOW | Текущий `balance = 0` | 34 |
| OBSERVED IN WORKFLOW | `reached_paywall = true` | 18 |
| OBSERVED IN WORKFLOW | Состояние содержит блокировку бота | 14 |
| OBSERVED IN WORKFLOW | `total_spent > 0` | 1 |
| OBSERVED IN WORKFLOW | Наблюдаемая сумма spend | 50 Stars |

**RISK:** Единственная запись с `total_spent > 0` имеет username, совпадающий с hardcoded support account workflow. Не воспроизводя персональные данные: это создаёт сильный риск, что единственный наблюдаемый платёж внутренний, а не внешний.

## 7.3 Cohort `site_oracle`

| Метка | Этап | Пользователи |
|---|---:|---:|
| OBSERVED IN WORKFLOW | `source = site_oracle` | 32 |
| OBSERVED IN WORKFLOW | `reached_pain = true` | 28 |
| INFERENCE | Имеют хотя бы один завершённый pipeline: `total_readings > 0` | 29 |
| OBSERVED IN WORKFLOW | Текущий `balance = 0` | 11 |
| OBSERVED IN WORKFLOW | `reached_paywall = true` | 5 |
| OBSERVED IN WORKFLOW | `total_spent > 0` | 0 |

**INFERENCE:** `29 > 28` на этапе reading против `reached_pain` объяснимо наличием прямых oracle-маршрутов, которые не устанавливают `reached_pain`.

**RISK:** Это не последовательная event funnel. Пользовательские строки являются snapshot’ами, а не событиями с timestamps.

## 7.4 Проблемы качества CSV

**OBSERVED IN WORKFLOW:** Текущая логика workflow ожидает в колонке `lang` значения:

```text
""          для русского
"english"   для английского
```

Доказательство: `Check User Exists`, `Save New`, `Save Lang1`, `Determine Lang`.

**OBSERVED IN WORKFLOW:** В CSV русские записи имеют текстовое значение языка, отличное от пустой строки, тогда как английские используют `english`.

**RISK:** `Cron RU → Determine Lang → Get Users` фильтрует русских пользователей по:

```text
lang = ""
```

При буквальном соответствии приложенному CSV русская reminder-выборка не найдёт пользователей с текущим русским значением.

**OBSERVED IN WORKFLOW:** У части старых пользователей отсутствуют:

- `source`;
- `reached_pain`;
- `reached_paywall`;
- `route_stats`;
- иногда `total_readings`.

**OBSERVED IN WORKFLOW:** У части записей сумма значений в `route_stats` меньше `total_readings`.

**RISK:** Исторический route breakdown неполон и не может использоваться как точный источник всех readings.

**OBSERVED IN WORKFLOW:** В CSV есть большие balances при `total_spent = 0`.

**UNKNOWN:** Причина — миграции, вручную выданные credits, referrals или внутренние пользователи — не определима из JSON.

---

# 8. Что можно измерить уже сейчас

| Метка | Метрика | Как измерить |
|---|---|---|
| OBSERVED IN WORKFLOW | Число новых пользователей по marker | `source = <marker>` |
| OBSERVED IN WORKFLOW | Количество пользователей, выбравших ситуацию хотя бы раз | `reached_pain = true` |
| INFERENCE | Пользователи с хотя бы одним завершённым reading pipeline | `total_readings > 0` |
| OBSERVED IN WORKFLOW | Текущий нулевой баланс | `balance = 0` |
| OBSERVED IN WORKFLOW | Пользователи, которым хотя бы раз показали paywall | `reached_paywall = true` |
| OBSERVED IN WORKFLOW | Общий накопленный spend | `total_spent` |
| OBSERVED IN WORKFLOW | Текущий premium status | `is_premium`, `premium_until` |
| OBSERVED IN WORKFLOW | Накопленные reading routes | `route_stats` |
| OBSERVED IN WORKFLOW | Пользователи, пришедшие по referral | `source = referral`, `referrer_id != 0` |
| OBSERVED IN WORKFLOW | Referrer когда-либо получил зафиксированный referral outcome | `referred_someone = true` |
| OBSERVED IN WORKFLOW | Заблокировавшие бота | `current_state` с Telegram error string |
| INFERENCE | Грубый cohort funnel нового marker | Фильтр по `source`, затем snapshot-поля `reached_pain`, `total_readings`, `balance`, `reached_paywall`, `total_spent` |

---

# 9. Что нельзя измерить

| Метка | Нельзя надёжно измерить | Причина |
|---|---|---|
| RISK | Click-through rate YouTube → Telegram | Нет данных YouTube clicks и нет Telegram click event до `/start`. |
| RISK | Повторные переходы по разным видео | Persisted только первый `source`. |
| RISK | Last-touch attribution | `source` существующего пользователя не обновляется. |
| RISK | Точный порядок funnel events | Нет event table и event timestamps. |
| RISK | Время от `/start` до первого вопроса | Нет `first_question_at`. |
| RISK | Факт отправки первого вопроса после завершения | `processing` является временным состоянием и перезаписывается. |
| RISK | Доставленный первый ответ | `total_readings` увеличивается до отправки ответа. |
| RISK | Время исчерпания free balance | Нет `balance_exhausted_at`. |
| RISK | Количество paywall impressions | Есть только boolean `reached_paywall`. |
| RISK | Какой пакет был кликнут, но не оплачен | Invoice click не сохраняется. |
| RISK | Конверсию invoice → payment | Нет invoice event/ID. |
| RISK | Уникальные успешные платежи | Нет transaction IDs и ledger. |
| RISK | Refunds/chargebacks | Не обрабатываются в приложенном workflow. |
| RISK | Количество успешных referrals на referrer | `referred_someone` — boolean. |
| RISK | Referral activation | Bonus выдаётся при создании нового пользователя, не после первого вопроса/ответа. |
| RISK | Чистую внешнюю конверсию | Нет `is_test`, `is_internal`, cohort exclusion или allow/deny list. |
| RISK | Полную статистику маршрутов | Исторический `route_stats` неполон. |

---

# 10. Ответы на дополнительные вопросы

## 10.1 Можно ли вести YouTube сразу в ситуацию или конкретного оракула?

**OBSERVED IN WORKFLOW:** Нет. Start payload используется только как `source` или `referrer_id`.

**OBSERVED IN WORKFLOW:** `/start <marker>` всегда попадает в ветку `Start` и показывает onboarding.

**OBSERVED IN WORKFLOW:** Marker вроде `service_decision` будет сохранён как source, но не вызовет callback `service_decision`.

**RISK:** Нельзя гарантировать безопасный landing сразу в «Оракул решений» без изменения workflow.

## 10.2 Можно ли ограничить маршрут только «Оракулом решений»?

**OBSERVED IN WORKFLOW:** Прямой callback `service_decision` действительно приводит к `decision`.

**OBSERVED IN WORKFLOW:** Но пользователь видит все восемь оракулов и пять ситуаций.

**OBSERVED IN WORKFLOW:** `pain_choice` допускает `decision` и `tarot`.

**RISK:** Текущий внешний маршрут нельзя ограничить только Decision Oracle. Требуется отдельный landing contract или отдельное меню/route policy.

## 10.3 Может ли маршрутизатор выбрать предсказательный оракул после нейтрального CTA?

**OBSERVED IN WORKFLOW:** Да, в зависимости от выбранной ситуации:

- love → Tarot/Karma;
- money → Numerology/Decision/Tarot;
- choice → Decision/Tarot;
- future → Astrology/Energy.

**RISK:** Даже «выбор» может уйти в Tarot, а «деньги» — в Tarot/Numerology.

## 10.4 Что происходит при high-stakes запросе?

**OBSERVED IN WORKFLOW:** Отдельного определения high-stakes запроса нет.

**OBSERVED IN WORKFLOW:** Вопрос передаётся выбранному оракулу или router’у без classifier node.

**RISK:** Медицина, self-harm, беременность, смерть, насилие, право и финансы проходят через обычный oracle pipeline.

**UNKNOWN:** Встроенные ограничения используемых моделей не приложены и не могут считаться продуктовым safety layer.

---

# 11. Системные промпты и safety

## 11.1 Классы потенциально рискованных промптов

| Метка | Ветка | Что наблюдается |
|---|---|---|
| OBSERVED IN WORKFLOW | Tarot | Используются случайные карты, включая reversed, для ответа на вопрос пользователя; UI прямо предлагает вопросы о будущем. |
| OBSERVED IN WORKFLOW | Runes | Используются случайные руны для интерпретации пути, решения или препятствия. |
| OBSERVED IN WORKFLOW | Astrology | UI обещает прогноз и чтение звёзд; используются дата рождения и текущая дата. |
| OBSERVED IN WORKFLOW | Dream | Интерпретирует символы сна как смысл/значение. |
| OBSERVED IN WORKFLOW | Numerology | Рассчитывает числа по дате рождения и имени; UI обещает сведения о жизненном пути и будущем периоде. |
| OBSERVED IN WORKFLOW | Karma | UI и prompt structure ссылаются на карму, повторяющиеся паттерны и прошлые жизни. |
| OBSERVED IN WORKFLOW | Decision | Анализирует варианты и может предлагать пути. |
| OBSERVED IN WORKFLOW | Energy | UI заявляет chakra/aura diagnostics; prompt structure анализирует физическое, эмоциональное и ментальное состояние. |
| RISK | Money route | `pain_money` может автоматически направить к Numerology, Decision или Tarot без финансового disclaimer в prompt. |
| RISK | Energy route | Формулировки о чакрах, ауре и «диагностике» могут восприниматься как диагностика состояния. |
| RISK | Karma route | Возможны кармические или past-life вердикты. |
| RISK | Future routes | Astrology, Tarot и часть UI-copy прямо связаны с предсказаниями будущего. |

## 11.2 Мысли другого человека

**UNKNOWN:** В читаемой части JSON нет однозначной инструкции утверждать мысли другого человека как факт.

**RISK:** Общий Tarot/Karma/relationship prompt не содержит запрета на mind-reading claims. Модель может сформулировать такие утверждения.

## 11.3 Медицина и финансы

**OBSERVED IN WORKFLOW:** В `/help` есть общий entertainment disclaimer.

**RISK:** Disclaimer не встроен в каждый system prompt и не используется как decision gate.

**RISK:** Нет запрета на медицинские, финансовые или юридические рекомендации.

**RISK:** `Energy Scanner` принимает описания физических симптомов.

**RISK:** `pain_money` прямо направляет финансовый контекст в oracle-модели.

## 11.4 Наличие safety-фильтров

**OBSERVED IN WORKFLOW:** Нет отдельных nodes/условий для:

- self-harm;
- suicide;
- violence;
- abuse;
- medicine;
- pregnancy;
- death;
- finance;
- legal issues;
- minors;
- delusions/paranoia;
- emergency escalation.

**OBSERVED IN WORKFLOW:** Нет pre-generation classifier.

**OBSERVED IN WORKFLOW:** Нет post-generation safety validator.

**OBSERVED IN WORKFLOW:** Нет forced refusal templates или crisis resources.

**RISK:** Произвольный high-stakes текст будет обработан обычным oracle prompt.

## 11.5 Ограничение аудита prompt’ов

**OBSERVED IN WORKFLOW:** В предоставленном JSON большая часть русскоязычных строк `Dictionary`, `Dictionary1`, `Router LLM` и `Get Sys Prompt` выглядит как пробелы, пунктуация и частично сохранившиеся placeholders.

**UNKNOWN / REQUIRED ARTIFACT:** Нужен несокращённый export системных промптов, чтобы точно установить формулировки про смерть, беременность, здоровье, финансы, мысли других людей и категоричность предсказаний.

**RISK:** Если предоставленный JSON дословно соответствует production, русские тексты и инструкции могут быть повреждены. Если это артефакт экспорта/редакции, данный аудит не может подтвердить фактический production prompt.

---

# 12. Referral outcome

**OBSERVED IN WORKFLOW:** Referral ссылка:

```text
https://t.me/mistic_oracle_bot?start=ref_<user_id>
```

Доказательство: `Generate Link`.

**OBSERVED IN WORKFLOW:** Новый invitee получает:

- `referrer_id`;
- `source = referral`;
- обычный стартовый balance 3.

**OBSERVED IN WORKFLOW:** После `Save New` выполняется:

```text
Filter Ref → Get Referrer → Check Premium → Filter Bonus → Save Ref
```

**OBSERVED IN WORKFLOW:** Непремиальный referrer получает `balance + 1`.

**OBSERVED IN WORKFLOW:** Premium referrer bonus не получает.

**RISK:** UI-copy обещает бонус «за каждого друга», но premium referrer исключён без альтернативной награды.

**RISK:** Bonus выдаётся за первый `/start` и создание записи, а не за фактическое начало использования, вопрос или первый ответ.

**RISK:** Нет уникального referral transaction ID. При гонке двух одновременных first-start executions теоретически возможен повторный бонус.

---

# 13. Ошибки, retries и повторная доставка

## Блокирующие проблемы

| Метка | Дефект | Доказательство |
|---|---|---|
| RISK | Нет idempotency Telegram updates | Нигде не сохраняется `update_id`. |
| RISK | Нет idempotency платежа | Не сохраняется `telegram_payment_charge_id`. |
| RISK | Возможна двойная обработка вопроса | `Check State` читает состояние, затем отдельно `Set Proc` делает upsert без compare-and-set. |
| RISK | Списание до доставки ответа | `Save Deduct → Send Answer`. |
| RISK | Ошибка ответа не возвращает balance | Error output `Send Answer → Save Error`. |
| RISK | Пользователь может зависнуть в `processing` | Не все nodes имеют error output к `Reset Proc`; отсутствующий error workflow не проверен. |
| RISK | Image polling потенциально бесконечен | В `Generate Image` используется `while (true)` без общего deadline/max polls. |
| RISK | Reminder count обновляется параллельно с отправкой | `Filter & Prepare` одновременно ведёт в `Send Reminder` и `Update Count`; счётчик может обновиться даже без успешной отправки. |
| RISK | Оплата всегда approve на pre-checkout | `Answer Pre-Checkout Query` всегда `ok: true`. |
| RISK | Покупка balance отключает premium | `Update Balance` по 50/150 возвращает `is_premium: false`. |

## Неблокирующие, но существенные ограничения

| Метка | Ограничение |
|---|---|
| RISK | Callback queries не получают явный `answerCallbackQuery`; Telegram spinner может сохраняться до удаления/изменения сообщения. |
| RISK | AI output отправляется с `parse_mode = HTML` без явной sanitization/validation. Некорректный HTML может сломать доставку. |
| RISK | User question и сохранённые персональные данные интерполируются в system prompt; нет prompt-injection boundary. |
| RISK | Голосовой MP3 временно публикуется по доступному URL, основанному на user ID. |
| RISK | Имя voice-файла не содержит уникального update/message ID; одновременные voice requests одного пользователя могут конфликтовать. |
| RISK | Коллажи и voice files зависят от публичного файлового сервера, поведение которого не приложено. |

---

# 14. Test/internal-user filtering

**OBSERVED IN WORKFLOW:** Нет полей:

- `is_test`;
- `is_internal`;
- `exclude_from_stats`;
- `campaign_test`;
- `environment`.

**OBSERVED IN WORKFLOW:** Нет denylist/allowlist user IDs.

**OBSERVED IN WORKFLOW:** `Get Users` для reminders фильтрует только язык и `is_premium = false`.

**OBSERVED IN WORKFLOW:** Предыдущие пользователи не исключаются из продукта.

**INFERENCE:** Уникальный новый marker позволяет сформировать first-touch cohort из новых пользователей, но не предотвращает попадание внутренних тестировщиков, если они используют ту же ссылку.

**RISK:** Существующий внутренний пользователь, открывший YouTube marker, не попадёт в этот source cohort, потому что его source не обновится. Это полезно для first-touch, но делает невозможной оценку повторного YouTube re-engagement.

---

# 15. Можно ли измерить `YouTube → первый ответ → balance exhausted → paywall`?

**INFERENCE:** При уникальном marker можно приблизительно измерить:

```text
source = marker
→ total_readings > 0
→ balance = 0
→ reached_paywall = true
```

**RISK:** Это не строгая последовательная воронка, потому что:

- нет timestamps этапов;
- `total_readings` не подтверждает доставку;
- `balance = 0` является текущим состоянием;
- пользователь может после нуля получить daily free;
- `reached_paywall` — lifetime boolean;
- нет event ordering;
- старый пользователь не получит новый marker;
- test/internal accounts не исключаются.

**RISK:** Поэтому такую цепочку можно использовать только как грубый cohort snapshot, но не как достоверную продуктовую funnel conversion.

---

# 16. Блокеры YouTube probe

## Критические

1. **RISK:** Нет выделенного безопасного deep-link route в `decision`.
2. **RISK:** Onboarding открывает Tarot, Astrology, Karma, Energy и другие предсказательные ветки.
3. **RISK:** Нет high-stakes classifier и safety fallback.
4. **RISK:** Нет подтверждённого delivery event для первого ответа.
5. **RISK:** Нет event timestamps для funnel.
6. **RISK:** Нет test/internal filtering.
7. **RISK:** Платёжная ветка неидемпотентна.
8. **RISK:** Pre-checkout не валидирует продукт.
9. **RISK:** Balance package может отключить premium.
10. **RISK:** CSV language values несовместимы с Russian reminder filter.
11. **RISK:** В приложенном JSON системные промпты частично нечитаемы.
12. **RISK:** Отсутствует указанный error workflow.
13. **RISK:** В `Check User Exists` и `Transcribe Voice` присутствуют закомментированные hardcoded secrets. Значения здесь не воспроизводятся; их следует считать скомпрометированными и ротировать.

## Аналитические

1. **RISK:** Нет `/stats`.
2. **RISK:** Нет отдельного acquisition/event log.
3. **RISK:** Source — одно first-touch поле.
4. **RISK:** Referral и campaign source взаимоисключаются.
5. **RISK:** Нет invoice-created/clicked event.
6. **RISK:** Нет transaction ledger.
7. **RISK:** `route_stats` неполон для legacy records.

---

# 17. Минимальный безопасный тест

## Что допустимо без изменения production

**RISK:** Публичный cold-start probe в текущем виде не рекомендуется.

**INFERENCE:** Максимально безопасный тест без изменения workflow — только закрытый внутренний smoke test:

1. использовать unlisted/private видео;
2. создать уникальный marker, например `yt_internal_probe_001`;
3. использовать только новые контролируемые Telegram-аккаунты;
4. вручную выбирать `All Oracles → Decision Oracle`;
5. задавать только низкорисковые бытовые вопросы;
6. не тестировать платежи реальными пользователями;
7. проверить в выгрузке:
   - `source`;
   - `total_readings`;
   - `balance`;
   - `reached_paywall`;
   - `route_stats`;
8. отдельно сверить, был ли ответ фактически доставлен, поскольку БД этого не подтверждает.

**RISK:** Такой тест не является внешним YouTube probe и не доказывает безопасность onboarding.

## Минимум перед внешним probe

**INFERENCE:** Для внешнего ограниченного probe необходимы как минимум:

1. dedicated start payload, который сохраняет campaign и открывает только `decision`;
2. запрет автоматического перехода в Tarot/Astro/Karma/Energy;
3. high-stakes pre-classifier;
4. safe refusal/escalation templates;
5. `first_question_at`, `answer_delivered_at`, `balance_exhausted_at`, `paywall_at`;
6. Telegram update idempotency;
7. payment transaction ledger и charge ID uniqueness;
8. `is_test` / `is_internal`;
9. проверка и миграция `lang`;
10. восстановленный полный export системных промптов;
11. проверенный error workflow.

---

# 18. Расхождения с продуктовым описанием/UI-copy

| Метка | Заявление | Фактическая реализация |
|---|---|---|
| OBSERVED IN WORKFLOW | «3 бесплатных ответа» | Новый balance действительно равен 3. |
| RISK | «Ответы» | Единица списывается до подтверждённой доставки ответа. |
| RISK | «1 бесплатный reading в день» | Только при balance=0 и через rolling 24 часа после последнего reading. |
| RISK | «За каждого друга +1» | Premium referrer бонус не получает. |
| RISK | «Друг начал использовать Oracle» | Bonus выдаётся при создании записи через referral `/start`, до вопроса и ответа. |
| RISK | «Unlimited 30 days» | Работает как 30 дней от текущего платежа, не как продление остатка premium. |
| RISK | Успешная premium-оплата | Сообщение может показать `+0 readings` вместо понятного premium confirmation. |
| RISK | «Безопасный Decision route» | Deep link не может открыть только Decision Oracle; меню показывает все ветки. |
| RISK | Entertainment disclaimer | Присутствует в `/help`, но не является обязательным safety gate. |
| RISK | Русская локализация/reminders | CSV `lang` не соответствует фильтру `lang = ""`. |
| RISK | Пакет 10 readings | В предоставленном английском словаре текст кнопки выглядит повреждённым и не содержит ясного числа. |
| UNKNOWN | Полные production prompts | Предоставленный JSON содержит визуально утраченный русскоязычный текст. |

---

# Финальное заключение

## `NOT READY`

**RISK:** Для обычного технического attribution test механизм `source` уже существует и поддерживает отдельный marker на каждое видео.

**RISK:** Для заявленной цели — внешний cold-start YouTube route с безопасным ограниченным продуктовым сценарием и измерением `переход → первый доставленный ответ → исчерпание free → paywall → payment` — текущая реализация недостаточна.

**Главный вывод:** attribution частично готова, но продуктовый маршрут, safety и событийная аналитика — нет. Без изменений допустим только закрытый внутренний smoke test с новыми тестовыми аккаунтами и ручным выбором `Decision Oracle`; публичный attributed probe запускать не следует.
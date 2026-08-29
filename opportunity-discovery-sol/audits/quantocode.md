# Статический аудит n8n: КвантоКод

**Источник:** предоставленный экспорт ``KvantoKod_Main.json.txt`` (source supplied out of band; public link removed) и включённый в сообщение экспорт `KK_PDF`.

**OBSERVED IN WORKFLOW** Аудит выполнен статически: workflow не запускались, платежи, Telegram API, БД, PDF-скрипт и внешние сервисы не вызывались.

**UNKNOWN** Схемы БД, ограничения уникальности, переменные окружения, журналы execution, конфигурация Telegram/YooKassa и фактическое содержимое внешнего PDF-скрипта не предоставлены. Поэтому наличие таблиц и успешность реального исполнения не подтверждены.

---

## 1️⃣ Проанализированные workflow и связи

| Workflow / компонент | Статус | Назначение и связь |
|---|---|---|
| `KvantoKod_Main` | **OBSERVED IN WORKFLOW** | Главный активный workflow: Telegram-вход, онбординг, расчёты, подписной gate, меню, платежи Stars/YooKassa, `/stats`, догрев, Код дня, возвраты. Поле верхнего уровня: `"active": true`. |
| `KK_PDF` | **OBSERVED IN WORKFLOW** | Активный sub-workflow, вызываемый из `KvantoKod_Main` → node `Call PDF`, workflow ID указывает на `KK_PDF`; `waitForSubWorkflow: false`. |
| Внешний PDF-скрипт | **UNKNOWN / REQUIRED ARTIFACT** | `KK_PDF` → `PDF Gen.parameters.command` запускает внешний файл `kvantokod_pdf.js`. Сам скрипт не предоставлен. |
| `5. ELYOR Payment` | **UNKNOWN / REQUIRED ARTIFACT** | Вызывается из `KvantoKod_Main` → `ELYOR Payment`, если `Validate.tier` начинается с `el_`. Экспорт отсутствует. |
| Error workflow | **UNKNOWN / REQUIRED ARTIFACT** | Оба workflow ссылаются на отдельный `errorWorkflow`, экспорт которого отсутствует. |
| PostgreSQL | **UNKNOWN / REQUIRED ARTIFACT** | Используются таблицы `users`, `payments`, `transactions`, `calculations`, `numerology_meanings`, `day_code_log`. DDL и ограничения не предоставлены. |
| Telegram, YooKassa, OpenRouter | **OBSERVED IN WORKFLOW** | Прямые HTTP/n8n-интеграции. Реальная конфигурация и ответы сервисов статически не проверены. |

### PDF-риск

**RISK** В `KK_PDF` → `PDF Gen.parameters.command` используется один фиксированный файл `/tmp/kk_pdf_input.json`. При параллельных запросах два процесса потенциально могут перезаписать общий input до чтения его внешним скриптом.

**RISK** Это создаёт риск неправильного или чужого PDF при одновременных запросах. Поведение зависит от отсутствующего `kvantokod_pdf.js`, поэтому фактическая эксплуатация дефекта — **UNKNOWN**, но перед внешним масштабированием это следует считать блокером конфиденциальности.

---

# 2️⃣ Фактическая user journey

## 2.1 Новый пользователь из deep link

1. **OBSERVED IN WORKFLOW** Telegram update попадает в `KvantoKod_Main` → `TG In`.
2. **OBSERVED IN WORKFLOW** `Norm` нормализует update и, если сообщение начинается с точной строки `"/start "`, выделяет payload.
3. **OBSERVED IN WORKFLOW** `Norm` сразу создаёт/обновляет строку `users`, даже если update не является `/start`.
4. **OBSERVED IN WORKFLOW** `Dialog` для нового пользователя без `self_locked` переводит его в `AWAITING_BIRTHDATE`.
5. **OBSERVED IN WORKFLOW** Пользователь вводит дату.
6. **OBSERVED IN WORKFLOW** `Dialog` выдаёт action `calc_soul`; `DB SaveS` сохраняет дату и state `AWAITING_FIO`.
7. **OBSERVED IN WORKFLOW** `CalcSoul` рассчитывает Код Души; `DB Soul` записывает `users.soul_code`; `TG Soul` отправляет бесплатный результат и просит ФИО.
8. **OBSERVED IN WORKFLOW** Пользователь вводит минимум два слова ФИО.
9. **OBSERVED IN WORKFLOW** `CalcFull` рассчитывает сразу Душу, Тело и Личность, записывает `self_locked=true`, `state='MIRROR_SHOWN'` и `mirror_shown_at=NOW()`.
10. **OBSERVED IN WORKFLOW** После расчёта выполняется `ChkSub`: проверка подписки на Telegram-канал.
11. **OBSERVED IN WORKFLOW** Если подписки нет, отправляется `TG SubReq` с кнопками подписки и `check_sub`.
12. **OBSERVED IN WORKFLOW** После успешной проверки подписки поток повторно проходит через `CalcFull`, затем отправляет `TG Mirror`.
13. **OBSERVED IN WORKFLOW** `TG Mirror` показывает пользователю все три числовых кода бесплатно и предлагает:
    - полную расшифровку — 490 ₽;
    - полный доступ на месяц;
    - переключение на Stars.
14. **OBSERVED IN WORKFLOW** Платная полная расшифровка формируется только после успешной оплаты `basic`.
15. **OBSERVED IN WORKFLOW** Если оплаты нет, спустя не менее трёх дней пользователь может попасть в одноразовый догрев.

## 2.2 Что именно бесплатно

**OBSERVED IN WORKFLOW** Бесплатно выдаётся не только Код Души:

- Код Души — до ввода ФИО;
- после ввода ФИО и прохождения gate — три числовых кода:
  - Душа;
  - Тело;
  - Личность;
- платной является расширенная AI-интерпретация сочетания кодов.

**RISK** Текст `/help` описывает «Полную матрицу: Душа + Тело + Личность — 490 ₽», тогда как `TG Mirror` показывает сами три кода бесплатно. Реальный платный объект ближе к «полной расшифровке», а не к «получению трёх кодов».

## 2.3 Повторный `/start`

**OBSERVED IN WORKFLOW** В `Dialog` первый блок:

```text
wantsMenu || wantsStart
```

возвращает результат раньше второго отдельного блока `if (text === '/start')`.

**OBSERVED IN WORKFLOW** Поэтому второй подробный обработчик `/start` в `Dialog` фактически недостижим.

Фактическое поведение:

- **OBSERVED IN WORKFLOW** `self_locked=true` или активный эксперт → `/start` ведёт в меню;
- **OBSERVED IN WORKFLOW** `self_locked=false` → `/start` возвращает пользователя к вводу даты и ставит `AWAITING_BIRTHDATE`;
- **OBSERVED IN WORKFLOW** уже зафиксированная личная матрица не очищается;
- **OBSERVED IN WORKFLOW** частично прошедший онбординг без `self_locked` может быть сброшен обратно к дате.

---

# 3️⃣ Точный source/deep-link contract

## 3.1 Синтаксис

**OBSERVED IN WORKFLOW** Ожидаемый Telegram deep link имеет форму:

```text
https://t.me/<bot_username>?start=<payload>
```

Для обычного источника:

```text
https://t.me/<bot_username>?start=yt_ep01
```

В workflow Telegram username виден, но в отчёте он намеренно не воспроизводится как идентификатор production-маршрута.

## 3.2 Парсер

**OBSERVED IN WORKFLOW** `KvantoKod_Main` → `Norm.parameters.jsCode`:

- распознаёт только текст, начинающийся с точной строки `"/start "`;
- сохраняет всё после первых семи символов:
  `out.text.slice(7).trim()`;
- затем заменяет `out.text` на `/start`;
- не разбивает обычный payload на `source`, `campaign`, `episode` и другие компоненты.

Логика:

```text
payload непустой и не начинается с ref_ → users.source
payload начинается с ref_ → users.referrer_id
```

## 3.3 Контракт source

**OBSERVED IN WORKFLOW** Любой непустой payload, который не начинается с `ref_`, целиком становится `users.source`.

Примеры:

| Payload | Результат |
|---|---|
| `youtube` | **OBSERVED IN WORKFLOW** `source='youtube'` |
| `yt_ep01` | **OBSERVED IN WORKFLOW** `source='yt_ep01'` |
| `youtube_v01_shortA` | **OBSERVED IN WORKFLOW** целиком один `source` |
| `ref_123` | **OBSERVED IN WORKFLOW** `referrer_id=123`, `source=NULL` |
| `ref_123_extra` | **RISK** `parseInt()` вернёт `123`; хвост не валидируется |
| `ref_invalid` | **RISK** получится нечисловое значение/`NaN`; дальнейшее поведение зависит от типа столбца и драйвера |

## 3.4 First-touch

**OBSERVED IN WORKFLOW** `Norm` использует:

```sql
source = COALESCE(users.source, EXCLUDED.source),
referrer_id = COALESCE(users.referrer_id, EXCLUDED.referrer_id)
```

Следствия:

- **OBSERVED IN WORKFLOW** первый непустой `source` сохраняется и не перезаписывается последующими source;
- **RISK** это не строгий first-touch: если первая строка пользователя была создана без метки, более поздний tagged `/start` заполнит пустой `source`;
- **OBSERVED IN WORKFLOW** повторный пользователь с уже непустым source не будет приписан новому выпуску;
- **RISK** старый пользователь с `source=NULL` может быть приписан новому YouTube-ролику при повторном tagged `/start`.

## 3.5 Конфликт с referral

**OBSERVED IN WORKFLOW** Пространство payload, начинающееся с `ref_`, полностью зарезервировано под referral.

**RISK** Одновременно передать source и referral нельзя. Форматы вроде `ref_123_yt_ep01` будут разобраны только как referral `123`.

## 3.6 Общий YouTube source + episode

**OBSERVED IN WORKFLOW** Отдельного поля `episode_id` нет.

**INFERENCE** Можно использовать отдельный цельный source для каждого видео:

```text
yt_ep01
yt_ep02
yt_ep03
```

**INFERENCE** Можно заложить общий префикс, например `yt_ep01`, и группировать `yt_*` внешним SQL/BI.

**RISK** `/stats` не агрегирует по префиксу и покажет каждый payload отдельной строкой. Общий source и episode как два независимых измерения текущей схемой не поддерживаются.

---

# 4️⃣ Таблица измеримых событий и полей

| Этап | Что фиксируется | Точное доказательство | Оценка |
|---|---|---|---|
| Старт `/start` | Отдельного события нет | `Norm`: только upsert `users`; нет `start_at`, event table или счётчика | **RISK** |
| Первая регистрация/контакт | Строка `users` | `Norm`: `INSERT INTO users ... ON CONFLICT` | **OBSERVED IN WORKFLOW** |
| Source | `users.source` | `Norm`: payload → `src`; `COALESCE(users.source, EXCLUDED.source)` | **OBSERVED IN WORKFLOW** |
| Referral | `users.referrer_id` | `Norm`: `ref_` + `parseInt()` | **OBSERVED IN WORKFLOW** |
| Ввод даты | `users.birth_date`, state | `DB SaveS`: `birth_date=$2`, `state=$1` | **OBSERVED IN WORKFLOW** |
| Получение/расчёт Души | `users.soul_code` | `DB Soul`: `soul_code=$1::jsonb` | **OBSERVED IN WORKFLOW** |
| Время Души | Отдельного timestamp нет | Используется только общий `updated_at` | **RISK** |
| Показ gate | `gate_shown_at` | `ChkSub`: `COALESCE(gate_shown_at,NOW())` | **OBSERVED IN WORKFLOW** |
| Прохождение gate | `gate_passed_at` | `ChkSub`/`VerSub` | **OBSERVED IN WORKFLOW** |
| Ввод ФИО | `users.fio` | `CalcFull`: `fio=$3` | **OBSERVED IN WORKFLOW** |
| Расчёт трёх кодов | `soul_code`, `body_code`, `personality_code`, `self_locked` | `CalcFull` | **OBSERVED IN WORKFLOW** |
| «Показ зеркала» | `mirror_shown_at` | `CalcFull`: записывается до `ChkSub` и `TG Mirror` | **RISK**: это не подтверждённая доставка |
| Paywall impression | Корректно не фиксируется | `TG Mirror` отправляет paywall, но timestamp там не пишется | **RISK** |
| `paywall_shown_at` | Только для `basic` при создании YooKassa checkout | `CreateYK`: update только при `d.tier==='basic'` | **OBSERVED IN WORKFLOW**, но название поля вводит в заблуждение |
| Нажатие buy-кнопки | Обрабатывается, но не сохраняется | `Dialog`: `buy_*_rub`, `buy_*_stars` | **RISK** |
| Создание YooKassa checkout | В БД не сохраняется | `CreateYK` получает `payment_id`, но запись появляется лишь на webhook success | **RISK** |
| Успешная YooKassa-оплата | `payments` | `DB PayOK` | **OBSERVED IN WORKFLOW** |
| Успешная Stars-оплата | `transactions` | `DB Pay` | **OBSERVED IN WORKFLOW** |
| Текущий купленный tier | `users.paid_tier` | `DB PayState` / `DB Activate` | **OBSERVED IN WORKFLOW** |
| Исторические покупки | YooKassa: `payments`; Stars: `transactions` | Две разные таблицы | **OBSERVED IN WORKFLOW** |
| Догрев отправлен | `basic_warmup_sent=true` | `TG Warmup` | **OBSERVED IN WORKFLOW** |
| Время догрева | Не сохраняется | Есть boolean, нет `basic_warmup_sent_at` | **RISK** |
| Оплата после догрева | Прямо не фиксируется | Нет campaign/touch/payment linkage | **RISK** |
| Код дня | `day_code_log(user_id, day_code)` | `TG DC Free`, `TG DC Sub` | **OBSERVED IN WORKFLOW** |

---

# 5️⃣ Актуальные цены и paywall

| Tier | RUB | Stars | Доказательство |
|---|---:|---:|---|
| `basic` — полная расшифровка матрицы | 490 ₽ | 325 ⭐ | **OBSERVED IN WORKFLOW** `CreateYK.PRICES`, `PrepInvoice.amounts`, `/help` |
| `check` — совместимость | 790 ₽ | 532 ⭐ | **OBSERVED IN WORKFLOW** те же nodes |
| `generate` — подбор названия + PDF | 2 190 ₽ | 1 529 ⭐ | **OBSERVED IN WORKFLOW** те же nodes |
| `expert_month`, первый месяц | 1 490 ₽ | 999 ⭐ | **OBSERVED IN WORKFLOW** зависит от `first_payment_used=false` |
| `expert_month`, продление | 2 490 ₽ | 1 395 ⭐ | **OBSERVED IN WORKFLOW** зависит от `first_payment_used=true` |

## Paywall-путь

**OBSERVED IN WORKFLOW** Кнопка `buy_basic_rub` из `TG Mirror` сразу приводит к `Dialog.action='create_yukassa'`.

**OBSERVED IN WORKFLOW** Аналогично `buy_check_rub`, `buy_generate_rub` и `buy_expert_month_rub` создают checkout без обязательного промежуточного подтверждения.

**RISK** Node `PRE_PAYMENT` подключён к action `payment_rub`, но `Dialog` не выдаёт такой action ни в одном видимом пути. Статически эта ветка выглядит недостижимой.

**OBSERVED IN WORKFLOW** Stars идут по ветке:

```text
buy_*_stars
→ payment
→ PrepInvoice
→ Invoice
→ pre_checkout
→ PreOK
→ successful_payment
```

---

# 6️⃣ `/stats`: фактический output и свежая расшифровка

## 6.1 Что считает `/stats`

**OBSERVED IN WORKFLOW** `TG Stats` строит source-разрез непосредственно из `users`:

```sql
count(*)                         AS reg
count(soul_code)                 AS t2
count(gate_passed_at)            AS t3
count(mirror_shown_at)           AS t4
count(paywall_shown_at)          AS t5
count(*) FILTER (
  WHERE paid_tier='basic'
)                                AS t6
```

Фактическая семантика:

| Подпись в `/stats` | Реальная семантика |
|---|---|
| `рег` | **RISK** количество строк users, а не `/start` |
| `Душа` | **OBSERVED IN WORKFLOW** users с непустым `soul_code` |
| `gate` | **OBSERVED IN WORKFLOW** users с `gate_passed_at` |
| `зеркало` | **RISK** расчёт `CalcFull`, а не подтверждённая отправка `TG Mirror` |
| `paywall` | **RISK** basic checkout creation attempt, а не показ paywall |
| `оплата` | **RISK** users, у которых текущий `paid_tier='basic'`; не все платежи |

## 6.2 Свежая статистика

Предоставленный блок:

```text
(нет метки)          72 · 66 · 36 · 40 · 2 · 1
site_quanto           3 ·  2 ·  1 ·  1 · 0 · 0
site_quanto_header    3 ·  3 ·  2 ·  2 · 1 · 0
site_quanto_footer    1 ·  0 ·  0 ·  0 · 0 · 0
```

Суммарно:

| Метрика `/stats` | Значение | Доля от 79 users |
|---|---:|---:|
| `рег` | 79 | 100% |
| `Душа` | 71 | 89,9% |
| `gate` | 39 | 49,4% |
| `зеркало` | 43 | 54,4% |
| `paywall` | 3 | 3,8% |
| `basic` | 1 | 1,3% |

**OBSERVED IN WORKFLOW** 72 из 79 users, то есть 91,1%, не имеют source marker.

**RISK** `зеркало=43` больше `gate=39`. Это не обязательно повреждение данных: `mirror_shown_at` записывается в `CalcFull` до подписного gate. Следовательно, колонка «зеркало» не означает, что пользователь действительно увидел зеркало.

**OBSERVED IN WORKFLOW** У `site_quanto_header` один `paywall`, но нет текущего `paid_tier='basic'`.

**UNKNOWN** Это может быть незавершённый checkout, неуспешная оплата, оплата другим tier или последующее перезаписывание `paid_tier`. Текущий `/stats` не позволяет различить варианты.

**OBSERVED IN WORKFLOW** Отдельный блок:

```text
basic: 1
check: 1
expert_month: 1
```

также считается по текущему `users.paid_tier`, а не по таблицам исторических платежей.

**RISK** Если пользователь сначала купил `basic`, а затем `expert_month`, он перестанет учитываться как `basic`. Поэтому это не число транзакций и не надёжный lifetime revenue count.

## 6.3 Код дня

Предоставлено:

```text
сегодня: 46 · всего: 1559 · юзеров: 46
```

**OBSERVED IN WORKFLOW** `today` — количество строк `day_code_log` за московскую календарную дату.

**OBSERVED IN WORKFLOW** `total` — все строки журнала.

**OBSERVED IN WORKFLOW** `users` — `count(DISTINCT user_id)` за всё время, а не число уникальных пользователей сегодня.

**RISK** Равенство `сегодня=46` и `юзеров=46` не доказывает, что сегодня каждый пользователь получил ровно одно сообщение: это два разных агрегата.

---

# 7️⃣ Ответы на дополнительные вопросы

## 1. Как парсится `/start`?

**OBSERVED IN WORKFLOW** Только `text.startsWith('/start ')`; payload — весь остаток после `slice(7).trim()`. Plain `/start` имеет пустой payload. Отдельного разбора параметров нет.

## 2. Сохраняется ли первый источник?

**OBSERVED IN WORKFLOW** Первый непустой source сохраняется через `COALESCE(users.source, EXCLUDED.source)`.

**RISK** Первая немаркированная сессия не закрепляет `(нет метки)` как first-touch. Поздний marker заполнит NULL.

## 3. Конфликтуют ли YouTube marker и `ref_<id>`?

**OBSERVED IN WORKFLOW** Да, если marker начинается с `ref_`. Такой payload не станет source.

## 4. Где фиксируются точки?

**OBSERVED IN WORKFLOW**

- старт — отдельно не фиксируется;
- дата — `users.birth_date`;
- Код Души — `users.soul_code`;
- gate shown — `users.gate_shown_at`;
- gate passed — `users.gate_passed_at`;
- ФИО — `users.fio`;
- три кода — JSONB-поля + `self_locked`;
- payment click — не сохраняется;
- успешная YooKassa-оплата — `payments`;
- успешная Stars-оплата — `transactions`;
- оплата после догрева — не имеет отдельной атрибуции.

## 5. Бесплатный результат и paywall

**OBSERVED IN WORKFLOW**

```text
/start
→ дата
→ бесплатный Код Души
→ ФИО
→ расчёт трёх кодов
→ gate подписки
→ показ трёх кодов
→ paywall полной интерпретации 490 ₽
```

## 6. Цены

**OBSERVED IN WORKFLOW** 490/325, 790/532, 2190/1529, эксперт 1490/999 первый месяц и 2490/1395 продление.

## 7. Трёхдневный догрев

**OBSERVED IN WORKFLOW** `Warm Select` выбирает:

```sql
state='MIRROR_SHOWN'
AND basic_warmup_sent=false
AND mirror_shown_at <= NOW() - INTERVAL '3 days'
```

**OBSERVED IN WORKFLOW** Отправляется один AI-микроинсайт и кнопка `buy_basic_rub`, после чего ставится `basic_warmup_sent=true`.

**RISK** `mirror_shown_at` выставляется до gate и фактической отправки зеркала. Догрев может прийти пользователю, который не прошёл gate и не видел трёх кодов.

**RISK** Ошибка отправки Telegram подавляется, но затем workflow всё равно пытается поставить `basic_warmup_sent=true`; повторная доставка не гарантирована.

**UNKNOWN** Точное время «12:00» зависит от timezone n8n instance: timezone в settings workflow явно не задан.

## 8. Source-разрезы `/stats`

**OBSERVED IN WORKFLOW** По каждому точному значению `users.source`, включая `(нет метки)`. Нет группировки по campaign/episode, датам или каналам.

## 9. Исключаются ли internal/test accounts?

**OBSERVED IN WORKFLOW** Нет. `Norm` исключает ботов и group/channel updates, но не test IDs, admin, vip или сотрудников.

**RISK** В cold-start выборке внутренние аккаунты могут существенно исказить результаты.

## 10. Markers по роликам

**INFERENCE** Да, как отдельные цельные source: `yt_ep01`, `yt_ep02`.

**RISK** Общий source и episode отдельными полями не поддерживаются.

## 11. Какие данные нужны?

**RISK** Для корректной аналитики необходим отдельный append-only event log:

- `event_id`;
- Telegram `update_id` для дедупликации;
- `user_id`;
- `event_name`;
- `occurred_at`;
- raw/normalized `start_payload`;
- `first_source`, `source`, `episode`;
- `state_before`, `state_after`;
- `payment_id`, provider, tier, amount, currency;
- признак internal/test;
- признак успешной доставки Telegram.

Нужные события:

```text
start_received
birthdate_accepted
soul_delivered
gate_displayed
gate_passed
fio_accepted
mirror_delivered
paywall_displayed
checkout_created
payment_button_clicked
payment_succeeded
warmup_delivered
```

**RISK** Клик по внешней URL-кнопке YooKassa Telegram-бот напрямую не видит. Можно фиксировать callback перед созданием checkout, но переход по URL требует собственного redirect/landing или provider telemetry.

## 12. Риск переатрибуции повторного пользователя

**OBSERVED IN WORKFLOW** При уже непустом source — нового присвоения не будет.

**RISK** При старой строке `users.source=NULL` новый выпуск заполнит source и будет выглядеть как первый источник.

---

# 8️⃣ Расхождения с продуктовым описанием и UI-копирайтом

| Заявление | Фактическая реализация |
|---|---|
| «Полная матрица Душа + Тело + Личность — 490 ₽» | **RISK** Все три числовых кода показываются бесплатно после gate; 490 ₽ открывает расширенную интерпретацию. |
| `рег` в `/stats` | **RISK** Это любой первый Telegram update, а не обязательно `/start`. |
| `зеркало` в `/stats` | **RISK** Timestamp записан до gate и до Telegram delivery. |
| `paywall` в `/stats` | **RISK** Это попытка создать basic checkout после клика, а не показ paywall. |
| `оплата` в source funnel | **RISK** Только текущий `paid_tier='basic'`; check/expert и история не входят. |
| «Код дня в 6:00 по Москве» | **UNKNOWN** Текст обещает МСК, но timezone schedule trigger явно не задан. |
| «Догрев после того, как пользователь увидел зеркало» | **RISK** Кандидат определяется по timestamp расчёта до gate. |
| Промежуточный экран перед оплатой | **RISK** `PRE_PAYMENT` выглядит недостижимым; buy callback сразу создаёт checkout. |
| Строгий first-touch | **RISK** Реализован first-non-null, а не первое касание. |
| `/start` «перезапускает текущий диалог» | **RISK** Для `self_locked` он ведёт в меню; второй обработчик `/start` недостижим. |

**UNKNOWN** Отдельное полное продуктовое ТЗ, помимо текста задания и встроенного UI-копирайта, не предоставлено.

---

# 9️⃣ Платёжная надёжность и повторная доставка

## YooKassa

**OBSERVED IN WORKFLOW** `DB PayOK` использует `ON CONFLICT(payment_id)`, что даёт частичную идемпотентность записи успешного платежа.

**OBSERVED IN WORKFLOW** Для `expert_month` `DB Activate Exp` выдаёт доступ только если `access_granted_at IS NULL`. Это хорошая защита от повторного продления по одному payment ID.

**RISK** Для обычных tier `DB Activate` не использует аналогичный claim. Повторный webhook может повторно отправлять пользовательские уведомления и повторно запускать downstream-логику.

**RISK** `CreateYK` формирует `Idempotence-Key` с `Date.now()`. Повторное нажатие создаёт новый ключ и потенциально новый checkout. Ключ защищает конкретный HTTP-запрос, но не бизнес-операцию пользователя.

**BLOCKING RISK** `YK Trigger` → `Validate` не проверяет подпись, секрет webhook, IP/источник уведомления и не запрашивает payment заново у YooKassa.

**BLOCKING RISK** `Validate` доверяет `object.metadata.user_id`, `tier`, amount и currency. Не видно сверки суммы с ожидаемой ценой tier или с заранее сохранлённым order/payment.

## Telegram Stars

**OBSERVED IN WORKFLOW** `PreOK` отвечает `ok:true` на любой полученный pre-checkout query без проверки payload, tier, суммы и пользователя.

**RISK** `DB Pay` делает простой `INSERT INTO transactions` без `ON CONFLICT`.

**UNKNOWN** Возможно, в БД есть unique constraint по Telegram charge ID, но DDL не предоставлен.

**BLOCKING RISK** Повторная доставка successful payment для `expert_month` проходит через `DB ExpAct`, который без claim повторно прибавляет 30 дней. Идемпотентность Stars-активации в workflow отсутствует.

---

# 🔟 Блокирующие дефекты

1. **BLOCKING RISK** YooKassa webhook доверяется без видимой аутентификации и без server-side перепроверки платежа.  
   Доказательство: `KvantoKod_Main` → `YK Trigger`, `Validate`, `DB PayOK`, `DB Activate Exp/DB Activate`.

2. **BLOCKING RISK** Stars expert может повторно продлеваться при повторной доставке successful payment.  
   Доказательство: `DB Pay` без conflict handling → `DB ExpAct` без payment claim.

3. **BLOCKING RISK** `/stats` не измеряет заявленную воронку:
   - `рег` ≠ starts;
   - `зеркало` ≠ delivery;
   - `paywall` ≠ impression;
   - `оплата` ≠ все оплаты.

4. **BLOCKING RISK** Нет test/internal filtering. Для cold-start канала несколько внутренних пользователей могут полностью изменить вывод по источнику.

5. **BLOCKING RISK** Нет persisted payment-click/checkout event и нет связи «догрев → платёж».

6. **BLOCKING RISK** `mirror_shown_at` ставится до gate. Это искажает funnel и может запускать догрев тем, кто не видел зеркало.

7. **BLOCKING RISK** Потенциальная гонка PDF из-за общего `/tmp/kk_pdf_input.json`; внешний скрипт отсутствует и не позволяет исключить смешение пользовательских данных.

---

# Неблокирующие, но существенные ограничения

1. **RISK** Source — одно плоское поле без campaign/episode.
2. **RISK** Source сохраняет first-non-null, а не строгое первое касание.
3. **RISK** Source в `/stats` не имеет временного окна.
4. **RISK** Нет conversion rates и cohort dates.
5. **RISK** `paid_tier` перезаписывается более поздней покупкой.
6. **RISK** Stars и YooKassa хранятся в разных таблицах.
7. **RISK** Ошибки нескольких Telegram/DB операций подавляются через пустые `catch`, поэтому DB marker может расходиться с доставкой.
8. **RISK** Проверка дат допускает календарно невозможные даты вроде 31.02, так как проверяется только `day <= 31`.
9. **UNKNOWN** Реальное расписание 06:00/12:00 по Москве без явно заданного timezone.
10. **UNKNOWN** Поведение отсутствующих error workflow, ELYOR workflow и PDF-скрипта.

---

# Что можно измерить уже сейчас

**OBSERVED IN WORKFLOW** На уровне users можно приблизительно получить:

- число уникальных строк по source;
- наличие рассчитанного Кода Души;
- наличие трёх кодов;
- факт прохождения gate;
- текущий state;
- текущий paid tier;
- наличие `basic_warmup_sent`;
- даты создания/обновления пользователя, если такие поля реально присутствуют в схеме.

**OBSERVED IN WORKFLOW** Из `payments` можно получить историю YooKassa success/refund, если схема соответствует запросам workflow.

**OBSERVED IN WORKFLOW** Из `transactions` можно получить Stars success.

**INFERENCE** Более корректный source-to-payment отчёт можно построить SQL-join `payments/transactions → users.source`, но такого отчёта в `/stats` сейчас нет.

---

# Что нельзя надёжно измерить

- **RISK** точное число `/start`;
- **RISK** повторные `/start`;
- **RISK** first-touch без источника;
- **RISK** уникальные starts по видео;
- **RISK** факт успешной доставки зеркала;
- **RISK** реальный paywall impression;
- **RISK** клик по URL оплаты;
- **RISK** checkout conversion denominator;
- **RISK** оплату, вызванную именно трёхдневным догревом;
- **RISK** чистую внешнюю аудиторию без test/internal;
- **RISK** полную lifetime-воронку по source через текущий `/stats`.

---

# Минимальный безопасный тест

## До исправления платежных блокеров

**INFERENCE** Допустим только неплатёжный smoke test:

1. Использовать 2–3 новых внешних Telegram-аккаунта.
2. Для одного ролика использовать уникальный marker, например:
   ```text
   yt_probe_ep01
   ```
3. Один пользователь:
   - открывает link;
   - вводит дату;
   - получает Душу;
   - вводит ФИО;
   - проходит gate;
   - получает зеркало;
   - не нажимает оплату.
4. Второй пользователь останавливается до gate.
5. Проверить read-only SQL/выгрузкой:
   - `source`;
   - `birth_date` presence;
   - `soul_code` presence;
   - `gate_passed_at`;
   - `self_locked`;
   - `mirror_shown_at`.
6. Не интерпретировать `mirror_shown_at` как delivery без проверки Telegram execution log.
7. Не проводить реальную оплату до защиты webhook и исправления Stars idempotency.

## После исправлений

**INFERENCE** Минимальный attributed paid probe — один ролик, один уникальный episode marker, 10–20 внешних пользователей, отдельный список test IDs и один контролируемый provider test payment. До запуска должны появиться `start_received`, `mirror_delivered`, `paywall_displayed`, `checkout_created`, `payment_succeeded` и source snapshot на платеже.

---

# Итоговая оценка

## `NOT READY`

**RISK** Текущий бот может принять tagged Telegram traffic и сохранить единый source, поэтому базовый неплатёжный deep-link smoke test технически возможен.

**RISK** Однако production-маршрут не готов к полноценному attributed YouTube probe с оценкой воронки и оплат из-за:

- неверной семантики `/stats`;
- отсутствия start/click/delivery events;
- отсутствия internal/test filtering;
- first-non-null вместо строгого first-touch;
- отсутствия post-warm-up attribution;
- незащищённой статически видимой YooKassa webhook-ветки;
- отсутствия идемпотентной Stars expert-активации;
- потенциальной PDF concurrency/privacy race.

**Заключение: `NOT READY`.**

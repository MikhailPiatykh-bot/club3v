# Veni Vidi Vici

Сайт детского клуба ушу и акробатики. Замена club3v.ru.

Родитель на первом экране видит, что это, с какого возраста, где зал и сколько стоит абонемент, и может оставить заявку.

## Команды

```bash
npm install
npm run dev
npm test
npm run lint
npm run build
```

## Что править без вёрстки

| Файл | Содержание |
| --- | --- |
| `content/site.json` | Телефон, адрес, первый экран, задачи родителей, основатель, метро, ИНН и ОГРНИП |
| `content/groups.json` | Возрастные группы. Это единственный источник возрастов |
| `content/schedule.json` | Дни и время. Строка ссылается на группу |
| `content/coaches.json` | Тренеры, фото из `public/`, группы, дни |
| `content/prices.json` | Абонемент, скидка многодетным, тексты пробного и разового |
| `content/belts.json` | Ступени ушу и уровни акробатики |
| `content/faq.json` | Вопросы и ответы |
| `content/reviews.json` | Цитаты родителей |
| `content/events.json` | Соревнования, аттестации, лагерь, Китай |
| `content/videos.json` | Ролики: `src`, постер, длительность |
| `content/directions.json` | Тексты страниц ушу и акробатики |
| `content/privacy.json`, `content/consent.json`, `content/oferta.json` | Юридические тексты |
| `content/districts.json` | Районные страницы. Пока `published` не `true`, страница не собирается |

Фото кладите в `public/` и указывайте путь в JSON, например `/photos/coach.webp`. Пока путь пустой, на месте фото стоит подпись.

Закрытый зал и старые направления в тексты не возвращать. Редиректы со старых адресов лежат в `next.config.ts`.

## Заявки

Форма и квиз отправляют данные на `POST /api/lead`. Нужны переменные из `.env.example`:

- Telegram: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`
- почта: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `LEAD_EMAIL_FROM`, `LEAD_EMAIL_TO`
- таблица: `GOOGLE_SHEETS_WEBHOOK_URL` — веб-приложение Apps Script, которое принимает JSON и дописывает строку

В письме, Telegram и таблице уходят имя, телефон, способ связи, дети, тренер, страница и UTM. Галочка согласия по умолчанию выключена. Спам режется скрытым полем и лимитом 5 заявок за 10 минут с одного адреса. Капчи нет.

Пока каналы не заполнены, локальный `npm run dev` показывает экран благодарности, а production отвечает ошибкой и просит позвонить.

## Аналитика

Счётчик Яндекс Метрики `105597568`. Цели: `lead_submit`, `quiz_submit`, `phone_click`, `whatsapp_click`, `telegram_click`, `coach_signup`. Код Вебмастера кладётся в `NEXT_PUBLIC_YANDEX_VERIFICATION`. Связку с карточкой Яндекс Бизнеса делает клуб в кабинете Яндекса.

Оферта помечена черновиком и закрыта от индекса, пока юрист не заменит текст и не поставит в `content/oferta.json` поле `"draft": false`.

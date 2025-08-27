# Гайд по работе

Для начала работы необходимы:

- **[Node.js](https://nodejs.org/en/download/prebuilt-installer)** 20 версии
- Пакетный менеджер **[yarn](https://classic.yarnpkg.com/lang/en/docs/install/)** `npm install --global yarn`

## 🐱‍💻 Команды

| Command                  | Action                                        |
| :----------------------- | :-------------------------------------------- |
| `yarn install`           | Установить зависимости                        |
| `yarn run dev`           | Запустить локальный дев сервер                |
| `yarn run build`         | Создать оптимизированный production build     |
| `yarn run start`         | Запустить production build                    |
| `yarn run lint`          | Запустить линтер                              |
| `yarn run stylelint`     | Запустить линтер стилей                       |
| `yarn run prettier`      | Фрорматировать код с настройками prettier     |
| `yarn run check`         | Запустить проверку линтерами и форматирование |
| `yarn run gen:component` | Утилита для создания шаблонного компонента    |


## 🚀 Структура

Используется модульная архитектура

Нижележащий слой может испльзоваться только в слоях стоящих выше по иерархии

### `shared 🡒 ui 🡒 service 🡒 components 🡒 modules 🡒 views 🡒 app`

**Для генерации компонентов используйте утилиту `yarn run gen:component`**

```text
├── public/                 # статические файлы (иконки, картинки и тп.)
│   ├── icons/
│   ├── images/
│   ├── ...
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── app/                # next app router
│   │   ├── fonts/          # шрифты для локального подключения next/font
│   │   ├── ...
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/         # компоненты ( могут обладать бизнес-логикой )
│   │   ├── dialog/
│   │   ├── ...
│   │   └── index.ts
│   ├── modules/            # модули ( могут иметь вложенные компоненты, своё состояние и изолированную логику )
│   │   ├── footer/
│   │   ├── header/
│   │   └── ...
│   ├── service/            # сервисные компоненты ( провайдеры, порталы и подобные им сущности )
│   │   ├── portal/
│   │   ├── provider/
│   │   └── ...
│   ├── shared/             # общее ( переиспользуемые глобальные сущности не имеющие конкретной привязки )
│   │   ├── api/
│   │   ├── assets/
│   │   ├── atoms/
│   │   ├── const/
│   │   ├── hooks/
│   │   ├── styles/
│   │   └── types/
│   ├── ui/                 # элементы интерфейса ( базовые переиспользуемые ui компоненты )
│   │   ├── button/
│   │   ├── ...
│   │   └── index.ts
│   └── views/              # страницы ( лэйауты страниц )
│       ├── home/
│       └── ...
├── util/                   # утилиты ( автоматизация процессов, генерация компонентов, оптимизация картинок и тп. )
│   ├── component/
│   └── ...
├── package.json
└── ...
```

## 🔄 Стейт менеджмент

В качестве стейт менеджера по умолчанию используется **[Jotai](https://jotai.org/)**

## 🎴 Картинки

Для оптимизации изображений используйте компонент **[next/image](https://nextjs.org/docs/app/building-your-application/optimizing/images)**

## ♠️ Иконки

SVG графика для импорта в качестве компонента хранится в директории `src/shared/assets/icons`

Импортируется как компонент:

```typescript jsx
import Icon from '@icons/icon.svg'

const IconExample = () => (
  <div>
    <Icon />
  </div>
)
```

## 📏 Адаптив и скейлинг

По умолчанию в сборке используется скейлинг - хук `useScaling` (вызов из `src/service/provider`). В этом же хуке устанавливается значение для кастомной переменной `--vh` и происходит определение типа устройства, в зависимости от ширины вьюпорта (`mobile`, `tablet`, `desktop`).

В качестве параметров `useScaling` принимает `deviceBreakpoints` (брейкпоинты для определения типа устройства) и `scalingBreakpoints` (брейкпоинты для скейлинга).

Каждый брейкпоинт в `scalingBreakpoints` должен определять ширину экрана `size`, на которой будет произведён переход на него (с опциональным значением `min` для скейлинга вниз от брейкпоинта) и параметры `fontSize` для размера шрифта, устанавливаемого на тег `html` (обязательный базовый размер `base` и опциональные `min` и `max` для предотвращения чрезмерного уменьшения/увеличения размеров).

При задании размеров в стилях необходимо использовать функцию `rem()`, которая импортируется из `'styles/func'`:

```scss
@use '@styles/func';

.element {
  width: func.rem(100);
}
```

## 📮 Отправка писем из форм

В проект добавлена интеграция отправки писем через SMTP (nodemailer).

### Как это работает

- Клиентский компонент формы: `src/ui/form/form.tsx`
  - Пропсы:
    - `enableEmailSubmit?: boolean` — включить отправку писем для данной формы
    - `emailTo?: string` — адрес получателя (можно не указывать, если задан на сервере)
    - `emailSubject?: string` — тема письма
  - Поведение:
    - Всегда выполняет локальный колбэк `onSubmit(values)` если передан
    - При `enableEmailSubmit` отправляет POST на `/api/sendForm` c JSON: `{ values, to, subject }`

- Серверный роут: `src/app/api/sendForm/route.ts`
  - Принимает тело запроса `{ values, to?, subject? }`
  - Формирует HTML из пар `ключ: значение`
  - Отправляет через SMTP. Использует общий helper: `src/shared/api/mail.ts`

- Хелпер отправки: `src/shared/api/mail.ts`
  - `sendEmailViaSmtp({ to, subject, html, from? })`
  - `valuesToHtml(values: Record<string,string>)`

### Переменные окружения (сервер)

SMTP (предпочтительно в РФ):

```
SMTP_HOST=smtp.yandex.ru
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your_mail@yandex.ru
SMTP_PASS=app_password_or_password
FORM_EMAIL_FROM=your_mail@yandex.ru
```

Общее:

```
FORM_EMAIL_TO=mironovlev3@gmail.com
FORM_EMAIL_FROM=your_mail@yandex.ru
```

### Пример использования формы

```tsx
<Form
  grid={{ columns: '1fr 1fr', gap: 12 }}
  fields={[
    { id: 'name', type: 'input', label: 'Введите имя', placeholder: 'Ваше имя' },
    { id: 'email', type: 'email', label: 'Электронная почта', placeholder: '__@__' },
    { id: 'subject', type: 'input', label: 'Тема', placeholder: 'Например: консультация', gridColumn: '1 / -1' },
    { id: 'message', type: 'textarea', label: 'Текст обращения', placeholder: 'Введите текст', gridColumn: '1 / -1' }
  ]}
  onSubmit={(values) => console.log(values)}
  enableEmailSubmit
  emailTo="mironovlev3@gmail.com"
  emailSubject="Сообщение с контактной формы"
/>
```

Для форм авторизации/регистрации просто не указывайте `enableEmailSubmit` — отправка писем отключена, а ваши бизнес‑процессы обрабатываются через `onSubmit`.

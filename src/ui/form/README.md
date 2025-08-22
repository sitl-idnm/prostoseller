# Form UI

Гибкий конструктор формы с управляемой сеткой, типами полей и базовой UX-логикой.

## Возможности

1. Грид-сетка формы через проп `grid`:
   - `columns`: строка CSS Grid (например, "1fr 1fr").
   - `gap | rowGap | columnGap`: число (px) или строка CSS.
2. Конфигурация полей через `fields`:
   - Порядок рендера соответствует порядку массива.
   - `gridColumn`: управление растяжением ("span 2", "1 / -1").
   - Типы: `input`, `email`, `tel`, `password`, `textarea`, `checkbox`.
3. UX/валидация:
   - Email проверяется по regex при submit.
   - Телефон: маска `+7 (___) ___-__-__` при вводе, проверка длины (11 цифр).
   - Пароль: поле с кнопкой-глазом (показ/скрытие ввода).
   - `textarea` не растягивается пользователем (`resize: none`).
4. Кнопка отправки — общий `ui/Button` c `variant="gradient"`.

## Пример

```tsx
<Form
  grid={{ columns: '1fr 1fr', gap: 12 }}
  fields={[
    { id: 'name', type: 'input', label: 'Введите имя', placeholder: 'Ваше имя' },
    { id: 'email', type: 'email', label: 'Электронная почта', placeholder: '__@__' },
    { id: 'phone', type: 'tel', label: 'Телефон', placeholder: '+7 (___) ___-__-__' },
    { id: 'password', type: 'password', label: 'Пароль', placeholder: 'Ваш пароль' },
    { id: 'agree', type: 'checkbox', placeholder: 'Согласие на обработку ПДн', gridColumn: '1 / -1' },
    { id: 'newsletter', type: 'checkbox', placeholder: 'Согласие на рассылку', gridColumn: '1 / -1' },
    { id: 'subject', type: 'input', label: 'Тема', gridColumn: '1 / -1' },
    { id: 'message', type: 'textarea', label: 'Текст обращения', placeholder: 'Введите текст', gridColumn: '1 / -1' }
  ]}
  submitLabel="Отправить →"
  onSubmit={(values) => console.log(values)}
/>
```

## Заметки
- Для прод-валидации/масок можно подключить `zod`/`react-hook-form` и `imask`/`cleave.js`.
- Поля `checkbox` возвращают `'on'`/`''`; преобразуйте к boolean по потребности в `onSubmit`.

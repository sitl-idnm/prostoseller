### Модуль Content

Переиспользуемый блок хиро/контента с двумя вариантами: split (две колонки) и solid (цельный широкий блок).

#### Импорт

```tsx
import { Content } from '@modules/content'
```

#### Пропсы

| Проп | Тип | По умолчанию | Описание |
| - | - | - | - |
| `className` | `string` | — | Кастомный класс корневого элемента |
| `variant` | `'split' | 'solid'` | `'split'` | Тип раскладки: split — две колонки 55%/45%, solid — один контейнер |
| `background` | `string` | — | Любой валидный CSS‑цвет/значение фона (например, `#f7f7fb`, `var(--bg)`, `linear-gradient(...)`) |
| `imageSrc` | `string` | — | URL изображения для правой колонки (используется в варианте `split`) |
| `imageAlt` | `string` | `''` | Альтернативный текст изображения |
| `title` | `ReactNode` | — | Заголовок. Принимает JSX; можно вставлять SVG/компоненты внутрь |
| `titleTagName` | `'h1' | 'h2' | 'h3' | 'h4'` | `'h2'` | HTML‑тег заголовка |
| `titleSize` | `'sm' | 'md' | 'lg'` | `'md'` | Визуальный размер заголовка |
| `subtitle` | `ReactNode` | — | Подзаголовок |
| `description` | `ReactNode` | — | Описание |
| `subDescription` | `ReactNode` | — | Подописание (вторичный блок) |
| `buttons` | `ReactNode` | — | Контейнер под кнопки (может быть одна или две) |
| `buttonsNote` | `ReactNode` | — | Подпись под кнопками |

Заметки:
- В варианте `solid` ширина контента ограничена 60% контейнера на десктопе и становится 100% на малых экранах.
- В варианте `split` сетка: 55% (контент слева) и 45% (изображение справа).

#### Примеры

Split (две колонки):
```tsx
import { Content } from '@modules/content'
import { Button } from '@/ui'
import Star from '@icons/liga-logo.svg'

<Content
  variant="split"
  background="#f7f7fb"
  title={
    <>
      Удваиваем вашу прибыль <Star /> на маркетплейсах
    </>
  }
  subtitle="Wildberries и Ozon"
  description="8 из 10 пользователей увеличивают прибыль в среднем на 18% уже на втором месяце использования сервиса"
  subDescription="Отчеты помогают направить инвестиции для роста прибыли."
  buttons={
    <>
      <Button>Подключить бесплатно</Button>
      <Button colorScheme="white">Демо-кабинет</Button>
    </>
  }
  buttonsNote="4 дня бесплатно без привязки карты"
  imageSrc="/images/banner.jpg"
  imageAlt="Скрин приложения"
/>
```

Solid (цельный блок):
```tsx
import Heart from '@icons/github-mark.svg'

<Content
  variant="solid"
  background="linear-gradient(90deg,#f1e9ff,#eaf5ff)"
  title={<><Heart /> Пользуйтесь Prostoseller бесплатно</>}
  subtitle="Приглашайте друзей и пользуйтесь сервисом бесплатно"
  description="За каждого друга — по одному бесплатному месяцу тебе и ему"
  buttonsNote="Пригласил 12 друзей — держи год бесплатной аналитики"
/>
```



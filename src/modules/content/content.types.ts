import { ReactNode } from 'react'

export type ContentVariant = 'split' | 'solid'

export interface ContentProps {
  className?: string
  /** Вариант блока: 'split' — две колонки, 'solid' — цельный контейнер */
  variant?: ContentVariant
  /** Цвет фона всей секции (любой валидный CSS-цвет или значение) */
  backgroundRoot?: string
  /** Цвет фона контента */
  backgroundContent?: string

  /** Опциональное изображение справа для варианта 'split' */
  imageSrc?: string
  /** Альтернативный текст изображения */
  imageAlt?: string

  /** Заголовок. Принимает JSX/ReactNode — можно вставлять SVG прямо внутрь */
  title?: ReactNode
  /** HTML‑тег заголовка */
  titleTagName?: 'h1' | 'h2' | 'h3' | 'h4'
  /** Визуальный размер заголовка */
  titleSize?: 'sm' | 'md' | 'lg' | 'lgplus' | 'lgmin'

  /** Подзаголовок */
  subtitle?: ReactNode
  /** Описание */
  description?: ReactNode
  /** Подописание (вторичный блок под описанием) */
  subDescription?: ReactNode

  /** Контейнер с кнопками (может быть одна или две) */
  buttons?: ReactNode
  /** Подпись под кнопками */
  buttonsNote?: ReactNode
  /** Цвет текста */
  textColor?: boolean
  /** Размер контента */
  contentSize?: string
  /** Адаптивность изображения */
  imageAdaptive?: string
  /** CSS класс для обертки изображения */
  imageWrapClassName?: string
}

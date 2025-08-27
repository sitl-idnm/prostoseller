import { ReactNode } from 'react'

export interface TitleHandlerProps {
  className?: string
  /** Заголовок блока (принимает JSX — можно вставлять SVG) */
  title?: ReactNode
  /** Тег заголовка */
  titleTagName?: 'h1' | 'h2' | 'h3' | 'h4'
  /** Размер заголовка */
  titleSize?: 'sm' | 'md' | 'lg'
  /** Текстовая пометка справа от заголовка (пилюля) */
  mark?: ReactNode
  /** Необязательное описание под строкой заголовка */
  description?: ReactNode
  /** Доп. фон всей секции */
  background?: string
  /** Скрыть заголовок на mobile-large */
  hideTitleOnMobile?: boolean
  /** Содержимое ниже заголовка — любой модуль/контент */
  children?: ReactNode
}

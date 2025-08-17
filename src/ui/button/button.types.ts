import { ComponentProps, ElementType, ReactNode } from 'react'

export type ButtonVariant =
  | 'gradient' // 1. Градиентный фон, белый текст
  | 'gradientOutline' // 2. Прозрачный фон, градиентный бордер и градиентный текст
  | 'purple' // 3. Фиолетовый фон, белый текст
  | 'purpleOutline' // 4. Прозрачный фон, фиолетовый бордер и текст
  | 'white' // 5. Белый фон, фиолетовый текст, без бордера

export type ButtonSizeType = 'md' | 'sm'

type ButtonOwnProps<E extends ElementType = ElementType> = {
  as?: E
  isRouteLink?: boolean
  /** Новый вариант кнопки */
  variant?: ButtonVariant
  /** Backward-compat: colorScheme 'white'|'black' -> маппим на variant */
  colorScheme?: 'black' | 'white'
  size?: ButtonSizeType
  className?: string
  children?: string | ReactNode
  /** Иконка внутри кнопки (опционально) */
  icon?: ReactNode
  /** Расположение иконки относительно текста */
  iconPosition?: 'left' | 'right'
  /** Отступ между текстом и иконкой в px */
  iconGap?: number
}

export type ButtonProps<E extends ElementType> = ButtonOwnProps<E> &
  Omit<ComponentProps<E>, keyof ButtonOwnProps>

import { ReactNode } from 'react'

export interface CardProps {
  className?: string
  animated?: boolean
  icon?: ReactNode
  title?: ReactNode
  text?: ReactNode
  /** Кнопка (например, <Button/>) */
  action?: ReactNode
}

import { ReactNode } from 'react'

export interface FaqEntry {
  question: ReactNode
  answer: ReactNode
}

export interface FaqProps {
  className?: string
  /** Пункты FAQ. Если не заданы — используются дефолтные внутри модуля. */
  items?: FaqEntry[]
  /** Заголовок секции (если нужен) */
  title?: ReactNode
}
import { ReactNode } from 'react'

export interface PlusMinusPair {
  was: ReactNode
  became: ReactNode
}

export interface PlusMinusProps {
  className?: string
  /** Пары (было -> стало). На ПК «было» колонка слева, «стало» — справа. На мобиле — выводятся парами. */
  pairs: PlusMinusPair[]
  /** Заголовок карточек «было» */
  wasTitle?: ReactNode
  /** Заголовок карточек «стало» */
  becameTitle?: ReactNode
  /** Иконка для «было» (крестик) */
  wasIcon?: ReactNode
  /** Иконка для «стало» (галочка) */
  becameIcon?: ReactNode
}
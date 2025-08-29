import { ReactNode } from 'react'

export interface CardData {
  key?: string | number
  icon?: ReactNode
  title?: ReactNode
  text?: ReactNode
  action?: ReactNode
  animated?: boolean
  image?: string
}

export interface CardHolderProps {
  className?: string
  cards: CardData[]
  vertical?: boolean // Для вертикального расположения карточек
}

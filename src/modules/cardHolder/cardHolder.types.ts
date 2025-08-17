import { ReactNode } from 'react'

export interface CardData {
  key?: string | number
  icon?: ReactNode
  title?: ReactNode
  text?: ReactNode
  action?: ReactNode
  animated?: boolean
}

export interface CardHolderProps {
  className?: string
  cards: CardData[]
}
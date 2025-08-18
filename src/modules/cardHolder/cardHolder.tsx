'use client'

import { FC } from 'react'
import classNames from 'classnames'

import styles from './cardHolder.module.scss'
import { CardHolderProps } from './cardHolder.types'
import Card from '@/components/card/card'

const CardHolder: FC<CardHolderProps> = ({
  className,
  cards
}) => {
  const rootClassName = classNames(styles.root, className)

  const cols = 3
  const remainder = cards.length % cols
  const getCellClass = (index: number) => {
    const base = classNames(styles.cell, styles.item)
    // растягиваем последнюю карточку если есть остаток
    if (index === cards.length - 1 && remainder !== 0) {
      if (remainder === 1) return classNames(base, styles.cell_wide3)
      if (remainder === 2) return classNames(base, styles.cell_wide2)
    }
    return base
  }

  return (
    <div className={rootClassName}>
      <div className={styles.grid}>
        {cards.map((c, idx) => (
          <div key={c.key ?? idx} className={getCellClass(idx)}>
            <Card animated={c.animated} icon={c.icon} title={c.title} text={c.text} action={c.action} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default CardHolder

'use client'

import { FC, useState, useEffect } from 'react'
import classNames from 'classnames'

import styles from './cardHolder.module.scss'
import { CardHolderProps } from './cardHolder.types'
import Card from '@/components/card/card'
import { Button } from '@/ui'
import ArrowWhiteIcon from '@icons/arrowWhite.svg'

const CardHolder: FC<CardHolderProps> = ({
  className,
  cards,
  vertical = false
}) => {
  const rootClassName = classNames(styles.root, className)
  const [isMobile, setIsMobile] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [maxScroll, setMaxScroll] = useState(0)

  // Определяем мобильную версию
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Обработчик скролла для индикаторов
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement
    setScrollPosition(target.scrollLeft)
    setMaxScroll(target.scrollWidth - target.clientWidth)
  }

  // Определяем активную точку
  const getActiveDot = () => {
    if (maxScroll === 0) return 0
    const progress = scrollPosition / maxScroll
    return progress > 0.5 ? 1 : 0
  }

  const cols = 3 // Возвращаем к 3 колонкам как было
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

  // Рендер для мобильного режима с vertical (карточки друг под другом)
  if (isMobile && vertical) {
    return (
      <div className={rootClassName}>
        <div className={styles.verticalGrid}>
          {cards.map((c, idx) => (
            <div key={c.key ?? idx} className={styles.verticalItem}>
              <Card animated={c.animated} icon={c.icon} title={c.title} text={c.text} action={c.action} image={c.image} />
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Рендер для мобильного режима без vertical (горизонтальный скролл с двумя рядами)
  if (isMobile && !vertical) {
    return (
      <div className={rootClassName}>
        <div className={styles.mobileScrollContainer} onScroll={handleScroll}>
          {cards.map((c, idx) => (
            <div key={c.key ?? idx} className={styles.mobileCard}>
              <Card animated={c.animated} icon={c.icon} title={c.title} text={c.text} action={c.action} image={c.image} />
            </div>
          ))}
        </div>
        <div className={styles.scrollIndicators}>
          <div className={classNames(styles.dot, { [styles.dotActive]: getActiveDot() === 0 })} />
          <div className={classNames(styles.dot, { [styles.dotActive]: getActiveDot() === 1 })} />
        </div>
        <div className={styles.button}>
          <Button as="a" isRouteLink href="/login" variant="gradient" buttonWidth="100%" size="md" icon={<ArrowWhiteIcon />}>
            Подключить бесплатно
          </Button>
        </div>
      </div>
    )
  }

  // Десктопная версия (сетка 3x3 для всех случаев)
  return (
    <div className={rootClassName}>
      <div className={styles.grid}>
        {cards.map((c, idx) => (
          <div key={c.key ?? idx} className={getCellClass(idx)}>
            <Card animated={c.animated} icon={c.icon} title={c.title} text={c.text} action={c.action} image={c.image} />
          </div>
        ))}
      </div>
      <div className={styles.button}>
        <Button as="a" isRouteLink href="/login" variant="gradient" buttonWidth="100%" size="md" icon={<ArrowWhiteIcon />}>
          Подключить бесплатно
        </Button>
        <div className={styles.buttonsNote}>4 дня бесплатно без привязки карты</div>
      </div>
    </div>
  )
}

export default CardHolder

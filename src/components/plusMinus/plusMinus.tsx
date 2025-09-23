import { FC, useState, useEffect } from 'react'
import classNames from 'classnames'

import styles from './plusMinus.module.scss'
import { PlusMinusProps } from './plusMinus.types'
import Button from '@/ui/button/button'
import ArrowWhiteIcon from '@icons/arrowWhite.svg'

const PlusMinus: FC<PlusMinusProps> = ({
  className,
  pairs,
  wasTitle = 'Было:',
  becameTitle = 'Стало с Prostoseller:',
  wasIcon,
  becameIcon
}) => {
  const rootClassName = classNames(styles.root, className)
  const [isMobile, setIsMobile] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  // Определяем мобильную версию
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Автоматическое пролистывание карусели
  useEffect(() => {
    if (!isMobile || !isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % pairs.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isMobile, isAutoPlaying, pairs.length])

  // Обработчики для свайпов
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
    setIsAutoPlaying(false)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && currentSlide < pairs.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
    if (isRightSwipe && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }

    // Возобновляем автопрокрутку через 10 секунд после последнего касания
    setTimeout(() => {
      setIsAutoPlaying(true)
    }, 10000)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    // Возобновляем автопрокрутку через 10 секунд
    setTimeout(() => {
      setIsAutoPlaying(true)
    }, 10000)
  }

  return (
    <div className={rootClassName}>
      {/* Desktop: две колонки */}
      <div className={styles.grid}>
        <div className={`${styles.column} ${styles.column_was}`} aria-label="Было">
          <div className={styles.column_title}>{wasTitle}</div>
          {pairs.map((pair, idx) => (
            <div key={`was-${idx}`} className={styles.card}>
              <div className={styles.card_header}>
                {wasIcon && <span className={styles.icon}>{wasIcon}</span>}
              </div>
              <div className={styles.list}>{pair.was}</div>
            </div>
          ))}
        </div>

        <div className={`${styles.column} ${styles.column_before}`} aria-label="Стало">
          <div className={styles.column_title}>{becameTitle}</div>
          {pairs.map((pair, idx) => (
            <div key={`became-${idx}`} className={classNames(styles.card, styles.card)}>
              <div className={styles.card_header}>
                {becameIcon && <span className={styles.icon}>{becameIcon}</span>}
              </div>
              <div className={styles.list}>{pair.became}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.button}>
        <Button buttonWidth='70%' variant="gradient" icon={<ArrowWhiteIcon />}>Подключить бесплатно</Button>
        <div>
          <p>4 дня бесплатно без привязки карты</p>
        </div>
      </div>

      {/* Mobile: карусель */}
      <div className={styles.mobileCarousel}>
        <div
          className={styles.carouselContainer}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={styles.carouselTrack}
            style={{ transform: `translateX(-${currentSlide * 85}%)` }}
          >
            {pairs.map((pair, idx) => (
              <div key={`pair-${idx}`} className={styles.carouselSlide}>
                <div className={`${styles.card} ${styles.card_was}`}>
                  <div className={styles.cardHeader}>
                    {wasIcon && <span className={styles.icon}>{wasIcon}</span>}
                    <div className={styles.title}>{wasTitle}</div>
                  </div>
                  <div className={styles.list}>{pair.was}</div>
                </div>
                <div className={classNames(styles.card, styles.card_success, styles.card_became)} style={{ marginTop: 12 }}>
                  <div className={styles.cardHeader}>
                    {becameIcon && <span className={styles.icon}>{becameIcon}</span>}
                    <div className={styles.title}>{becameTitle}</div>
                  </div>
                  <div className={styles.list}>{pair.became}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.carouselIndicators}>
          {pairs.map((_, idx) => (
            <button
              key={idx}
              className={classNames(styles.carouselDot, { [styles.carouselDotActive]: currentSlide === idx })}
              onClick={() => goToSlide(idx)}
              aria-label={`Перейти к слайду ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default PlusMinus

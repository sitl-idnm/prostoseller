import { FC, useState, useEffect, useRef } from 'react'
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
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const slideWidthRef = useRef<number>(0)

  // Определяем мобильную версию
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Измеряем ширину слайда на мобиле и восстанавливаем scrollLeft
  useEffect(() => {
    if (!isMobile || !scrollRef.current) return
    const measure = () => {
      const firstSlide = scrollRef.current!.querySelector(`.${styles.carouselSlide}`) as HTMLElement | null
      slideWidthRef.current = firstSlide ? firstSlide.getBoundingClientRect().width : scrollRef.current!.clientWidth
    }
    measure()

    try {
      const saved = sessionStorage.getItem('PlusMinus:scrollLeft')
      if (saved) {
        const left = parseFloat(saved) || 0
        scrollRef.current.scrollLeft = left
        const w = slideWidthRef.current || scrollRef.current.clientWidth
        if (w > 0) setCurrentSlide(Math.max(0, Math.min(pairs.length - 1, Math.round(left / w))))
      }
    } catch { }

    const onResize = () => {
      measure()
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [isMobile, pairs.length])

  // Выравнивание высоты карточек по группам (красные и зеленые) на мобиле
  useEffect(() => {
    if (!isMobile || !scrollRef.current) return

    const equalize = () => {
      const container = scrollRef.current as HTMLDivElement
      const redCards = Array.from(container.querySelectorAll(`.${styles.card_was}`)) as HTMLDivElement[]
      const greenCards = Array.from(container.querySelectorAll(`.${styles.card_became}`)) as HTMLDivElement[]

      // reset
      redCards.forEach(c => { c.style.minHeight = '' })
      greenCards.forEach(c => { c.style.minHeight = '' })

      const redMax = redCards.length ? Math.max(...redCards.map(c => c.getBoundingClientRect().height)) : 0
      const greenMax = greenCards.length ? Math.max(...greenCards.map(c => c.getBoundingClientRect().height)) : 0

      if (redMax > 0) redCards.forEach(c => { c.style.minHeight = `${Math.ceil(redMax)}px` })
      if (greenMax > 0) greenCards.forEach(c => { c.style.minHeight = `${Math.ceil(greenMax)}px` })
    }

    equalize()
    window.addEventListener('resize', equalize)
    return () => window.removeEventListener('resize', equalize)
  }, [isMobile, pairs.length])

  // Автоматическое пролистывание карусели
  useEffect(() => {
    if (!isMobile || !isAutoPlaying || !scrollRef.current) return

    const id = setInterval(() => {
      const next = (currentSlide + 1) % pairs.length
      const w = slideWidthRef.current || scrollRef.current!.clientWidth
      scrollRef.current!.scrollTo({ left: next * w, behavior: 'smooth' })
      setCurrentSlide(next)
    }, 5000)

    return () => clearInterval(id)
  }, [isMobile, isAutoPlaying, pairs.length, currentSlide])

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
      const w = slideWidthRef.current || scrollRef.current?.clientWidth || 0
      scrollRef.current?.scrollTo({ left: (currentSlide + 1) * w, behavior: 'smooth' })
    }
    if (isRightSwipe && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
      const w = slideWidthRef.current || scrollRef.current?.clientWidth || 0
      scrollRef.current?.scrollTo({ left: (currentSlide - 1) * w, behavior: 'smooth' })
    }

    // Возобновляем автопрокрутку через 10 секунд после последнего касания
    setTimeout(() => {
      setIsAutoPlaying(true)
    }, 10000)
  }

  // Обновляем активную точку по скроллу (свободная прокрутка) и сохраняем позицию
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    const w = slideWidthRef.current || el.clientWidth
    if (w > 0) {
      const idx = Math.round(el.scrollLeft / w)
      if (idx !== currentSlide) setCurrentSlide(Math.max(0, Math.min(pairs.length - 1, idx)))
    }
    try {
      sessionStorage.setItem('PlusMinus:scrollLeft', String(el.scrollLeft))
    } catch { }
  }

  const goToSlide = (index: number) => {
    if (!scrollRef.current) return
    const w = slideWidthRef.current || scrollRef.current.clientWidth
    scrollRef.current.scrollTo({ left: index * w, behavior: 'smooth' })
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
        <Button buttonWidth='460px' variant="gradient" icon={<ArrowWhiteIcon />}>Подключить бесплатно</Button>
        <div className={styles.buttonsNote}>
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
          onScroll={handleScroll}
          ref={scrollRef}
          style={{ overflowX: 'auto', overflowY: 'visible', WebkitOverflowScrolling: 'touch' }}
        >
          <div
            className={styles.carouselTrack}
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

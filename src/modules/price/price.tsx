'use client'

import { FC, useEffect, useMemo, useRef, useState } from 'react'
import classNames from 'classnames'

import styles from './price.module.scss'
import { BillingPeriod, FeatureState, PriceProps, TariffPlan } from './price.types'
import { Button, RadioButton } from '@/ui'
import Link from 'next/link'

import Absent from '@icons/absent.svg'
import Included from '@icons/included.svg'
import Addon from '@icons/addon.svg'
import ArrowWhiteIcon from '@icons/arrowWhite.svg'

const Price: FC<PriceProps> = ({
  className,
  title = 'Тарифы',
  plans,
  defaultPeriod = 'sixMonths',
  period,
  onPeriodChange,
  showPeriodSwitch = true,
  showConnectButtons = true,
  onConnect
}) => {
  const rootClassName = classNames(styles.root, className)
  const [innerPeriod, setInnerPeriod] = useState<BillingPeriod>(defaultPeriod)
  const [currentPlanIndex, setCurrentPlanIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const activePeriod = period || innerPeriod

  const setPeriod = (p: BillingPeriod) => {
    setInnerPeriod(p)
    onPeriodChange?.(p)
  }

  const defaultPlans: TariffPlan[] = useMemo(
    () => [
      {
        id: 'start',
        title: 'Старт',
        shops: '1 магазин (Ozon или WB)',
        description: (
          <><strong>Бесплатный тариф</strong> с полным функционалом <strong>на 4 дня</strong></>
        ),
        features: [
          { label: 'Личные кабинеты OZON и WB', state: 'included' },
          { label: 'Графики и дашборды', state: 'included' },
          { label: 'Статусы товаров', state: 'included' },
          { label: 'Импорт себестоимости', state: 'included' },
          { label: 'Аналитика продаж, ABC-анализ', state: 'included' },
          { label: 'Начисления', state: 'included' },
          { label: 'Внесение дополнительных расходов', state: 'included' },
          { label: 'Внесение и учёт самовыкупов', state: 'included' },
          { label: 'Капитализация складов', state: 'included' },
          { label: 'Экспорт файлов', state: 'included' },
          { label: 'Автоматизированная рассылка отчётов на email, уведомление в Тelegram-bot', state: 'included' },
          { label: 'Живая поддержка клиентов', state: 'included' },
          { label: 'Управление планированием', state: 'included' },
          { label: 'Расчёт оборачиваемости товаров и планирование поставок', state: 'included' },
          { label: 'Расходы на рекламу (детализировано)', state: 'included' },
          { label: 'Калькулятор доходности и планирование цен', state: 'included' }
        ],
        priceByPeriod: { month: 0, sixMonths: 0 }
      },
      {
        id: 'basic',
        title: 'Базовый',
        shops: 'до 2х магазинов (1 Ozon и 1 WB)',
        description: (
          <>Тариф подходит для селлеров с <strong>оборотом</strong> до <strong>500 тыс. руб</strong></>
        ),
        features: [
          { label: 'Личные кабинеты OZON и WB', state: 'included' },
          { label: 'Графики и дашборды', state: 'included' },
          { label: 'Статусы товаров', state: 'included' },
          { label: 'Импорт себестоимости', state: 'included' },
          { label: 'Аналитика продаж, ABC-анализ', state: 'included' },
          { label: 'Начисления', state: 'included' },
          { label: 'Внесение дополнительных расходов', state: 'included' },
          { label: 'Внесение и учёт самовыкупов', state: 'included' },
          { label: 'Капитализация складов', state: 'included' },
          { label: 'Экспорт файлов', state: 'included' },
          { label: 'Автоматизированная рассылка отчётов на email, уведомление в Тelegram-bot', state: 'included' },
          { label: 'Живая поддержка клиентов', state: 'included' },
          { label: 'Управление планированием', state: 'absent' },
          { label: 'Расчёт оборачиваемости товаров и планирование поставок', state: 'absent' },
          { label: 'Расходы на рекламу (детализировано)', state: 'absent' },
          { label: 'Калькулятор доходности и цен <strong>990 руб</strong>', state: 'addon' },
          { label: `Каждый дополнительный магазин <strong>990 руб</strong>`, state: 'addon' }
        ],
        priceByPeriod: { month: 1990, sixMonths: 1590 }
      },
      {
        id: 'optimal',
        title: 'Оптимальный',
        shops: 'до 4х магазинов (Ozon и WB)',
        description: (
          <>Тариф подходит для селлеров, кому важна <strong>максимальная эффективность</strong></>
        ),
        features: [
          { label: 'Личные кабинеты OZON и WB', state: 'included' },
          { label: 'Графики и дашборды', state: 'included' },
          { label: 'Статусы товаров', state: 'included' },
          { label: 'Импорт себестоимости', state: 'included' },
          { label: 'Аналитика продаж, ABC-анализ', state: 'included' },
          { label: 'Начисления', state: 'included' },
          { label: 'Внесение дополнительных расходов', state: 'included' },
          { label: 'Внесение и учёт самовыкупов', state: 'included' },
          { label: 'Капитализация складов', state: 'included' },
          { label: 'Экспорт файлов', state: 'included' },
          { label: 'Автоматизированная рассылка отчётов на email, уведомление в Тelegram-bot', state: 'included' },
          { label: 'Живая поддержка клиентов', state: 'included' },
          { label: 'Управление планированием', state: 'included' },
          { label: 'Расчёт оборачиваемости товаров и планирование поставок', state: 'included' },
          { label: 'Расходы на рекламу (детализировано)', state: 'included' },
          { label: 'Калькулятор доходности и планирование цен', state: 'included' },
          { label: 'Каждый дополнительный магазин <strong>990 руб</strong>', state: 'addon' }
        ],
        priceByPeriod: { month: 3990, sixMonths: 3190 }
      }
    ],
    []
  )

  const plansToRender = plans && plans.length ? plans : defaultPlans

  // store previous prices to avoid animating 0 -> 0
  const prevPricesRef = useRef<Record<string, number>>({})

  // Автоматическое пролистывание карусели на мобильных
  useEffect(() => {
    if (typeof window === 'undefined') return
    const isMobile = window.innerWidth <= 768
    if (!isMobile || !isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentPlanIndex((prev) => (prev + 1) % plansToRender.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, plansToRender.length])

  // Обновление позиции карусели
  useEffect(() => {
    if (typeof window === 'undefined') return
    const isMobile = window.innerWidth <= 768
    if (!isMobile || !trackRef.current) return

    const track = trackRef.current
    const offset = currentPlanIndex * 100
    track.style.transform = `translateX(-${offset}%)`
  }, [currentPlanIndex])

  // Touch/swipe functionality
  const trackRef = useRef<HTMLDivElement | null>(null)
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
  const touchEndRef = useRef<{ x: number; y: number } | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    }
    setIsAutoPlaying(false)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return
    touchEndRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    }
  }

  const handleTouchEnd = () => {
    if (!touchStartRef.current || !touchEndRef.current) return

    const startX = touchStartRef.current.x
    const endX = touchEndRef.current.x
    const startY = touchStartRef.current.y
    const endY = touchEndRef.current.y

    const diffX = startX - endX
    const diffY = startY - endY

    // Check if it's a horizontal swipe (more horizontal than vertical)
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      if (diffX > 0) {
        // Swipe left - next
        setCurrentPlanIndex((prev) => Math.min(plansToRender.length - 1, prev + 1))
      } else {
        // Swipe right - previous
        setCurrentPlanIndex((prev) => Math.max(0, prev - 1))
      }
    }

    // Возобновляем автопрокрутку через 10 секунд
    setTimeout(() => {
      setIsAutoPlaying(true)
    }, 10000)

    // Reset touch state
    touchStartRef.current = null
    touchEndRef.current = null
  }

  const goToPlan = (index: number) => {
    setCurrentPlanIndex(index)
    setIsAutoPlaying(false)
    // Возобновляем автопрокрутку через 10 секунд
    setTimeout(() => {
      setIsAutoPlaying(true)
    }, 10000)
  }

  const AnimatedPrice: FC<{ id: string; value: number }> = ({ id, value }) => {
    const elRef = useRef<HTMLDivElement | null>(null)
    const tlRef = useRef<unknown>(null)
    const splitRef = useRef<{ revert?: () => void } | null>(null)

    useEffect(() => {
      const el = elRef.current
      if (!el) return
      const prev = prevPricesRef.current[id] ?? value
      const targetText = `${value.toLocaleString('ru-RU')} руб`

      // if no change or 0 -> 0 then just set text
      if (prev === value || (prev === 0 && value === 0)) {
        // stop any running animation (no dynamic import here to avoid await in non-async branch)
        try {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          import('gsap').then(({ default: gsap }) => {
            if (tlRef.current && typeof (tlRef.current as { kill: () => void }).kill === 'function') {
              ; (tlRef.current as { kill: () => void }).kill()
            }
            splitRef.current?.revert?.()
            gsap.killTweensOf(el)
            gsap.killTweensOf(el.children)
          })
        } catch { /* noop */ }
        el.textContent = targetText
        prevPricesRef.current[id] = value
        return
      }

      const run = async () => {
        try {
          const { default: gsap } = await import('gsap')
          const SplitTextModule = await import('gsap/SplitText')
          const SplitTextAny: unknown =
            (SplitTextModule as unknown as { default?: unknown; SplitText?: unknown }).SplitText ??
            (SplitTextModule as { default?: unknown }).default ??
            SplitTextModule
          // register plugin (runtime API, typings shimmed)
          gsap.registerPlugin(SplitTextAny as object)

          // kill previous
          if (tlRef.current && typeof (tlRef.current as { kill: () => void }).kill === 'function') {
            ; (tlRef.current as { kill: () => void }).kill()
          }
          splitRef.current?.revert?.()
          gsap.killTweensOf(el)
          gsap.killTweensOf(el.children)

          // set text and split
          el.textContent = targetText
          // runtime API usage
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
          splitRef.current = (SplitTextAny as { create: (el: Element, opts: { type: string }) => { chars: Element[]; revert?: () => void } }).create(el, { type: 'chars' })
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          gsap.set((splitRef.current as unknown as { chars: Element[] }).chars, { y: 12, autoAlpha: 0 })
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          tlRef.current = gsap.to((splitRef.current as unknown as { chars: Element[] }).chars, {
            duration: 0.6,
            y: 0,
            autoAlpha: 1,
            stagger: 0.02,
            ease: 'power2.out',
            onComplete: () => {
              prevPricesRef.current[id] = value
              // clean split wrappers to avoid nesting on successive runs
              if (splitRef.current?.revert) {
                splitRef.current.revert()
                splitRef.current = null
                el.textContent = targetText
              }
              tlRef.current = null
            }
          })
        } catch (e) {
          // GSAP not installed → simple text swap
          el.textContent = targetText
          prevPricesRef.current[id] = value
        }
      }

      run()
      return () => {
        // cleanup on unmount or deps change
        try {
          if (tlRef.current && typeof (tlRef.current as { kill: () => void }).kill === 'function') {
            ; (tlRef.current as { kill: () => void }).kill()
          }
          if (splitRef.current?.revert) splitRef.current.revert()
        } catch { /* noop */ }
      }
    }, [id, value])

    return (
      <div className={styles.priceValue} ref={elRef}>
        {`${value.toLocaleString('ru-RU')} руб`}
      </div>
    )
  }

  const renderFeature = (state: FeatureState, label: React.ReactNode, idx: number) => {
    const icon =
      state === 'included' ? (
        <Included />
      ) : state === 'absent' ? (
        <Absent />
      ) : state === 'addon' ? (
        <Addon />
      ) : null

    const className = classNames(styles.feature, {
      [styles.feature_absent]: state === 'absent',
      [styles.feature_hidden]: state === 'hidden',
      [styles.feature_addon]: state === 'addon'
    })

    // Если label содержит HTML теги, используем dangerouslySetInnerHTML
    const labelString = typeof label === 'string' ? label : String(label)
    const hasHtmlTags = /<[^>]*>/g.test(labelString)

    return (
      <div className={className} key={idx}>
        {icon}
        {hasHtmlTags ? (
          <div dangerouslySetInnerHTML={{ __html: labelString }} />
        ) : (
          <div>{label}</div>
        )}
      </div>
    )
  }

  return (
    <section className={rootClassName}>
      <div className={styles.header}>
        <h2>{title}</h2>
        {showPeriodSwitch && (
          <div className={styles.switch}>
            <div className={styles.periodOption}>
              <RadioButton
                className={styles.periodRadioButton}
                isSelected={activePeriod === 'sixMonths'}
                onClick={() => setPeriod('sixMonths')}
              >
                6 месяцев со скидкой 20%
              </RadioButton>
              <div className={classNames(styles.periodDescription, activePeriod === 'sixMonths' && styles.periodDescription_active)}>
                Пользователю доступны в отчете данные за оплаченный месяц и 5 предыдущих месяцев
              </div>
            </div>
            <div className={styles.periodOption}>
              <RadioButton
                className={styles.periodRadioButton}
                isSelected={activePeriod === 'month'}
                onClick={() => setPeriod('month')}
              >
                1 месяц без скидки
              </RadioButton>
              <div className={classNames(styles.periodDescription, activePeriod === 'month' && styles.periodDescription_active)}>
                Пользователю доступны в отчете данные за оплаченный месяц и предыдущий месяц
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={styles.grid}>
        <div
          className={styles.carouselTrack}
          ref={trackRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {plansToRender.map((plan) => (
            <div className={styles.card} key={plan.id}>
              <div>
                <div className={styles.planTitle}>{plan.title}</div>
                <div className={styles.planSubPurple}>{plan.shops}</div>
                <div className={styles.planSub}>{plan.description}</div>
                <div className={styles.features}>
                  {plan.features.map((f, i) => renderFeature(f.state, f.label, i))}
                </div>
              </div>
              <div className={styles.priceRow}>
                <div className={styles.priceLine}>
                  {activePeriod === 'sixMonths' && plan.priceByPeriod.month > plan.priceByPeriod.sixMonths && (
                    <div className={styles.oldPrice}>{`${plan.priceByPeriod.month.toLocaleString('ru-RU')} руб`}</div>
                  )}
                  <AnimatedPrice id={plan.id + '-price'} value={plan.priceByPeriod[activePeriod]} />
                </div>
                {showConnectButtons && (
                  onConnect ? (
                    <Button onClick={() => onConnect(plan.id, activePeriod)} icon={<ArrowWhiteIcon />} buttonWidth="100%" variant="gradient">
                      Подключить
                    </Button>
                  ) : (
                    <Button as={Link} href={{ pathname: '/login', query: { plan: plan.id, period: activePeriod } }} isRouteLink icon={<ArrowWhiteIcon />} buttonWidth="100%" variant="gradient">
                      Подключить
                    </Button>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Индикаторы прогресса */}
      <div className={styles.carouselIndicators}>
        {plansToRender.map((_, idx) => (
          <button
            key={idx}
            className={classNames(styles.carouselDot, { [styles.carouselDotActive]: currentPlanIndex === idx })}
            onClick={() => goToPlan(idx)}
            aria-label={`Перейти к тарифу ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default Price

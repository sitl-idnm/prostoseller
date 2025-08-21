'use client'

import { FC, useEffect, useMemo, useRef, useState } from 'react'
import classNames from 'classnames'

import styles from './price.module.scss'
import { BillingPeriod, FeatureState, PriceProps, TariffPlan } from './price.types'
import { Button } from '@/ui'
import Link from 'next/link'

const Price: FC<PriceProps> = ({
  className,
  title = 'Тарифы',
  plans,
  defaultPeriod = 'month',
  period,
  onPeriodChange,
  showPeriodSwitch = true,
  showConnectButtons = true,
  onConnect
}) => {
  const rootClassName = classNames(styles.root, className)
  const [innerPeriod, setInnerPeriod] = useState<BillingPeriod>(defaultPeriod)
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
          <>Бесплатный тариф с полным функционалом на 4 дня</>
        ),
        features: [
          { label: 'Личные кабинеты OZON и WB', state: 'included' },
          { label: 'Графики и дашборды', state: 'included' },
          { label: 'Статусы товаров', state: 'included' },
          { label: 'Импорт себестоимости', state: 'included' },
          { label: 'Аналитика продаж, ABC‑анализ', state: 'included' },
          { label: 'Начисления', state: 'included' },
          { label: 'Внесение дополнительных расходов', state: 'included' },
          { label: 'Внесение и учёт самовыкупов', state: 'included' },
          { label: 'Капитализация складов', state: 'included' },
          { label: 'Экспорт файлов', state: 'included' },
          { label: 'Автоматизированная рассылка отчётов на Email', state: 'included' },
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
          <>Тариф подходит для селлеров с оборотом до 500 тыс. руб</>
        ),
        features: [
          { label: 'Личные кабинеты OZON и WB', state: 'included' },
          { label: 'Графики и дашборды', state: 'included' },
          { label: 'Статусы товаров', state: 'included' },
          { label: 'Импорт себестоимости', state: 'included' },
          { label: 'Аналитика продаж, ABC‑анализ', state: 'included' },
          { label: 'Начисления', state: 'included' },
          { label: 'Внесение дополнительных расходов', state: 'included' },
          { label: 'Внесение и учёт самовыкупов', state: 'included' },
          { label: 'Капитализация складов', state: 'included' },
          { label: 'Экспорт файлов', state: 'included' },
          { label: 'Автоматизированная рассылка отчётов на Email', state: 'included' },
          { label: 'Живая поддержка клиентов', state: 'included' },
          { label: 'Управление планированием', state: 'absent' },
          { label: 'Расчёт оборачиваемости товаров и планирование поставок', state: 'absent' },
          { label: 'Расходы на рекламу (детализировано)', state: 'absent' },
          { label: 'Калькулятор доходности и планирование цен 990 руб', state: 'addon' },
          { label: 'Каждый дополнительный магазин 990 руб', state: 'addon' }
        ],
        priceByPeriod: { month: 1990, sixMonths: 1590 }
      },
      {
        id: 'optimal',
        title: 'Оптимальный',
        shops: 'до 4х магазинов (Ozon и WB)',
        description: (
          <>Тариф подходит для селлеров, кому важна максимальная эффективность</>
        ),
        features: [
          { label: 'Личные кабинеты OZON и WB', state: 'included' },
          { label: 'Графики и дашборды', state: 'included' },
          { label: 'Статусы товаров', state: 'included' },
          { label: 'Импорт себестоимости', state: 'included' },
          { label: 'Аналитика продаж, ABC‑анализ', state: 'included' },
          { label: 'Начисления', state: 'included' },
          { label: 'Внесение дополнительных расходов', state: 'included' },
          { label: 'Внесение и учёт самовыкупов', state: 'included' },
          { label: 'Капитализация складов', state: 'included' },
          { label: 'Экспорт файлов', state: 'included' },
          { label: 'Автоматизированная рассылка отчётов на Email', state: 'included' },
          { label: 'Живая поддержка клиентов', state: 'included' },
          { label: 'Управление планированием', state: 'included' },
          { label: 'Расчёт оборачиваемости товаров и планирование поставок', state: 'included' },
          { label: 'Расходы на рекламу (детализировано)', state: 'included' },
          { label: 'Калькулятор доходности и планирование цен', state: 'included' },
          { label: 'Каждый дополнительный магазин 990 руб', state: 'addon' }
        ],
        priceByPeriod: { month: 3990, sixMonths: 3190 }
      }
    ],
    []
  )

  const plansToRender = plans && plans.length ? plans : defaultPlans

  // store previous prices to avoid animating 0 -> 0
  const prevPricesRef = useRef<Record<string, number>>({})

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
        <span className={styles.featureIcon}>✓</span>
      ) : state === 'absent' ? (
        <span className={styles.featureIcon}>□</span>
      ) : state === 'addon' ? (
        <span className={styles.featureIcon}>＋</span>
      ) : null

    const className = classNames(styles.feature, {
      [styles.feature_absent]: state === 'absent',
      [styles.feature_hidden]: state === 'hidden',
      [styles.feature_addon]: state === 'addon'
    })
    return (
      <div className={className} key={idx}>
        {icon}
        <div>{label}</div>
      </div>
    )
  }

  return (
    <section className={rootClassName}>
      <div className={styles.header}>
        <h2>{title}</h2>
        {showPeriodSwitch && (
          <div className={styles.switch}>
            <Button variant={activePeriod === 'sixMonths' ? 'gradient' : 'purpleOutline'} onClick={() => setPeriod('sixMonths')}>
              6 мес скидка 20%
            </Button>
            <Button variant={activePeriod === 'month' ? 'gradient' : 'purpleOutline'} onClick={() => setPeriod('month')}>
              1 мес
            </Button>
          </div>
        )}
      </div>
      <div className={styles.grid}>
        {plansToRender.map((plan) => (
          <div className={styles.card} key={plan.id}>
            <div className={styles.planTitle}>{plan.title}</div>
            <div className={styles.planSub}>{plan.shops}</div>
            <div className={styles.planSub}>{plan.description}</div>
            <div className={styles.features}>
              {plan.features.map((f, i) => renderFeature(f.state, f.label, i))}
            </div>
            <div className={styles.priceRow}>
              <AnimatedPrice id={plan.id + '-price'} value={plan.priceByPeriod[activePeriod]} />
              {showConnectButtons && (
                onConnect ? (
                  <Button onClick={() => onConnect(plan.id, activePeriod)}>
                    Подключить →
                  </Button>
                ) : (
                  <Button as={Link} href={{ pathname: '/login', query: { plan: plan.id, period: activePeriod } }} isRouteLink>
                    Подключить →
                  </Button>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Price

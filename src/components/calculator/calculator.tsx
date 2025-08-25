'use client'

import { FC, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'

import styles from './calculator.module.scss'
import { CalculatorProps } from './calculator.types'
import { Button } from '@/ui'
import ArrowWhiteIcon from '@icons/arrowWhite.svg'

const Calculator: FC<CalculatorProps> = ({
  className,
  baseCoef = 497.5,
  optimalCoef = 597,
  min = 0,
  max = 100,
  step = 1,
  initial = 24,
  currency = '₽'
}) => {
  const rootClassName = classNames(styles.root, className)
  const [plan, setPlan] = useState<'base' | 'optimal'>('base')
  const [count, setCount] = useState<number>(initial)

  const coef = plan === 'base' ? baseCoef : optimalCoef
  const clamped = Math.min(Math.max(count, min), max)
  const income = Math.round(clamped * coef)
  const posPercent = `${((clamped - min) / (max - min)) * 100}%`

  // GSAP SplitText animation for income value
  const valueRef = useRef<HTMLSpanElement | null>(null)
  const prevValue = useRef<number>(income)

  useEffect(() => {
    const el = valueRef.current
    if (!el) return
    if (prevValue.current === income) return
    const run = async () => {
      try {
        const { default: gsap } = await import('gsap')
        // content flip: fade old up, fade new in with slight spring + pulse class
        const newText = `${income.toLocaleString('ru-RU')} ${currency}`
        await gsap.to(el, { y: -8, autoAlpha: 0, duration: 0.15, ease: 'power1.out' })
        el.textContent = newText
        el.classList.remove(styles.incomeValue_pulse)
        // force reflow to restart pulse
        void el.offsetHeight
        el.classList.add(styles.incomeValue_pulse)
        await gsap.fromTo(
          el,
          { y: 8, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.25, ease: 'power2.out' }
        )
      } catch {
        // fallback
        el.textContent = `${income.toLocaleString('ru-RU')} ${currency}`
      } finally {
        prevValue.current = income
      }
    }
    run()
  }, [income, currency])

  return (
    <div className={rootClassName}>
      <div className={styles.tabs}>
        <Button className={classNames(styles.tab, plan === 'base' && styles.tab_active)} onClick={() => setPlan('base')} variant={plan === 'base' ? 'purple' : 'purpleOutline'} buttonWidth='100%'>
          Базовый
        </Button>
        <Button className={classNames(styles.tab, plan === 'optimal' && styles.tab_active)} onClick={() => setPlan('optimal')} variant={plan === 'optimal' ? 'purple' : 'purpleOutline'} buttonWidth='100%'>
          Оптимальный
        </Button>
      </div>
      <div className={styles.title}>Тариф {plan === 'base' ? 'базовый' : 'оптимальный'}</div>
      <div className={styles.hint}>Укажите количество проведенных оплат клиентов:</div>
      {(() => {
        const cssVar = { '--pos': posPercent } as React.CSSProperties
        return (
          <div className={styles.rangeWrap} style={cssVar}>
            <div className={styles.badge}>{count}</div>
            <div className={styles.stick} />
            <input
              className={styles.range}
              type="range"
              min={min}
              max={max}
              step={step}
              value={clamped}
              onChange={(e) => setCount(Number(e.target.value))}
              onInput={(e) => setCount(Number((e.target as HTMLInputElement).value))}
            />
          </div>
        )
      })()}
      <div className={styles.incomeRow}>
        <span className={styles.incomeLabel}>Ваш доход:</span>
        <span ref={valueRef} className={styles.incomeValue}>
          {`${income.toLocaleString('ru-RU')} ${currency}`}
        </span>
      </div>
      <div className={styles.cta}>
        <Button as="a" href="/partners" isRouteLink variant="gradient" icon={<ArrowWhiteIcon />} buttonWidth='100%'>Стать партнером</Button>
      </div>
    </div>
  )
}

export default Calculator

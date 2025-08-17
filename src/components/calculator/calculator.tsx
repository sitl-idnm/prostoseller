'use client'

import { FC, useEffect, useMemo, useRef, useState } from 'react'
import classNames from 'classnames'

import styles from './calculator.module.scss'
import { CalculatorProps } from './calculator.types'
import { Button } from '@/ui'

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
  const income = Math.round(count * coef)
  const posPercent = ((count - min) / (max - min)) * 100

  // GSAP SplitText animation for income value
  const valueRef = useRef<HTMLSpanElement | null>(null)
  const prevValue = useRef<number>(income)

  useEffect(() => {
    const el = valueRef.current
    if (!el) return
    if (prevValue.current === income) return
    const run = async () => {
      try {
        const gsapModule: any = await import('gsap')
        const gsap = gsapModule.default || gsapModule
        const SplitTextModule: any = await import('gsap/SplitText')
        const SplitText = SplitTextModule.SplitText || SplitTextModule.default || SplitTextModule
        gsap.registerPlugin(SplitText)
        const text = `${income.toLocaleString('ru-RU')} ${currency}`
        el.textContent = text
        const split = SplitText.create(el, { type: 'chars' })
        gsap.set(split.chars, { y: 12, autoAlpha: 0 })
        await gsap.to(split.chars, { duration: 0.5, y: 0, autoAlpha: 1, stagger: 0.02, ease: 'power2.out' })
        if (split?.revert) split.revert()
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
        <button className={classNames(styles.tab, plan === 'base' && styles.tab_active)} onClick={() => setPlan('base')}>
          Базовый
        </button>
        <button className={classNames(styles.tab, plan === 'optimal' && styles.tab_active)} onClick={() => setPlan('optimal')}>
          Оптимальный
        </button>
      </div>
      <div className={styles.title}>Тариф {plan === 'base' ? 'базовый' : 'оптимальный'}</div>
      <div className={styles.hint}>Укажите количество проведенных оплат клиентов:</div>
      <div className={styles.rangeWrap} style={{ ['--pos' as any]: posPercent }}>
        <div className={styles.badge}>{count}</div>
        <div className={styles.stick} />
        <input
          className={styles.range}
          type="range"
          min={min}
          max={max}
          step={step}
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />
      </div>
      <div className={styles.incomeRow}>
        <span className={styles.incomeLabel}>Ваш доход:</span>
        <span ref={valueRef} className={styles.incomeValue}>
          {`${income.toLocaleString('ru-RU')} ${currency}`}
        </span>
      </div>
      <div className={styles.cta}>
        <Button as="a" href="/partners" isRouteLink variant="gradient">Стать партнером →</Button>
      </div>
    </div>
  )
}

export default Calculator

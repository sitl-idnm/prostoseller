export type CalcPlan = 'base' | 'optimal'

export interface CalculatorProps {
  className?: string
  /** Доход с одной оплаты для базового тарифа */
  baseCoef?: number
  /** Доход с одной оплаты для оптимального тарифа */
  optimalCoef?: number
  /** Минимум/максимум/шаг по количеству оплат */
  min?: number
  max?: number
  step?: number
  /** Начальное количество оплат */
  initial?: number
  /** Валюта (например, ₽) */
  currency?: string
}

export interface CalculatorProps {
  className?: string
}
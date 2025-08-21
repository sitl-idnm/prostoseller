import { ReactNode } from 'react'

export type BillingPeriod = 'month' | 'sixMonths'

export type FeatureState = 'absent' | 'included' | 'addon' | 'hidden'

export interface TariffFeature {
  label: ReactNode
  state: FeatureState
}

export interface TariffPlan {
  id: 'start' | 'basic' | 'optimal' | string
  title: string
  shops: string
  description: ReactNode
  features: TariffFeature[]
  priceByPeriod: {
    month: number
    sixMonths: number
  }
}

export interface PriceProps {
  className?: string
  title?: ReactNode
  plans?: TariffPlan[]
  defaultPeriod?: BillingPeriod
  /** внешний контрол для смены периода (например, через другие кнопки на странице) */
  period?: BillingPeriod
  onPeriodChange?: (period: BillingPeriod) => void
  /** скрыть внутренние переключатели периода внутри модуля */
  showPeriodSwitch?: boolean
  /** скрыть кнопки "Подключить" у тарифов */
  showConnectButtons?: boolean
  /** обработчик клика по кнопке подключения тарифа */
  onConnect?: (planId: string, period: BillingPeriod) => void
}

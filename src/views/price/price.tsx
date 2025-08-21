'use client'

import { FC, useState, useCallback } from 'react'
import classNames from 'classnames'

import styles from './price.module.scss'
import { PriceProps } from './price.types'
import { Price as PriceModule } from '@/modules/price'
import { Content } from '@/modules/content'
import { Button } from '@/ui'
import { Wrapper } from '@/ui/wrapper'

const Price: FC<PriceProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)
  const [period, setPeriod] = useState<'month' | 'sixMonths'>('month')
  const handleSix = useCallback(() => setPeriod('sixMonths'), [])
  const handleMonth = useCallback(() => setPeriod('month'), [])
  const handleConnect = useCallback((planId: string, p: 'month' | 'sixMonths') => {
    // example: navigate or open modal
    window.location.href = `/login?plan=${encodeURIComponent(planId)}&period=${p}`
  }, [])

  return (
    <main className={rootClassName}>
      <Wrapper className={styles.wrapper}>
        <Content
          variant="solid"
          background="#D9E3FF"
          title="Тарифы"
          subtitle="Мы знаем как важно получать выгоду селлерам, поэтому сделали скидку при оплате тарифа на шесть месяцев!"
          buttons={
            <>
              <Button variant={period === 'sixMonths' ? 'gradient' : 'gradientOutline'} onClick={handleSix}>6 мес{'\u00A0'}скидка 20% (в отчете данные за 6 мес)</Button>
              <Button variant={period === 'month' ? 'white' : 'purpleOutline'} onClick={handleMonth}>1 мес (в отчете данные за 2 мес)</Button>
            </>
          }
        />
        <PriceModule
          period={period}
          onPeriodChange={setPeriod}
          showPeriodSwitch={false}
          onConnect={handleConnect}
        />
      </Wrapper>
    </main>
  )
}

export default Price

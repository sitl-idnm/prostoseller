'use client'

import { FC, useState, useCallback, useEffect } from 'react'
import classNames from 'classnames'

import styles from './price.module.scss'
import { PriceProps } from './price.types'
import { Price as PriceModule } from '@/modules/price'
import { Content } from '@/modules/content'
import { Wrapper } from '@/ui/wrapper'

const Price: FC<PriceProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)
  const [period, setPeriod] = useState<'month' | 'sixMonths'>('sixMonths')
  const [isMobileLarge, setIsMobileLarge] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileLarge(window.innerWidth <= 965) // mobile-large breakpoint
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const handleConnect = useCallback((planId: string, p: 'month' | 'sixMonths') => {
    // example: navigate or open modal
    window.location.href = `/login?plan=${encodeURIComponent(planId)}&period=${p}`
  }, [])

  return (
    <main className={rootClassName}>
      <Wrapper className={styles.wrapper}>
        {!isMobileLarge && (
          <Content
            variant="split"
            backgroundRoot="url('/images/pricebackground.png') no-repeat center center / cover"
            backgroundContent="transparent"
            title="Тарифы"
            subtitle="Мы знаем как важно получать выгоду селлерам, поэтому сделали скидку при оплате тарифа на шесть месяцев!"
            textColor={true}
            contentSize="minmax(0, 65%) minmax(0, 35%)"
            imageSrc="/images/monitor.png"
            imageAlt="Скриншот кабинета"
            className={styles.content}
          />
        )}
        <PriceModule
          period={period}
          onPeriodChange={setPeriod}
          onConnect={handleConnect}
          defaultPeriod={period}
        />
      </Wrapper>
    </main>
  )
}

export default Price

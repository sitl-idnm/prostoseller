'use client'

import { FC, useEffect, useState } from 'react'
import classNames from 'classnames'

import styles from './header.module.scss'
import { HeaderProps } from './header.types'
import Logo from './logo'
import { Navigation, SocialLinks } from '@/components'

import SaleIcon from '@icons/sale-broken.svg'

import soundImageSrc from '@public/images/saleSound.png'
import giftImageSrc from '@public/images/saleGift.png'

import { Button, Wrapper } from '@/ui'
import Link from 'next/link'
import Image from 'next/image'

const Header: FC<HeaderProps> = ({ className }) => {
  const headerClassName = classNames(styles.root, className)

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 964)
    }

    // set initial state on mount
    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <header className={headerClassName}>
      <Wrapper>
        <div className={styles.wrapper}>
          {
            isMobile === false ?
              <>
                <Logo />
                <Navigation isMobile={isMobile} />
                <div className={styles.meta}>
                  <SocialLinks />
                  <Button isRouteLink as='a' href='https://lk.prostoseller.com/index.php?r=site%2Fsignup' className={styles.loginBtn} variant='gradient'>
                    Зарегистрироваться
                  </Button>
                  <Button isRouteLink as='a' href="https://lk.prostoseller.com/index.php?r=site%2Flogin" className={styles.loginBtn} variant='gradientOutline'>
                    Войти
                  </Button>
                </div>
              </>

              : isMobile === true &&
              <div className={styles.mobile}>
                <Logo />
                <div className={styles.mobileInner}>
                  <SocialLinks />
                  <Navigation isMobile={isMobile} />
                </div>
              </div>
          }

        </div>

        <div className={styles.promo}>
          <div className={`${styles.promoImage} ${styles.promoImageSound}`}>
            <Image src={soundImageSrc} alt="sale" />
          </div>
          <div className={styles.promoInner}>
            <div className={styles.promoText}>Получите скидку 20% при оплате на 6 месяцев</div>
            <Link href="/price" className={styles.promoCta}>Получить скидку <span className={styles.iconSale}><SaleIcon /></span></Link>
          </div>
          <div className={`${styles.promoImage} ${styles.promoImageGift}`}>
            <Image src={giftImageSrc} alt="sale" />
          </div>
        </div>
      </Wrapper >
    </header>
  )
}

export default Header

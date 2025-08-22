'use client'

import { FC, useEffect, useState } from 'react'
import classNames from 'classnames'

import styles from './header.module.scss'
import { HeaderProps } from './header.types'
import Logo from './logo'
import { Navigation, SocialLinks } from '@/components'

import IconAdmin from '@icons/admin.svg'
import { Wrapper } from '@/ui'
import PhoneIcon from '@icons/phoneicon.svg'

const IconPhone = () => (
  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_2085_37)">
      <path d="M20.0017 21.3441L18.2158 17.6363C17.8314 16.8441 17.3345 16.2675 16.4767 16.6191L14.7845 17.2472C13.4298 17.8754 12.7548 17.2472 12.0752 16.3004L9.02828 9.36755C8.64391 8.57536 8.84547 7.83005 9.70328 7.47849L12.0705 6.53161C12.9283 6.17536 12.7923 5.43474 12.408 4.64255L10.3783 0.864424C9.99391 0.0722365 9.20641 -0.119951 8.3486 0.231612C6.63297 0.939424 5.21266 2.05036 4.28922 3.69567C3.16422 5.70661 3.72672 8.50505 3.95172 9.68161C4.17672 10.8582 4.96422 12.9207 5.98141 15.0347C6.9986 17.1535 7.88922 18.8175 8.69078 19.7597C9.48766 20.7019 11.4002 23.28 13.7673 23.8566C15.708 24.3254 17.8033 23.9316 19.5189 23.2238C20.3814 22.8863 20.3814 22.141 20.0017 21.3441Z" fill="#A452D7" />
    </g>
    <defs>
      <clipPath id="clip0_2085_37">
        <rect width="24" height="24" fill="white" transform="translate(0 0.0722046)" />
      </clipPath>
    </defs>
  </svg>
)

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
                  <a href="tel:+74953637386" className={styles.phone}>
                    <span className={styles.icon}><IconPhone /></span>
                    +7 (495) 363-73-86
                  </a>
                  <SocialLinks />
                  <a href="/login" className={styles.loginBtn}>
                    <span className={styles.icon}><IconAdmin /></span>Войти / зарегистрироваться</a>
                </div>
              </>

              : isMobile === true &&
              <div className={styles.mobile}>
                <Logo />
                <div className={styles.mobileInner}>
                  <SocialLinks />
                  <a href="tel:+74953637386" className={styles.phone}>
                    <span className={styles.icon}><PhoneIcon /></span>
                  </a>
                  <Navigation isMobile={isMobile} />
                </div>
              </div>
          }

        </div>

        <div className={styles.promo}>
          <div className={styles.promoInner}>
            <div className={styles.promoText}>Получите скидку 20% при оплате на 6 месяцев</div>
            <a href="#" className={styles.promoCta}>Получить скидку</a>
          </div>
        </div>
      </Wrapper >
    </header>
  )
}

export default Header

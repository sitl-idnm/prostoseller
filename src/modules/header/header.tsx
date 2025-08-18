import { FC } from 'react'
import classNames from 'classnames'

import styles from './header.module.scss'
import { HeaderProps } from './header.types'
import Logo from './logo'
import { Navigation, SocialLinks } from '@/components'

const IconPhone = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C11.85 21 3 12.15 3 1a1 1 0 0 1 1-1h3.49a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.24 1.01l-2.2 2.2Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>
)

const Header: FC<HeaderProps> = ({ className }) => {
  const headerClassName = classNames(styles.root, className)
  return (
    <header className={headerClassName}>
      <div className={styles.wrapper}>
        <Logo />
        <Navigation />
        <div className={styles.meta}>
          <a href="tel:+74953637386" className={styles.phone}>
            <span className={styles.icon}><IconPhone /></span>
            +7 (495) 363-73-86
          </a>
          <SocialLinks />
          <a href="/login" className={styles.loginBtn}>Войти / зарегистрироваться</a>
        </div>
      </div>

      <div className={styles.promo}>
        <div className={styles.promoInner}>
          <div className={styles.promoText}>Получите скидку 20% при оплате на 6 месяцев</div>
          <a href="#" className={styles.promoCta}>Получить скидку</a>
        </div>
      </div>
    </header>
  )
}

export default Header

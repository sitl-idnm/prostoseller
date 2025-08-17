import { FC } from 'react'
import { Wrapper } from '@/ui'
import classNames from 'classnames'

import styles from './header.module.scss'
import { HeaderProps } from './header.types'
import Logo from './logo'
import { Navigation } from '@/components'

const IconPhone = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C11.85 21 3 12.15 3 1a1 1 0 0 1 1-1h3.49a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.24 1.01l-2.2 2.2Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>
)

const IconTg = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M21 3L3 11l6 2 2 6 10-16Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>
)

const IconWa = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M20.5 12a8.5 8.5 0 1 0-15.59 4.47L4 21l4.66-.88A8.5 8.5 0 0 0 20.5 12Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M8.5 9.5c.5 1.5 2.5 3.5 4 4l1.5-1 .5 2c-1 .5-2.5.5-4.5-1.5S8 10.5 8.5 9.5Z" fill="currentColor" />
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
          <div className={styles.messengers}>
            <a className={classNames(styles.messenger, styles.messenger_tg)} href="https://t.me/" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
              <IconTg />
            </a>
            <a className={classNames(styles.messenger, styles.messenger_wa)} href="https://wa.me/" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <IconWa />
            </a>
          </div>
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

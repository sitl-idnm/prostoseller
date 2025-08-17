import { FC } from 'react'
import { Wrapper } from '@/ui'

import styles from './footer.module.scss'

const IconLocation = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M12 22s7-7.163 7-12A7 7 0 0 0 5 10c0 4.837 7 12 7 12Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>
)

const IconPhone = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C11.85 21 3 12.15 3 1a1 1 0 0 1 1-1h3.49a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.24 1.01l-2.2 2.2Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>
)

const IconMail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>
)

const Footer: FC = () => (
  <footer className={styles.root}>
    <Wrapper className={styles.wrapper}>
      <div className={styles.grid}>
        <div className={styles.brand}>
          <div className={styles.logo}>PROSTOSELLER</div>
          <p className={styles.subtitle}>
            Ваш главный аналитик для увеличения доходов на маркетплейсах
          </p>
          <div className={styles.social}>
            <a className={styles.socialBtn} href="https://t.me/" target="_blank" rel="noopener noreferrer" aria-label="Telegram">TG</a>
            <a className={styles.socialBtn} href="https://wa.me/" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">WA</a>
          </div>
        </div>

        <div className={styles.contacts}>
          <div className={styles.title}>Контакты</div>
          <ul className={styles.contactList}>
            <li className={styles.contactItem}>
              <span className={styles.icon}><IconLocation /></span>
              <span>г. Москва ул.Рябиновая д.26 стр.8 БЦ Wast Plaza</span>
            </li>
            <li className={styles.contactItem}>
              <span className={styles.icon}><IconPhone /></span>
              <a href="tel:+74953637386">+7(495)363-73-86</a>
            </li>
            <li className={styles.contactItem}>
              <span className={styles.icon}><IconMail /></span>
              <a href="mailto:info@prostoseller.com">info@prostoseller.com</a>
            </li>
          </ul>
        </div>

        <div className={styles.navCol}>
          <div className={styles.title}>Навигация</div>
          <ul className={styles.links}>
            <li><a href="/">Главная</a></li>
            <li><a href="/login">Войти/зарегистрироваться</a></li>
            <li><a href="/company">О компании</a></li>
            <li><a href="/contacts">Контакты</a></li>
            <li><a href="/blog">Блог</a></li>
          </ul>
        </div>

        <div className={styles.navCol}>
          <div className={styles.title}>Как работает Prostoseller</div>
          <ul className={styles.links}>
            <li><a href="/partners">Партнерская программа</a></li>
            <li><a href="/inviteFriend">Пригласи друга</a></li>
            <li><a href="/price">Тарифы</a></li>
            <li><a href="/thanks">DEMO - кабинет</a></li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <a href="#">Согласие на рассылку</a>
        <a href="#">Лицензионное соглашение Prostoseller</a>
        <a href="#">Оферта для партнерской программы</a>
      </div>
    </Wrapper>
  </footer>
)

export default Footer

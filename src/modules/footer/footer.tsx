import { FC } from 'react'
import Link from 'next/link'

import styles from './footer.module.scss'
import Logo from '@icons/logo-footer.svg'
import SocialLinks from '@/components/socialLinks/socialLinks'

import IconLocation from '@icons/location.svg'
import MailIcon from '@icons/mail_dog.svg'
import PhoneIcon from '@icons/footer_phone.svg'
import Wrapper from '@/ui/wrapper/wrapper'

const Footer: FC = () => (
  <footer className={styles.root}>
    <Wrapper>
      <div className={styles.wrapper}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <Logo />
            </Link>
            <div className={styles.contactsMobile}>
              <ul className={styles.contactList}>
                <li className={styles.contactItem}>
                  <span className={styles.icon}><IconLocation /></span>
                  <span>г. Москва ул.Рябиновая д.26 стр.8 БЦ Wast Plaza</span>
                </li>
                <li className={styles.contactItem}>
                  <span className={styles.icon}><PhoneIcon /></span>
                  <a href="tel:+74953637386">+7(495)363-73-86</a>
                </li>
                <li className={styles.contactItem}>
                  <span className={styles.icon}><MailIcon /></span>
                  <a href="mailto:info@prostoseller.com">info@prostoseller.com</a>
                </li>
              </ul>
            </div>
            <p className={styles.subtitle}>
              Ваш главный аналитик для увеличения доходов на маркетплейсах
            </p>
            <SocialLinks />
          </div>

          <div className={styles.contacts}>
            <div className={styles.title}>Контакты</div>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <span className={styles.icon}><IconLocation /></span>
                <span>г. Москва ул.Рябиновая д.26 стр.8 БЦ Wast Plaza</span>
              </li>
              <li className={styles.contactItem}>
                <span className={styles.icon}><PhoneIcon /></span>
                <a href="tel:+74953637386">+7(495)363-73-86</a>
              </li>
              <li className={styles.contactItem}>
                <span className={styles.icon}><MailIcon /></span>
                <a href="mailto:info@prostoseller.com">info@prostoseller.com</a>
              </li>
            </ul>
          </div>

          <div className={styles.navCol}>
            <ul className={styles.links}>
              <li><Link href="/">Главная</Link></li>
              <li><Link href="/login">Войти/зарегистрироваться</Link></li>
              <li><Link href="/company">О компании</Link></li>
              <li><Link href="/contacts">Контакты</Link></li>
              <li><Link href="/blog">Блог</Link></li>
            </ul>
          </div>

          <div className={styles.navCol}>
            <ul className={styles.links}>
              <li><Link href="/how-it-works">Как работает Prostoseller</Link></li>
              <li><Link href="/partners">Партнерская программа</Link></li>
              <li><Link href="/inviteFriend">Пригласи друга</Link></li>
              <li><Link href="/price">Тарифы</Link></li>
              <li><Link href="/thanks">DEMO - кабинет</Link></li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <Link href="/approve">Согласие на рассылку</Link>
          <Link href="/policy">Политика конфиденциальности и обработки персональных данных</Link>
          <Link href="/licensy">Лицензионное соглашение Prostoseller</Link>
          <Link href="/oferta">Оферта для партнерской программы</Link>
        </div>
      </div>
    </Wrapper>
  </footer>
)

export default Footer

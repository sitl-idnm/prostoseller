import { FC } from 'react'
import Link from 'next/link'

import styles from './footer.module.scss'
import Logo from '@icons/logo-footer.svg'
import SocialLinks from '@/components/socialLinks/socialLinks'

import Wrapper from '@/ui/wrapper/wrapper'
import { LINKS } from '@/shared/const'

const Footer: FC = () => (
  <footer className={styles.root}>
    <Wrapper>
      <div className={styles.wrapper}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <Logo />
            </Link>
            <p className={styles.subtitle}>
              Удваиваем вашу прибыль на <span className={styles.wb}>Wildberries</span> и <span className={styles.ozon}>Ozon</span>
            </p>
          </div>

          <div className={styles.navCol}>
            <ul className={styles.links}>
              <li><Link href="/">Главная</Link></li>
              <li><Link href={LINKS.connectSignup}>Зарегистрироваться</Link></li>
              <li><Link href={LINKS.connectLogin}>Войти</Link></li>
              <li><Link href="/pricing">Тарифы</Link></li>
              <li><Link href="/#how-it-works">Как работает Prostoseller</Link></li>
            </ul>
          </div>

          <div className={styles.navCol}>
            <ul className={styles.links}>
              <li><Link href="/priglasi-druzej">Пригласи друга</Link></li>
              <li><Link href="/partnerskaya-programma">Партнерская программа</Link></li>
              <li><Link href="/nasha-kompaniya">О компании</Link></li>
              <li><Link href="/blog">Блог</Link></li>
            </ul>
          </div>

          <div className={styles.navCol}>
            <ul className={styles.links}>
              <li><Link href="/kontakty">Контакты</Link></li>
              <li><SocialLinks /></li>
              <li><Link href="https://wa.me/message/E3CSFZG7WBDMA1" target="_blank" rel="noopener noreferrer">Поддержка</Link></li>
              <li><Link href="mailto:info@prostoseller.com">info@prostoseller.com</Link></li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <Link href="/soglasie-rassylka">Согласие на рассылку</Link>
          <Link href="/politika-konfidencialnosti">Политика конфиденциальности и обработки персональных данных</Link>
          <Link href="/privacy-policy">Лицензионное соглашение Prostoseller</Link>
          <Link href="/oferta-partner">Оферта для партнерской программы</Link>
        </div>
      </div>
    </Wrapper>
  </footer>
)

export default Footer

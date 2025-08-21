"use client"

import { FC } from 'react'
import classNames from 'classnames'
import Link from 'next/link'

import styles from './navigation.module.scss'
import { NavigationProps } from './navigation.types'

const Navigation: FC<NavigationProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <ul className={rootClassName}>
      <li className={styles.item}><Link href="/price" className={styles.link}>Тарифы</Link></li>

      <li className={classNames(styles.item, styles.dropdown)}>
        <Link className={styles.trigger} href="/partners">
          Партнёрам <span className={styles.caret} aria-hidden>▾</span>
        </Link>
        <ul className={styles.menu}>
          <li className={styles.menuItem}><Link className={styles.menuLink} href="/inviteFriend">Пригласи друга</Link></li>
          <li className={styles.menuItem}><Link className={styles.menuLink} href="/partners">Партнерская программа</Link></li>
        </ul>
      </li>

      <li className={classNames(styles.item, styles.dropdown)}>
        <Link className={styles.trigger} href="/about">
          О нас <span className={styles.caret} aria-hidden>▾</span>
        </Link>
        <ul className={styles.menu}>
          <li className={styles.menuItem}><Link className={styles.menuLink} href="/company">О компании</Link></li>
          <li className={styles.menuItem}><Link className={styles.menuLink} href="/contacts">Контакты</Link></li>
          <li className={styles.menuItem}><Link className={styles.menuLink} href="/blog">Блог</Link></li>
        </ul>
      </li>
    </ul>
  )
}

export default Navigation

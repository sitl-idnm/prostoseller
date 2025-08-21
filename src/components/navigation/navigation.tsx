"use client"

import { FC } from 'react'
import classNames from 'classnames'

import styles from './navigation.module.scss'
import { NavigationProps } from './navigation.types'

const Navigation: FC<NavigationProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <ul className={rootClassName}>
      <li className={styles.item}><a href="/price" className={styles.link}>Тарифы</a></li>

      <li className={classNames(styles.item, styles.dropdown)}>
        <button className={styles.trigger} type="button" onClick={() => {
          window.location.href = '/partners'
        }}>
          Партнёрам <span className={styles.caret} aria-hidden>▾</span>
        </button>
        <ul className={styles.menu}>
          <li className={styles.menuItem}><a className={styles.menuLink} href="/inviteFriend">Пригласи друга</a></li>
          <li className={styles.menuItem}><a className={styles.menuLink} href="/partners">Партнерская программа</a></li>
        </ul>
      </li>

      <li className={classNames(styles.item, styles.dropdown)}>
        <button className={styles.trigger} type="button" onClick={() => {
          window.location.href = '/about'
        }}>
          О нас <span className={styles.caret} aria-hidden>▾</span>
        </button>
        <ul className={styles.menu}>
          <li className={styles.menuItem}><a className={styles.menuLink} href="/company">О компании</a></li>
          <li className={styles.menuItem}><a className={styles.menuLink} href="/contacts">Контакты</a></li>
          <li className={styles.menuItem}><a className={styles.menuLink} href="/blog">Блог</a></li>
        </ul>
      </li>
    </ul>
  )
}

export default Navigation

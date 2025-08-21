"use client"

import { FC, useState } from 'react'
import classNames from 'classnames'

import styles from './navigation.module.scss'
import { NavigationProps } from './navigation.types'

import BurgerIcon from '@icons/burger.svg'

const Navigation: FC<NavigationProps> = ({ className, isMobile }) => {
  const rootClassName = classNames(styles.root, className)

  const [isOpen, setIsOpen] = useState(false)

  return (
    !isMobile ? (
      <>
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
      </>
    ) : (
      <>
        <div className={styles.burger} onClick={() => setIsOpen(!isOpen)}>
          <span className={styles.burgerIcon}>
            <BurgerIcon />
          </span>
        </div>
        {
          isOpen && (
            <div className={styles.root}>
              <div className={styles.wrapper}>
                <div className={styles.menu}>

                </div>
              </div>
            </div>
          )
        }
      </>
    )
  )
}

export default Navigation

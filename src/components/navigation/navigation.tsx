"use client"

import { FC, useState, useEffect } from 'react'
import classNames from 'classnames'

import styles from './navigation.module.scss'
import { NavigationProps } from './navigation.types'

import BurgerIcon from '@icons/burger.svg'
import Link from 'next/link'

import IconAdmin from '@icons/admin.svg'
import Logo from '@/modules/header/logo'

const Navigation: FC<NavigationProps> = ({ className, isMobile }) => {
  const rootClassName = classNames(styles.root, className)

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isMobile) return

    const unlock = () => {
      const top = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      if (top) {
        const y = parseInt(top || '0', 10)
        window.scrollTo(0, -y)
      }
    }

    if (isOpen) {
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
      return () => unlock()
    } else {
      unlock()
    }
  }, [isOpen, isMobile])

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
            <div className={styles.root} onClick={() => setIsOpen(false)}>
              <div className={styles.wrapper}>
                <div className={styles.menu} onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    className={styles.close}
                    aria-label="Закрыть меню"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className={styles.closeIcon} aria-hidden>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                  <ul>
                    <li onClick={() => setIsOpen(false)}><Logo /></li>
                    <li><Link href="/login" className={styles.loginBtn} onClick={() => setIsOpen(false)}>
                      <span className={styles.icon}><IconAdmin /></span>Войти / зарегистрироваться</Link></li>
                    <li><Link href="/price" onClick={() => setIsOpen(false)}>Тарифы</Link></li>
                    <li><Link href="/partners" onClick={() => setIsOpen(false)}>Пригласи друга</Link></li>
                    <li><Link href="/partners" onClick={() => setIsOpen(false)}>Партнерская программа</Link></li>
                    <li><Link href="/about" onClick={() => setIsOpen(false)}>О нас</Link></li>
                    <li><Link href="/partners" onClick={() => setIsOpen(false)}>Контакты</Link></li>
                    <li><Link href="/about" onClick={() => setIsOpen(false)}>Блог</Link></li>
                  </ul>
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

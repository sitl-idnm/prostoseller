"use client"

import { FC, useState, useEffect } from 'react'
import classNames from 'classnames'

import styles from './navigation.module.scss'
import { NavigationProps } from './navigation.types'

import BurgerIcon from '@icons/burger.svg'
import Link from 'next/link'

import Logo from '@/modules/header/logo'
import { Portal } from '@/service/portal'
import { Button } from '@/ui'
import { SocialLinks } from '@/components'

const Navigation: FC<NavigationProps> = ({ className, isMobile }) => {
  const rootClassName = classNames(styles.root, className)

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isMobile) {
      // Ensure scroll is unlocked if switching to desktop
      const html = document.documentElement
      const top = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      document.body.dataset.scrollLocked = ''
      if (top) {
        const y = parseInt(top || '0', 10)
        const prev = html.style.scrollBehavior
        html.style.scrollBehavior = 'auto'
        window.scrollTo({ top: -y, left: 0, behavior: 'auto' })
        html.style.scrollBehavior = prev
      }
      return
    }

    const lock = () => {
      if (document.body.dataset.scrollLocked === '1') return
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
      document.body.dataset.scrollLocked = '1'
    }

    const unlock = () => {
      if (document.body.dataset.scrollLocked !== '1') return
      const html = document.documentElement
      const top = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      document.body.dataset.scrollLocked = ''
      if (top) {
        const y = parseInt(top || '0', 10)
        const prev = html.style.scrollBehavior
        html.style.scrollBehavior = 'auto'
        window.scrollTo({ top: -y, left: 0, behavior: 'auto' })
        html.style.scrollBehavior = prev
      }
    }

    if (isOpen) {
      lock()
      return () => unlock()
    } else {
      unlock()
    }
  }, [isOpen, isMobile])

  return (
    !isMobile ? (
      <>
        <ul className={rootClassName}>
          <li className={styles.item}><Link href="/price" className={styles.link}>Тарифы</Link></li>

          <li className={classNames(styles.item, styles.dropdown)}>
            <Link href="/partners" className={styles.trigger}>
              Партнёрам <span className={styles.caret} aria-hidden>▾</span>
            </Link>
            <ul className={styles.menu}>
              <li className={styles.menuItem}><Link href="/inviteFriend" className={styles.menuLink}>Пригласи друга</Link></li>
              <li className={styles.menuItem}><Link href="/partners" className={styles.menuLink}>Партнерская программа</Link></li>
            </ul>
          </li>

          <li className={classNames(styles.item, styles.dropdown)}>
            <button className={styles.trigger} type="button" onClick={() => {
              window.location.href = '/company'
            }}>
              О нас <span className={styles.caret} aria-hidden>▾</span>
            </button>
            <ul className={styles.menu}>
              <li className={styles.menuItem}><Link href="/company" className={styles.menuLink}>О компании</Link></li>
              <li className={styles.menuItem}><Link href="/contacts" className={styles.menuLink}>Контакты</Link></li>
              <li className={styles.menuItem}><Link href="/blog" className={styles.menuLink}>Блог</Link></li>
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
            <Portal selector="#modal-root">
              <div className={styles.root} onClick={() => setIsOpen(false)}>
                <div className={styles.wrapper}>
                  <div className={styles.menu} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.menuTop}>
                      <Logo />
                      <div className={styles.menuTopRight}>
                        <SocialLinks />
                        <button
                          type="button"
                          className={styles.burger}
                          aria-label="Закрыть меню"
                          onClick={() => setIsOpen(false)}
                        >
                          <span className={styles.burgerIcon}>
                            <BurgerIcon />
                          </span>
                        </button>
                      </div>
                    </div>

                    <div className={styles.menuCta}>
                      <Button isRouteLink as='a' href={'/login'} variant='gradient' buttonWidth="90%">Зарегистрироваться</Button>
                      <Button isRouteLink as='a' href={'/login'} variant='gradientOutline' buttonWidth="70%">Войти</Button>
                    </div>

                    <ul>
                      <li><Link href="/price" onClick={() => setIsOpen(false)}>Тарифы</Link></li>
                      <li><Link href="/inviteFriend" onClick={() => setIsOpen(false)}>Пригласи друга</Link></li>
                      <li><Link href="/partners" onClick={() => setIsOpen(false)}>Партнерская программа</Link></li>
                      <li><Link href="/company" onClick={() => setIsOpen(false)}>О компании</Link></li>
                      <li><Link href="/contacts" onClick={() => setIsOpen(false)}>Контакты</Link></li>
                      <li><Link href="/blog" onClick={() => setIsOpen(false)}>Блог</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </Portal>
          )
        }
      </>
    )
  )
}

export default Navigation

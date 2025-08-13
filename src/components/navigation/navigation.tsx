import { FC } from 'react'
import classNames from 'classnames'

import styles from './navigation.module.scss'
import { NavigationProps } from './navigation.types'

const Navigation: FC<NavigationProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <ul className={rootClassName}>
      <li className={styles.item}><a href="/">Главная</a></li>
      <li className={styles.item}><a href="/blog">Блог</a></li>
      <li className={styles.item}><a href="/company">О компании</a></li>
      <li className={styles.item}><a href="/contacts">Контакты</a></li>
      <li className={styles.item}><a href="/inviteFriend">Пригласить друга</a></li>
      <li className={styles.item}><a href="/partners">Парнёрам</a></li>
      <li className={styles.item}><a href="/price">Тарифы</a></li>
      <li className={styles.item}><a href="/thanks">Спасибо</a></li>
    </ul>
  )
}

export default Navigation

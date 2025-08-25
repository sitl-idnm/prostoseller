import { FC } from 'react'
import classNames from 'classnames'

import styles from './notice.module.scss'
import { NoticeProps } from './notice.types'

const Notice: FC<NoticeProps> = ({
  className,
  text
}) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <section className={rootClassName}>
      <p className={styles.text}>{text}</p>
    </section>
  )
}

export default Notice

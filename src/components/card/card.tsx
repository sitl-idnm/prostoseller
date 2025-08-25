import { FC } from 'react'
import classNames from 'classnames'

import styles from './card.module.scss'
import { CardProps } from './card.types'
import Image from 'next/image'

const Card: FC<CardProps> = ({
  className,
  animated = false,
  icon,
  title,
  text,
  image,
  action
}) => {
  const rootClassName = classNames(styles.root, className, {
    [styles.root_animated]: animated
  })

  return (
    <div className={rootClassName}>
      {animated && <div className={styles.corner} />}
      {/* overlay to tint text when corner grows over content */}
      {animated && <div className={styles.overlay} />}
      <div className={styles.inner}>
        <div className={styles.content}>
          {icon && <div className={styles.icon}>{icon}</div>}
          {title && <div className={styles.title}>{title}</div>}
          {text && <div className={styles.text}>{text}</div>}
          {action && <div className={styles.controls}>{action}</div>}
        </div>
        { image && <div className={styles.image}>
          <Image src={image} alt="card" width={400} height={400} quality={100} />
        </div> }
      </div>
    </div>
  )
}

export default Card

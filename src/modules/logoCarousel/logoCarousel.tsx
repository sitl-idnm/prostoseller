import { FC } from 'react'
import classNames from 'classnames'

import styles from './logoCarousel.module.scss'
import { LogoCarouselProps } from './logoCarousel.types'

const LogoCarousel: FC<LogoCarouselProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)
  
  return (
    <div className={rootClassName}></div>
  )
}

export default LogoCarousel

import { FC } from 'react'
import classNames from 'classnames'

import styles from './price.module.scss'
import { PriceProps } from './price.types'

const Price: FC<PriceProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)
  
  return (
    <div className={rootClassName}></div>
  )
}

export default Price

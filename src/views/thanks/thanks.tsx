import { FC } from 'react'
import classNames from 'classnames'

import styles from './thanks.module.scss'
import { ThanksProps } from './thanks.types'

const Thanks: FC<ThanksProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)
  
  return (
    <main className={rootClassName}></main>
  )
}

export default Thanks

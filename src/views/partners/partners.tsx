import { FC } from 'react'
import classNames from 'classnames'

import styles from './partners.module.scss'
import { PartnersProps } from './partners.types'

const Partners: FC<PartnersProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)
  
  return (
    <main className={rootClassName}></main>
  )
}

export default Partners

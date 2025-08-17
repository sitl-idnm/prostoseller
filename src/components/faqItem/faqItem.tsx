import { FC } from 'react'
import classNames from 'classnames'

import styles from './faqItem.module.scss'
import { FaqItemProps } from './faqItem.types'

const FaqItem: FC<FaqItemProps> = ({ className, children }) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <div className={rootClassName}>{children}</div>
  )
}

export default FaqItem

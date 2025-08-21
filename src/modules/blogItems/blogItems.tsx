import { FC } from 'react'
import classNames from 'classnames'

import styles from './blogItems.module.scss'
import { BlogItemsProps } from './blogItems.types'

const BlogItems: FC<BlogItemsProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)
  
  return (
    <div className={rootClassName}></div>
  )
}

export default BlogItems

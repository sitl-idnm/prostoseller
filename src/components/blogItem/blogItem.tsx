import { FC } from 'react'
import classNames from 'classnames'

import styles from './blogItem.module.scss'
import { BlogItemProps } from './blogItem.types'

const BlogItem: FC<BlogItemProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)
  
  return (
    <div className={rootClassName}></div>
  )
}

export default BlogItem

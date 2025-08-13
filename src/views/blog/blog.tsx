import { FC } from 'react'
import classNames from 'classnames'

import styles from './blog.module.scss'
import { BlogProps } from './blog.types'

const Blog: FC<BlogProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)
  
  return (
    <main className={rootClassName}></main>
  )
}

export default Blog

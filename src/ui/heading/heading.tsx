import { FC } from 'react'
import classNames from 'classnames'

import styles from './heading.module.scss'
import { HeadingProps } from './heading.types'

const Heading: FC<HeadingProps> = ({
  children,
  size = 'md',
  tagName = 'h2',
  className,
  txtColor
}) => {
  const TagName = tagName
  const rootClassName = classNames(
    styles.root,
    styles[`root_${size}`],
    className
  )
  return <TagName className={rootClassName} style={{ color: txtColor }}>{children}</TagName>
}

export default Heading

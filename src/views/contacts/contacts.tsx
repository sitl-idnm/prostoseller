import { FC } from 'react'
import classNames from 'classnames'

import styles from './contacts.module.scss'
import { ContactsProps } from './contacts.types'

const Contacts: FC<ContactsProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)
  
  return (
    <main className={rootClassName}></main>
  )
}

export default Contacts

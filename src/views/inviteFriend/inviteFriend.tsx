import { FC } from 'react'
import classNames from 'classnames'

import styles from './inviteFriend.module.scss'
import { InviteFriendProps } from './inviteFriend.types'

const InviteFriend: FC<InviteFriendProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)
  
  return (
    <main className={rootClassName}></main>
  )
}

export default InviteFriend

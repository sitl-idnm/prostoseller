import { FC } from 'react'
import classNames from 'classnames'

import styles from './login.module.scss'
import { LoginProps } from './login.types'

const Login: FC<LoginProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)
  
  return (
    <main className={rootClassName}></main>
  )
}

export default Login

import { FC } from 'react'
import { Wrapper } from '@/ui'
import classNames from 'classnames'

import styles from './header.module.scss'
import { HeaderProps } from './header.types'
import Logo from './logo'
import { Navigation } from '@/components'

const Header: FC<HeaderProps> = ({ className }) => {
  const headerClassName = classNames(styles.root, className)
  return (
    <header className={headerClassName}>
      <Wrapper className={styles.wrapper}>
        <Logo />
        <Navigation />
      </Wrapper>
    </header>
  )
}

export default Header

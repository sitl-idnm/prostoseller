import { FC } from 'react'
import Link from 'next/link'
import LogoProstoseller from '@icons/LogoProstoseller.svg'

import styles from './logo.module.scss'

const Logo: FC = () => (
  <Link href="/" className={styles.root} aria-label="home">
    <LogoProstoseller />
  </Link>
)

export default Logo

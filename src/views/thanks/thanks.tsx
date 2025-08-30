import { FC } from 'react'
import classNames from 'classnames'

import styles from './thanks.module.scss'
import { ThanksProps } from './thanks.types'
import { ThankYou } from '@/components/thankYou/thankYou'
import { Wrapper } from '@/ui/wrapper'

const Thanks: FC<ThanksProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <main className={rootClassName}>
      <Wrapper className={styles.wrapper}>
        <ThankYou />
      </Wrapper>
    </main>
  )
}

export default Thanks

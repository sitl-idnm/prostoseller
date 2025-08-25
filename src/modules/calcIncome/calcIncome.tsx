import { FC } from 'react'
import classNames from 'classnames'

import styles from './calcIncome.module.scss'
import { CalcIncomeProps } from './calcIncome.types'
import { Calculator } from '@/components'

const CalcIncome: FC<CalcIncomeProps> = ({
  className,
  title,
  text
}) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <section className={rootClassName}>
      <div className={styles.left}>
        <h2 className={styles.title}>
          {title}
        </h2>
        <p className={styles.text}>
          {text}
        </p>
      </div>
      <div className={styles.right}>
        <Calculator />
      </div>
    </section>
  )
}

export default CalcIncome

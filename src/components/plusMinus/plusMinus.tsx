import { FC } from 'react'
import classNames from 'classnames'

import styles from './plusMinus.module.scss'
import { PlusMinusProps } from './plusMinus.types'

const PlusMinus: FC<PlusMinusProps> = ({
  className,
  pairs,
  wasTitle = 'Было:',
  becameTitle = 'Стало с Prostoseller:',
  wasIcon,
  becameIcon
}) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <div className={rootClassName}>
      {/* Desktop: две колонки */}
      <div className={styles.grid}>
        <div className={styles.column} aria-label="Было">
          {pairs.map((pair, idx) => (
            <div key={`was-${idx}`} className={styles.card}>
              {idx === 0 && (
                <div className={styles.cardHeader}>
                  {wasIcon && <span className={styles.icon}>{wasIcon}</span>}
                  <div>{wasTitle}</div>
                </div>
              )}
              <div className={styles.list}>{pair.was}</div>
            </div>
          ))}
        </div>

        <div className={styles.column} aria-label="Стало">
          {pairs.map((pair, idx) => (
            <div key={`became-${idx}`} className={classNames(styles.card, styles.card_success)}>
              {idx === 0 && (
                <div className={styles.cardHeader}>
                  {becameIcon && <span className={styles.icon}>{becameIcon}</span>}
                  <div>{becameTitle}</div>
                </div>
              )}
              <div className={styles.list}>{pair.became}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: парами */}
      <div className={styles.pair}>
        {pairs.map((pair, idx) => (
          <div key={`pair-${idx}`} style={{ marginBottom: 16 }}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                {wasIcon && <span className={styles.icon}>{wasIcon}</span>}
                <div>{wasTitle}</div>
              </div>
              <div className={styles.list}>{pair.was}</div>
            </div>
            <div className={classNames(styles.card, styles.card_success)} style={{ marginTop: 12 }}>
              <div className={styles.cardHeader}>
                {becameIcon && <span className={styles.icon}>{becameIcon}</span>}
                <div>{becameTitle}</div>
              </div>
              <div className={styles.list}>{pair.became}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PlusMinus

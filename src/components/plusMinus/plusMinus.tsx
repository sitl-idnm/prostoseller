import { FC } from 'react'
import classNames from 'classnames'

import styles from './plusMinus.module.scss'
import { PlusMinusProps } from './plusMinus.types'
import Button from '@/ui/button/button'
import ArrowWhiteIcon from '@icons/arrowWhite.svg'

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
        <div className={`${styles.column} ${styles.column_was}`} aria-label="Было">
          <div className={styles.column_title}>{wasTitle}</div>
          {pairs.map((pair, idx) => (
            <div key={`was-${idx}`} className={styles.card}>
              <div className={styles.card_header}>
                {wasIcon && <span className={styles.icon}>{wasIcon}</span>}
              </div>
              <div className={styles.list}>{pair.was}</div>
            </div>
          ))}
        </div>

        <div className={`${styles.column} ${styles.column_before}`} aria-label="Стало">
          <div className={styles.column_title}>{becameTitle}</div>
          {pairs.map((pair, idx) => (
            <div key={`became-${idx}`} className={classNames(styles.card, styles.card)}>
              <div className={styles.card_header}>
                {becameIcon && <span className={styles.icon}>{becameIcon}</span>}
              </div>
              <div className={styles.list}>{pair.became}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.button}>
        <Button variant="gradient" icon={<ArrowWhiteIcon />}>Подключить бесплатно</Button>
        <div>
          <p>4 дня бесплатно без привязки карты</p>
        </div>
      </div>

      {/* Mobile: парами */}
      <div className={styles.pair}>
        {pairs.map((pair, idx) => (
          <div key={`pair-${idx}`}>
            <div className={`${styles.card} ${styles.card_was}`}>
              <div className={styles.cardHeader}>
                {wasIcon && <span className={styles.icon}>{wasIcon}</span>}
                <div className={styles.title}>{wasTitle}</div>
              </div>
              <div className={styles.list}>{pair.was}</div>
            </div>
            <div className={classNames(styles.card, styles.card_success, styles.card_became)} style={{ marginTop: 12 }}>
              <div className={styles.cardHeader}>
                {becameIcon && <span className={styles.icon}>{becameIcon}</span>}
                <div className={styles.title}>{becameTitle}</div>
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

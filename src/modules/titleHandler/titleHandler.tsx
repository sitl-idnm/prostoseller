import { FC } from 'react'
import classNames from 'classnames'

import styles from './titleHandler.module.scss'
import { TitleHandlerProps } from './titleHandler.types'
import { Heading } from '@/ui'

const TitleHandler: FC<TitleHandlerProps> = ({
  className,
  title,
  titleTagName = 'h2',
  titleSize = 'md',
  mark,
  description,
  background,
  hideTitleOnMobile,
  children
}) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <section className={rootClassName} style={{ background }}>
      <div>
        <div className={styles.inner}>
          <div className={styles.header}>
            {title && (
              <Heading tagName={titleTagName} size={titleSize} className={classNames(styles.title, hideTitleOnMobile && styles.title_hideMobile)}>
                {title}
              </Heading>
            )}
            {description && <div className={styles.description}>{description}</div>}
          </div>
          {mark && <div className={styles.mark}>{mark}</div>}
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </section>
  )
}

export default TitleHandler

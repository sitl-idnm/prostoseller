import { FC } from 'react'
import classNames from 'classnames'

import styles from './content.module.scss'
import { ContentProps } from './content.types'
import { Heading, Wrapper } from '@/ui'
import Image from 'next/image'

const Content: FC<ContentProps> = ({
  className,
  variant = 'split',
  background,
  imageSrc,
  imageAlt = '',
  title,
  titleTagName = 'h2',
  titleSize = 'md',
  subtitle,
  description,
  subDescription,
  buttons,
  buttonsNote
}) => {
  const rootClassName = classNames(styles.root, className)
  const innerClassName = classNames(styles.inner, {
    [styles.inner_split]: variant === 'split'
  })
  const contentClassName = classNames(styles.content, {
    [styles.content_solidLimit]: variant === 'solid'
  })

  return (
    <section className={rootClassName} style={{ background }}>
      <Wrapper>
        <div className={innerClassName}>
          <div className={contentClassName}>
            {title && (
              <Heading tagName={titleTagName} size={titleSize} className={styles.title}>
                {title}
              </Heading>
            )}
            {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
            {description && <div className={styles.description}>{description}</div>}
            {subDescription && (
              <div className={styles.subDescription}>{subDescription}</div>
            )}
            {buttons && <div className={styles.buttons}>{buttons}</div>}
            {buttonsNote && <div className={styles.buttonsNote}>{buttonsNote}</div>}
          </div>

          {variant === 'split' && imageSrc && (
            <div className={styles.imageWrap}>
              <Image src={imageSrc} alt={imageAlt} width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} />
            </div>
          )}
        </div>
      </Wrapper>
    </section>
  )
}

export default Content

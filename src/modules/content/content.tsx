import { FC } from 'react'
import classNames from 'classnames'

import styles from './content.module.scss'
import { ContentProps } from './content.types'
import { Heading } from '@/ui'
import Image from 'next/image'

const Content: FC<ContentProps> = ({
  className,
  variant = 'split',
  backgroundRoot,
  backgroundContent,
  imageSrc,
  imageAlt = '',
  title,
  titleTagName = 'h2',
  titleSize = 'md',
  subtitle,
  description,
  subDescription,
  buttons,
  buttonsNote,
  textColor,
  contentSize,
  ...props
}) => {
  const rootClassName = classNames(styles.root, className)
  const innerClassName = classNames(styles.inner, {
    [styles.inner_split]: variant === 'split'
  })
  const contentClassName = classNames(styles.content, {
    [styles.content_solidLimit]: variant === 'solid'
  })
  const titleClassName = classNames(styles.title, titleSize && styles[`title_${titleSize}`])

  let txtColor = '#333'
  if (textColor) {
    txtColor = '#fff'
  }

  return (
    <section className={rootClassName} style={{ background: backgroundRoot, backgroundSize: 'cover', ...props }}>
      <div className={innerClassName} style={{ gridTemplateColumns: contentSize }}>
        <div className={contentClassName} style={{ background: backgroundContent }}>
          {title && (
            <Heading tagName={titleTagName} className={titleClassName} txtColor={txtColor}>
              {title}
            </Heading>
          )}
          {subtitle && <div className={styles.subtitle} style={{ color: txtColor }}>{subtitle}</div>}
          {description && <div className={styles.description}>{description}</div>}
          {subDescription && (
            <div className={styles.subDescription}>{subDescription}</div>
          )}
          <div className={styles.buttonsWrap}>
            {buttons && <div className={styles.buttons}>{buttons}</div>}
            {buttonsNote && <div className={styles.buttonsNote}>{buttonsNote}</div>}
          </div>
        </div>

        {variant === 'split' && imageSrc && (
          <div className={styles.imageWrap}>
            <Image src={imageSrc} alt={imageAlt} width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} />
          </div>
        )}
      </div>
    </section>
  )
}

export default Content

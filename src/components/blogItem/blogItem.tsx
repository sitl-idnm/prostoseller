import { FC } from 'react'
import classNames from 'classnames'
import Link from 'next/link'

import styles from './blogItem.module.scss'
import { BlogItemProps } from './blogItem.types'

const BlogItem: FC<BlogItemProps> = ({
  className,
  title,
  description,
  href,
  imageSrc,
  date,
  tags
}) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <article className={rootClassName}>
      <div className={styles.content}>
        {date && <div className={styles.date}>{date}</div>}
      </div>
      {imageSrc && (
        <Link href={href} className={styles.imageWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageSrc} alt={title} className={styles.image} />
        </Link>
      )}
      <div className={styles.content}>
        <h3 className={styles.title}>
          <Link href={href}>{title}</Link>
        </h3>
        {description && <p className={styles.description}>{description}</p>}
        {tags && tags.length > 0 && (
          <div className={styles.tags}>
            {tags.map((t) => (
              <span key={t} className={styles.tag}>{t}</span>
            ))}
          </div>
        )}
        <div className={styles.actions}>
          <Link href={href} className={styles.more}>Подробнее →</Link>
        </div>
      </div>
    </article>
  )
}

export default BlogItem

"use client"
import { FC, useMemo, useState, useCallback } from 'react'
import classNames from 'classnames'

import styles from './blogItems.module.scss'
import { BlogItemsProps } from './blogItems.types'
import { BlogItem } from '@/components'
import { Button } from '@/ui'

const BlogItems: FC<BlogItemsProps> = ({
  className,
  items,
  gap = 24,
  columns = 3,
  initialRows = 1,
  showMoreStep = 3
}) => {
  const rootClassName = classNames(styles.root, className)

  const initialVisible = useMemo(() => Math.min(items.length, Math.max(1, initialRows) * Math.max(1, columns)), [items.length, initialRows, columns])
  const [visibleCount, setVisibleCount] = useState<number>(initialVisible)
  const canShowMore = visibleCount < items.length

  const handleShowMore = useCallback(() => {
    if (!canShowMore) return
    if (showMoreStep === 'all') {
      setVisibleCount(items.length)
    } else {
      const step = Math.max(1, showMoreStep)
      setVisibleCount((v) => Math.min(items.length, v + step))
    }
  }, [canShowMore, items.length, showMoreStep])

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${Math.max(1, columns)}, minmax(0, 1fr))`,
    gap: typeof gap === 'number' ? `${gap}px` : gap
  }

  return (
    <section className={rootClassName}>
      <div className={styles.grid} style={gridStyle}>
        {items.slice(0, visibleCount).map((item) => (
          <BlogItem
            key={item.id}
            title={item.title}
            description={item.description}
            href={item.href}
            imageSrc={item.imageSrc}
            date={item.date}
            tags={item.tags}
          />
        ))}
      </div>

      {canShowMore && (
        <div className={styles.moreWrap}>
          <Button variant="gradientOutline" onClick={handleShowMore}>
            Показать ещё
          </Button>
        </div>
      )}
    </section>
  )
}

export default BlogItems

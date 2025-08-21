'use client'

import { FC, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import classNames from 'classnames'

import styles from './blogPost.module.scss'
import { BlogPostProps } from './blogPost.types'
import { Wrapper } from '@/ui/wrapper'

interface TocItem { id: string; text: string }

const BlogPost: FC<BlogPostProps> = ({ className, title, author, authorRole, authorAvatarSrc, date, readTimeMin, views, imageSrc, children }) => {
	const rootClassName = classNames(styles.root, className)
	const contentRef = useRef<HTMLDivElement | null>(null)
	const [toc, setToc] = useState<TocItem[]>([])

	useEffect(() => {
		const root = contentRef.current
		if (!root) return
		const h2s = Array.from(root.querySelectorAll('h2')) as HTMLHeadingElement[]
		const items: TocItem[] = h2s.map((h, i) => {
			if (!h.id) h.id = `section-${i + 1}`
			return { id: h.id, text: h.textContent || `Section ${i + 1}` }
		})
		setToc(items)
	}, [children])

	return (
		<div className={rootClassName}>
			<Wrapper>
				<div className={styles.back}>
					<Link href="/blog">← Назад к блогу</Link>
				</div>
				<h1>{title}</h1>
				<div className={styles.meta}>
					<div className={styles.metaLeft}>
						{authorAvatarSrc ? (
							/* eslint-disable-next-line @next/next/no-img-element */
							<img src={authorAvatarSrc} alt={author || ''} className={styles.avatar} />
						) : (
							<div className={styles.avatar} aria-hidden />
						)}
						<div>
							<div className={styles.authorTitle}>Автор публикации:</div>
							<div className={styles.authorName}>{author || '—'}</div>
							{authorRole && <div className={styles.authorRole}>{authorRole}</div>}
						</div>
					</div>
					<div className={styles.metaRight}>
						<div className={styles.metaRow}>
							<div className={styles.metaLabel}>Дата публикации:</div>
							<div className={styles.metaValue}>{date || '—'}</div>
						</div>
						<div className={styles.metaRow}>
							<div className={styles.metaLabel}>Время на прочтение:</div>
							<div className={styles.metaValue}>{readTimeMin ? `${readTimeMin} мин` : '—'}</div>
						</div>
						<div className={styles.metaRow}>
							<div className={styles.metaLabel}>Количество просмотров:</div>
							<div className={styles.metaValue}>{typeof views === 'number' ? views : '—'}</div>
						</div>
					</div>
				</div>
			</Wrapper>

			{imageSrc && (
				<Wrapper>
					<div className={styles.cover}>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img src={imageSrc} alt="cover" style={{ width: '100%', height: 'auto', display: 'block' }} />
					</div>
				</Wrapper>
			)}

			<Wrapper>
				<div className={styles.grid}>
					<aside className={styles.toc} aria-label="Содержание">
						<div className={styles.tocTitle}>Содержание статьи:</div>
						<nav className={styles.tocList}>
							{toc.map(item => (
								<Link key={item.id} href={`#${item.id}`}>{item.text}</Link>
							))}
						</nav>
					</aside>
					<article className={styles.content} ref={contentRef}>
						{children}
					</article>
				</div>
			</Wrapper>
		</div>
	)
}

export default BlogPost

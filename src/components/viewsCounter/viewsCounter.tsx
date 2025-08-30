'use client'

import { FC } from 'react'
import { useViews } from '@/shared/hooks/useViews'
import { formatViews } from '@/shared/utils/formatViews'
import styles from './viewsCounter.module.scss'

interface ViewsCounterProps {
	postId: string
	initialViews: number
	className?: string
}

export const ViewsCounter: FC<ViewsCounterProps> = ({ postId, initialViews, className }) => {
	const views = useViews(postId, initialViews)

	return (
		<div className={`${styles.counter} ${className || ''}`}>
			<span className={styles.icon}>👁️</span>
			<span className={styles.views}>{formatViews(views)}</span>
		</div>
	)
}

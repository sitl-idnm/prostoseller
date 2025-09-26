'use client'

import { type ReactNode } from 'react'
import styles from './posts.layout.module.scss'

export default function PostsLayout({ children }: { children: ReactNode }) {

	return (
		<div className={styles.root}>
			{children}
		</div>
	)
}

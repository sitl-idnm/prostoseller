import { ReactNode } from 'react'

export interface BlogPostProps {
	className?: string
	title: string
	author?: string
	authorRole?: string
	authorAvatarSrc?: string
	date?: string
	readTimeMin?: number
	views?: number
	imageSrc?: string
	children: ReactNode
}

import { ReactNode } from 'react'
import type { BlogListItemData } from '@/modules/blogItems'

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
	/** текущий идентификатор поста (для фильтрации из related) */
	currentId?: string
	/** карточки для блока "Может быть интересно" */
	related?: BlogListItemData[]
	children: ReactNode
}

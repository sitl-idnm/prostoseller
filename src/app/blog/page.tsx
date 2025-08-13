import { BlogView } from '@/views/blog'
import type { Metadata } from 'next'


export const metadata: Metadata = {
	title: 'Блог',
	description: ''
}

export default function Home() {
	return <BlogView />
}

import { PartnersView } from '@/views/partners'
import type { Metadata } from 'next'


export const metadata: Metadata = {
	title: 'Партнеры',
	description: 'Страница партнеров'
}

export default function Home() {
	return <PartnersView />
}

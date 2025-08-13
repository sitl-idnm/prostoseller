import { ThanksView } from '@/views/thanks'
import type { Metadata } from 'next'


export const metadata: Metadata = {
	title: 'Спасибо',
	description: 'Страница спасибо'
}

export default function Home() {
	return <ThanksView />
}

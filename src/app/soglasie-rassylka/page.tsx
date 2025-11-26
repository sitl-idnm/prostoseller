import { ApproveView } from '@/views/approve'
import type { Metadata } from 'next'


export const metadata: Metadata = {
	title: 'Согласие на рассылку',
	description: 'Страница согласия на рассылку'
}

export default function Home() {
	return <ApproveView />
}

import { PriceView } from '@/views/price'
import type { Metadata } from 'next'


export const metadata: Metadata = {
	title: 'Цены',
	description: 'Страница цен'
}

export default function Home() {
	return <PriceView />
}

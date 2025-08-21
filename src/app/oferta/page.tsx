import { OfertaView } from '@/views/oferta'
import type { Metadata } from 'next'


export const metadata: Metadata = {
	title: 'Оферта для партнерской программы',
	description: 'Страница оферты для партнерской программы'
}

export default function Home() {
	return <OfertaView />
}

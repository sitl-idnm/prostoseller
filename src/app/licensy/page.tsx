import { LicensyView } from '@/views/licensy'
import type { Metadata } from 'next'


export const metadata: Metadata = {
	title: 'Лицензионное соглашение Prostoseller',
	description: 'Страница лицензионного соглашения Prostoseller'
}

export default function Home() {
	return <LicensyView />
}

import { CompanyView } from '@/views/company'
import type { Metadata } from 'next'


export const metadata: Metadata = {
	title: 'О компании',
	description: ''
}

export default function Home() {
	return <CompanyView />
}

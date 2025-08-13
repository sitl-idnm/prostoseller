import { ContactsView } from '@/views/contacts'
import type { Metadata } from 'next'


export const metadata: Metadata = {
	title: 'Контакты',
	description: 'Страница контактов'
}

export default function Home() {
	return <ContactsView />
}

import { InviteFriendView } from '@/views/inviteFriend'
import type { Metadata } from 'next'


export const metadata: Metadata = {
	title: 'Пригласи друга',
	description: 'Страница приглашения друга'
}

export default function Home() {
	return <InviteFriendView />
}

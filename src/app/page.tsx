import type { Metadata } from 'next'
import { HomeView } from '@views/home'

export const metadata: Metadata = {
  title: 'Prostoseller аналитика',
  description: 'Prostoseller аналитика'
}

export default function Home() {
  return <HomeView />
}

import { notFound } from 'next/navigation'

export function getTodayIsoLocal(): string {
	const now = new Date()
	const year = now.getFullYear()
	const month = String(now.getMonth() + 1).padStart(2, '0')
	const day = String(now.getDate()).padStart(2, '0')
	return `${year}-${month}-${day}`
}

export function guardPostByDate(date?: string) {
	if (!date) return
	const todayIso = getTodayIsoLocal()
	if (date > todayIso) {
		return notFound()
	}
}

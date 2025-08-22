// Common app links and CTA routes

export const LINKS = {
	// Messengers / social
	tg: 'https://t.me/prostoseller',
	wa: 'https://wa.me/79990000000',
	supportEmail: 'mailto:info@prostoseller.com',

	// CTAs
	connectFree: '/login?mode=register',
	demoCabinet: '/thanks',
	becomePartner: '/partners',

	// Other
	price: '/price',
	blog: '/blog',
	contacts: '/contacts'
} as const

export type LinkKey = keyof typeof LINKS

// Common app links and CTA routes

export const LINKS = {
	// Messengers / social
	tg: 'https://t.me/prostoseller',
	wa: 'https://wa.me/79990000000',
	supportEmail: 'mailto:info@prostoseller.com',

	// CTAs
	connectSignup: 'https://lk.prostoseller.com/index.php?r=site%2Fsignup',
	connectSignupPartner: 'https://lk.prostoseller.com/index.php?r=site%2Fsignup-partner',
	connectLogin: 'https://lk.prostoseller.com/index.php?r=site%2Flogin',

	demoCabinet: '/thanks',
	becomePartner: '/partners',
	invite: '/inviteFriend',

	// Other
	price: '/price',
	blog: '/blog',
	contacts: '/contacts'
} as const

export type LinkKey = keyof typeof LINKS

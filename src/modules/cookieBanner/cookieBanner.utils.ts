// Утилиты для работы с куки-баннером

export const COOKIE_BANNER_KEY = 'cookieBannerLastShown'

/**
 * Получает текущий месяц в формате YYYYMM
 */
export const getCurrentMonth = (): number => {
	const now = new Date()
	return now.getFullYear() * 100 + now.getMonth()
}

/**
 * Проверяет, нужно ли показать куки-баннер
 */
export const shouldShowCookieBanner = (): boolean => {
	if (typeof window === 'undefined') return false

	const lastShown = localStorage.getItem(COOKIE_BANNER_KEY)
	const currentMonth = getCurrentMonth()

	return !lastShown || parseInt(lastShown) !== currentMonth
}

/**
 * Сохраняет время последнего показа куки-баннера
 */
export const saveCookieBannerShown = (): void => {
	if (typeof window === 'undefined') return

	const currentMonth = getCurrentMonth()
	localStorage.setItem(COOKIE_BANNER_KEY, currentMonth.toString())
}



/**
 * Получает сохраненное время последнего показа
 */
export const getLastShownMonth = (): number | null => {
	if (typeof window === 'undefined') return null

	const lastShown = localStorage.getItem(COOKIE_BANNER_KEY)
	return lastShown ? parseInt(lastShown) : null
}

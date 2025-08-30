export const resetViews = (postId?: string) => {
	if (typeof window === 'undefined') return

	if (postId) {
		// Сброс для конкретной статьи
		const storedData = localStorage.getItem('blog_views')
		if (storedData) {
			try {
				const viewsData = JSON.parse(storedData)
				delete viewsData[postId]
				localStorage.setItem('blog_views', JSON.stringify(viewsData))
				console.log(`Views reset for post: ${postId}`)
			} catch (error) {
				console.error('Failed to reset views for specific post:', error)
			}
		}
	} else {
		// Сброс всех данных просмотров
		localStorage.removeItem('blog_views')
		console.log('All views data reset')
	}
}

export const getViewsData = () => {
	if (typeof window === 'undefined') return null

	const storedData = localStorage.getItem('blog_views')
	if (storedData) {
		try {
			return JSON.parse(storedData)
		} catch {
			return null
		}
	}
	return null
}

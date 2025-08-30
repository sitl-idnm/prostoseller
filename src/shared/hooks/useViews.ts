import { useState, useEffect } from 'react'

interface ViewsData {
	[postId: string]: {
		views: number
		lastViewed: number
	}
}

const STORAGE_KEY = 'blog_views'

export const useViews = (postId: string, initialViews: number) => {
	const [views, setViews] = useState(initialViews)
	const [hasIncremented, setHasIncremented] = useState(false)

	useEffect(() => {
		// Проверяем, доступен ли localStorage
		if (typeof window === 'undefined') return

		// Загружаем данные из localStorage
		const storedData = localStorage.getItem(STORAGE_KEY)
		let viewsData: ViewsData = {}

		if (storedData) {
			try {
				viewsData = JSON.parse(storedData)
			} catch {
				viewsData = {}
			}
		}

		// Если данных для этого поста нет, инициализируем с начальным значением
		if (!viewsData[postId]) {
			viewsData[postId] = {
				views: initialViews,
				lastViewed: 0
			}
		}

		// Проверяем, прошло ли достаточно времени с последнего просмотра (1 час)
		const now = Date.now()
		const lastViewed = viewsData[postId].lastViewed
		const oneHour = 60 * 60 * 1000 // 1 час в миллисекундах

		// Если прошло больше часа с последнего просмотра, увеличиваем счетчик
		if (now - lastViewed > oneHour && !hasIncremented) {
			viewsData[postId].views += 1
			viewsData[postId].lastViewed = now
			setViews(viewsData[postId].views)
			setHasIncremented(true)

			// Сохраняем обновленные данные
			try {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(viewsData))
			} catch (error) {
				console.warn('Failed to save views data:', error)
			}
		} else {
			setViews(viewsData[postId].views)
		}
	}, [postId, initialViews, hasIncremented])

	return views
}

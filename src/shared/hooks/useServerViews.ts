import { useState, useEffect } from 'react'

export const useServerViews = (postId: string, initialViews: number) => {
	const [views, setViews] = useState(initialViews)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	// Загружаем текущие просмотры с сервера
	useEffect(() => {
		const fetchViews = async () => {
			try {
				const response = await fetch(`/api/views?postId=${postId}`)
				if (response.ok) {
					const data = await response.json()
					setViews(data.views)
				} else {
					console.warn('Failed to fetch views, using initial value')
					setViews(initialViews)
				}
			} catch (error) {
				console.error('Error fetching views:', error)
				setError('Failed to load views')
				setViews(initialViews)
			} finally {
				setIsLoading(false)
			}
		}

		fetchViews()
	}, [postId, initialViews])

	// Функция для увеличения счетчика просмотров
	const incrementViews = async () => {
		try {
			const response = await fetch('/api/views', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ postId }),
			})

			if (response.ok) {
				const data = await response.json()
				setViews(data.views)
				return data.incremented
			}
		} catch (error) {
			console.error('Error incrementing views:', error)
		}
		return false
	}

	// Увеличиваем счетчик при загрузке страницы
	useEffect(() => {
		if (!isLoading && postId) {
			incrementViews()
		}
	}, [isLoading, postId])

	return { views, isLoading, error, incrementViews }
}

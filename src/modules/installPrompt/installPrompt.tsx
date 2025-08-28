'use client'

import { FC, useEffect, useState } from 'react'
import classNames from 'classnames'
import styles from './installPrompt.module.scss'
import { Button } from '@/ui'

interface InstallPromptProps {
	className?: string
}

interface BeforeInstallPromptEvent extends Event {
	prompt(): Promise<void>
	userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const InstallPrompt: FC<InstallPromptProps> = ({ className }) => {
	const [isVisible, setIsVisible] = useState(false)
	const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)

	useEffect(() => {
		// Проверяем, что это мобильное устройство или планшет
		const isMobileOrTablet = () => {
			if (typeof window === 'undefined') return false
			return window.innerWidth <= 1024 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
		}

		// Проверяем, показывали ли мы уже этот промпт
		const hasShownPrompt = localStorage.getItem('installPromptShown')

		if (!isMobileOrTablet() || hasShownPrompt) {
			return
		}

		// Слушаем событие beforeinstallprompt
		const handleBeforeInstallPrompt = (e: Event) => {
			e.preventDefault()
			setDeferredPrompt(e as BeforeInstallPromptEvent)
			setIsVisible(true)
		}

		// Слушаем событие appinstalled
		const handleAppInstalled = () => {
			setIsVisible(false)
			localStorage.setItem('installPromptShown', 'true')
		}

		window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
		window.addEventListener('appinstalled', handleAppInstalled)

		return () => {
			window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
			window.removeEventListener('appinstalled', handleAppInstalled)
		}
	}, [])

	const handleInstall = async () => {
		if (!deferredPrompt) return

		// Показываем нативный промпт установки
		deferredPrompt.prompt()

		// Ждем ответа пользователя
		const { outcome } = await deferredPrompt.userChoice

		if (outcome === 'accepted') {
			console.log('Пользователь принял установку')
		} else {
			console.log('Пользователь отклонил установку')
		}

		// Очищаем промпт
		setDeferredPrompt(null)
		setIsVisible(false)
		localStorage.setItem('installPromptShown', 'true')
	}

	const handleClose = () => {
		setIsVisible(false)
		localStorage.setItem('installPromptShown', 'true')
	}

	if (!isVisible) return null

	return (
		<div className={classNames(styles.prompt, className)}>
			<div className={styles.content}>
				<div className={styles.iconSection}>
					<div className={styles.owlIcon}>
						<svg viewBox="0 0 24 24" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#28a745" />
							<path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="#28a745" />
							<circle cx="9" cy="12" r="1" fill="#28a745" />
							<circle cx="15" cy="12" r="1" fill="#28a745" />
						</svg>
					</div>
				</div>

				<div className={styles.textSection}>
					<p className={styles.message}>
						Добавьте Otiwa на экран мобильного<br />
						телефона
					</p>
				</div>

				<div className={styles.actions}>
					<Button
						variant="gradient"
						size="sm"
						onClick={handleInstall}
						buttonWidth="80px"
					>
						Добавить
					</Button>

					<button
						className={styles.closeButton}
						onClick={handleClose}
						aria-label="Закрыть"
					>
						<svg viewBox="0 0 24 24" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor" />
						</svg>
					</button>
				</div>
			</div>
		</div>
	)
}

export default InstallPrompt

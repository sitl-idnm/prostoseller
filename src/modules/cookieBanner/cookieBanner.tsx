'use client'

import { FC, useEffect, useState } from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import styles from './cookieBanner.module.scss'
import { shouldShowCookieBanner, saveCookieBannerShown } from './cookieBanner.utils'
import { Button } from '@/ui'

interface CookieBannerProps {
	className?: string
}

const CookieBanner: FC<CookieBannerProps> = ({ className }) => {
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		if (shouldShowCookieBanner()) {
			setIsVisible(true)
		}
	}, [])

	const handleAccept = () => {
		saveCookieBannerShown()
		setIsVisible(false)
	}



	if (!isVisible) return null

	return (
		<div className={styles.overlay}>
			<div className={classNames(styles.banner, className)}>
				<div className={styles.content}>
					<div className={styles.textSection}>
						<h3 className={styles.title}>Мы используем файлы cookie</h3>
						<p className={styles.description}>
						Наш сайт использует файлы cookie и сервисы аналитики, такие как «Яндекс.Метрика», для сбора статистики и улучшения качества предоставляемых услуг. Это помогает нам понять, как вы используете сайт, и сделать его более функциональным и удобным. Нажимая кнопку «Принять» или продолжая просмотр, вы соглашаетесь с использованием этих технологий и{' '}
							<Link
								href="/policy"
								className={styles.policyLink}
								target="_blank"
								rel="noopener noreferrer"
							>
								политикой конфиденциальности и обработки персональных данных
							</Link>.
						</p>
					</div>
					<div className={styles.buttonSection}>
						<Button
							variant="gradient"
							onClick={handleAccept}
							buttonWidth="100%"
						>
							Согласен
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CookieBanner

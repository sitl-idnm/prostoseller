'use client'

import { FC } from 'react'
import classNames from 'classnames'
import styles from './thankYou.module.scss'
import Image from 'next/image'

interface ThankYouProps {
	className?: string
	title?: string
	description?: string
	hint?: string
	email?: string
}

export const ThankYou: FC<ThankYouProps> = ({
	className,
	title = "Для завершения регистрации необходимо активировать аккаунт",
	description = "Ссылка для активации отправлена на ваш Email",
	hint = "Если письмо активации не пришло, проверьте, пожалуйста, папку «спам»",
	email = "__@__.__"
}) => {
	const rootClassName = classNames(styles.root, className)

	return (
		<div className={rootClassName}>
			<div className={styles.container}>
				<div className={styles.content}>
					<div className={styles.textSection}>
						<h1 className={styles.title}>
							{title}
						</h1>
						<p className={styles.description}>
							{description} <span className={styles.email}>{email}</span>
						</p>
						<p className={styles.hint}>
							{hint}
						</p>
					</div>
					<div className={styles.illustrationSection}>
						<Image src="/images/thankYou.png" alt="thankYou" quality={100} width={244} height={244} />
					</div>
				</div>
			</div>
		</div>
	)
}

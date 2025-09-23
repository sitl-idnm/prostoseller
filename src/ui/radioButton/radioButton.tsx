'use client'

import { FC } from 'react'
import classNames from 'classnames'

import styles from './radioButton.module.scss'
import { RadioButtonProps } from './radioButton.types'

const RadioButton: FC<RadioButtonProps> = ({
	className,
	isSelected = false,
	children,
	onClick,
	...props
}) => {
	const rootClassName = classNames(
		styles.root,
		isSelected && styles.root_selected,
		className
	)

	return (
		<button
			className={rootClassName}
			onClick={onClick}
			type="button"
			{...props}
		>
			<div className={styles.radioIcon}>
				<div className={classNames(styles.radioCircle, isSelected && styles.radioCircle_selected)} />
			</div>
			<span className={styles.text}>{children}</span>
		</button>
	)
}

export default RadioButton

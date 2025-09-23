import { ButtonHTMLAttributes } from 'react'

export interface RadioButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	isSelected?: boolean
	children: React.ReactNode
}

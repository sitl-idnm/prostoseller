import { ReactNode } from 'react'

export type FormGrid = {
  columns?: string
  gap?: number | string
  rowGap?: number | string
  columnGap?: number | string
}

export type FormFieldType = 'input' | 'textarea' | 'email' | 'tel' | 'password' | 'checkbox'

export interface FormFieldConfig {
  id: string
  type: FormFieldType
  label?: string
  placeholder?: string
  required?: boolean
  gridColumn?: string // e.g. 'span 2' or '1 / -1'
}

export interface FormProps {
  className?: string
  grid?: FormGrid
  fields: FormFieldConfig[]
  onSubmit?: (values: Record<string, string>) => void
  submitLabel?: ReactNode
}

export interface FormProps {
  className?: string
}

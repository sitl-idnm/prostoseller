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
  validate?: (values: Record<string, string>) => Record<string, string> | null
  submitLabel?: ReactNode
  // Optional built-in email submitter. If enabled, component will POST to /api/sendForm
  enableEmailSubmit?: boolean
  emailTo?: string // recipient; default can be set in env on server
  emailSubject?: string
  // If true, all checkbox fields will be rendered after the submit button
  checkboxesAfterSubmit?: boolean
  buttonWidth?: string
}

// Duplicate interface below was erroneous; removed to avoid conflicts

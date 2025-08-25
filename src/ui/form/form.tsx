'use client'

import { FC, FormEvent, useMemo, useRef, useState } from 'react'
import classNames from 'classnames'

import styles from './form.module.scss'
import { FormProps } from './form.types'
import { Input, Button } from '@/ui'
import ArrowWhiteIcon from '@icons/arrowWhite.svg'

const Form: FC<FormProps> = ({
  className,
  grid,
  fields,
  onSubmit,
  submitLabel = 'Отправить'
}) => {
  const rootClassName = classNames(styles.root, className)
  const formRef = useRef<HTMLFormElement | null>(null)

  const gridStyle: React.CSSProperties = useMemo(() => ({
    gridTemplateColumns: grid?.columns,
    gap: typeof grid?.gap === 'number' ? `${grid?.gap}px` : grid?.gap,
    rowGap: typeof grid?.rowGap === 'number' ? `${grid?.rowGap}px` : grid?.rowGap,
    columnGap: typeof grid?.columnGap === 'number' ? `${grid?.columnGap}px` : grid?.columnGap
  }), [grid?.columns, grid?.gap, grid?.rowGap, grid?.columnGap])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!onSubmit || !formRef.current) return
    const data = new FormData(formRef.current)
    const values: Record<string, string> = {}
    fields.forEach((f) => {
      values[f.id] = String(data.get(f.id) ?? '')
    })
    // simple email/phone validation if fields present
    const emailField = fields.find(f => f.type === 'email')
    if (emailField) {
      const email = values[emailField.id]
      const emailOk = /^[\w.!#$%&'*+/=?^`{|}~-]+@[\w-]+(?:\.[\w-]+)+$/.test(email)
      if (!emailOk) {
        alert('Проверьте корректность Email')
        return
      }
    }
    const phoneField = fields.find(f => f.type === 'tel')
    if (phoneField) {
      const phone = values[phoneField.id]
      const digits = phone.replace(/\D/g, '')
      if (digits.length < 11) {
        alert('Проверьте номер телефона')
        return
      }
    }
    onSubmit(values)
  }

  return (
    <form ref={formRef} className={rootClassName} onSubmit={handleSubmit}>
      <div className={styles.grid} style={gridStyle}>
        {fields.map((f) => (
          <div key={f.id} className={styles.field} style={{ gridColumn: f.gridColumn }}>
            {f.label && <label className={styles.label} htmlFor={f.id}>{f.label}</label>}
            {f.type === 'textarea' ? (
              <textarea id={f.id} name={f.id} placeholder={f.placeholder} required={f.required} className={styles.textarea as unknown as string} />
            ) : f.type === 'password' ? (
              <PasswordField id={f.id} placeholder={f.placeholder} required={f.required} />
            ) : f.type === 'checkbox' ? (
              <label className={styles.checkbox}>
                <input type="checkbox" id={f.id} name={f.id} required={f.required} />
                <span>{f.placeholder}</span>
              </label>
            ) : (
              <SmartInput id={f.id} type={f.type} placeholder={f.placeholder} required={f.required} />
            )}
          </div>
        ))}
        <div className={styles.submit} style={{ gridColumn: '1 / -1' }}>
          <Button buttonWidth="100%" type="submit" variant="gradient" icon={<ArrowWhiteIcon />}>
            {submitLabel}
          </Button>
        </div>
      </div>
    </form>
  )
}

function SmartInput({ id, type, placeholder, required }: { id: string; type: string; placeholder?: string; required?: boolean }) {
  // simple masks: email validated on submit; phone mask here
  const handlePhoneInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (type !== 'tel') return
    const raw = e.currentTarget.value.replace(/\D/g, '').slice(0, 11)
    let res = ''
    if (raw.startsWith('7') || raw.startsWith('8')) {
      const d = raw.replace(/^8/, '7')
      const p = d.padEnd(11, '_')
      res = `+7 (${p.slice(1, 4)}) ${p.slice(4, 7)}-${p.slice(7, 9)}-${p.slice(9, 11)}`
    } else {
      const p = raw.padEnd(11, '_')
      res = `+7 (${p.slice(1, 4)}) ${p.slice(4, 7)}-${p.slice(7, 9)}-${p.slice(9, 11)}`
    }
    e.currentTarget.value = res
  }
  return (
    <Input
      id={id}
      name={id}
      placeholder={placeholder}
      required={required}
      type={type === 'input' ? 'text' : (type as unknown as React.HTMLInputTypeAttribute)}
      onInput={type === 'tel' ? handlePhoneInput : undefined}
    />
  )
}

function PasswordField({ id, placeholder, required }: { id: string; placeholder?: string; required?: boolean }) {
  const [visible, setVisible] = useState(false)
  return (
    <div className={styles.passwordWrap}>
      <Input id={id} name={id} placeholder={placeholder} required={required} type={visible ? 'text' : 'password'} className={styles.passwordInput as unknown as string} />
      <button type="button" className={styles.eyeBtn as unknown as string} onClick={() => setVisible(v => !v)} aria-label={visible ? 'Скрыть пароль' : 'Показать пароль'}>
        {visible ? (
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 5c-5 0-9 7-9 7s4 7 9 7 9-7 9-7-4-7-9-7Zm0 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z" stroke="currentColor" strokeWidth="1.6" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3l18 18M9.9 5.1A8.9 8.9 0 0 1 12 5c5 0 9 7 9 7a17.7 17.7 0 0 1-4.11 5.34M6.5 6.5A17.5 17.5 0 0 0 3 12s4 7 9 7c1.42 0 2.76-.38 3.96-1.02" stroke="currentColor" strokeWidth="1.6" /></svg>
        )}
      </button>
    </div>
  )
}

export default Form

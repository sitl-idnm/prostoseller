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
  validate,
  submitLabel = 'Отправить',
  enableEmailSubmit,
  emailTo,
  emailSubject,
  checkboxesAfterSubmit
}) => {
  const rootClassName = classNames(styles.root, className)
  const formRef = useRef<HTMLFormElement | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message?: string }>({ type: 'idle' })

  const gridStyle: React.CSSProperties = useMemo(() => ({
    gridTemplateColumns: grid?.columns,
    gap: typeof grid?.gap === 'number' ? `${grid?.gap}px` : grid?.gap,
    rowGap: typeof grid?.rowGap === 'number' ? `${grid?.rowGap}px` : grid?.rowGap,
    columnGap: typeof grid?.columnGap === 'number' ? `${grid?.columnGap}px` : grid?.columnGap
  }), [grid?.columns, grid?.gap, grid?.rowGap, grid?.columnGap])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return
    const data = new FormData(formRef.current)
    const values: Record<string, string> = {}
    fields.forEach((f) => {
      values[f.id] = String(data.get(f.id) ?? '')
    })
    // reset errors/status
    setFieldErrors({})
    setStatus({ type: 'idle' })

    // validate required fields
    const errors: Record<string, string> = {}
    fields.forEach((f) => {
      if (f.required) {
        const v = values[f.id]
        if (f.type === 'checkbox') {
          const checked = Boolean(data.get(f.id))
          if (!checked) errors[f.id] = 'Обязательное поле'
        } else if (!v || v.trim() === '') {
          errors[f.id] = 'Обязательное поле'
        }
      }
    })

    // simple email/phone validation if fields present
    const emailField = fields.find(f => f.type === 'email')
    if (emailField) {
      const email = values[emailField.id]
      const emailOk = /^[\w.!#$%&'*+/=?^`{|}~-]+@[\w-]+(?:\.[\w-]+)+$/.test(email)
      if (!emailOk) errors[emailField.id] = 'Проверьте корректность Email'
    }
    const phoneField = fields.find(f => f.type === 'tel')
    if (phoneField) {
      const phone = values[phoneField.id]
      const digits = phone.replace(/\D/g, '')
      if (digits.length > 0 && digits.length < 11) errors[phoneField.id] = 'Проверьте номер телефона'
    }

    // custom validate hook
    if (validate) {
      try {
        const extra = validate(values) || {}
        Object.assign(errors, extra)
      } catch (err) { /* ignore validation errors */ }
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      setStatus({ type: 'error', message: 'Проверьте обязательные поля' })
      return
    }
    // If a parent handler is provided, call it first
    if (onSubmit) onSubmit(values)

    // Optional built-in email sender
    if (enableEmailSubmit) {
      setSubmitting(true)
      try {
        const res = await fetch('/api/sendForm', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            values,
            to: emailTo,
            subject: emailSubject
          })
        })
        if (!res.ok) {
          let msg = 'Не удалось отправить форму. Попробуйте позже.'
          try {
            const data = await res.json()
            if (data?.error) msg = String(data.error)
          } catch (err) { /* ignore invalid JSON */ }
          setStatus({ type: 'error', message: msg })
          return
        }
        setStatus({ type: 'success', message: 'Сообщение отправлено' })
        // reset form after success
        try { formRef.current.reset() } catch (err) { /* ignore reset error */ }
      } catch (err) {
        setStatus({ type: 'error', message: 'Ошибка сети. Попробуйте позже.' })
      }
      setSubmitting(false)
    }
  }

  return (
    <form ref={formRef} className={rootClassName} onSubmit={handleSubmit}>
      <div className={styles.grid} style={gridStyle}>
        {(checkboxesAfterSubmit ? fields.filter(f => f.type !== 'checkbox') : fields).map((f) => {
          const hasError = !!fieldErrors[f.id]
          return (
            <div key={f.id} className={styles.field} style={{ gridColumn: f.gridColumn }}>
              {f.label && <label className={classNames(styles.label, hasError && styles.label_error)} htmlFor={f.id}>{f.label}</label>}
              {f.type === 'textarea' ? (
                <textarea id={f.id} name={f.id} placeholder={f.placeholder} required={f.required} aria-invalid={hasError} className={styles.textarea as unknown as string} />
              ) : f.type === 'password' ? (
                <PasswordField id={f.id} placeholder={f.placeholder} required={f.required} />
              ) : f.type === 'checkbox' ? (
                <label className={styles.checkbox}>
                  <input type="checkbox" id={f.id} name={f.id} required={f.required} aria-invalid={hasError} />
                  <span>{f.placeholder}</span>
                </label>
              ) : (
                <SmartInput id={f.id} type={f.type} placeholder={f.placeholder} required={f.required} aria-invalid={hasError} />
              )}
              {hasError && <div className={styles.errorText}>{fieldErrors[f.id]}</div>}
            </div>
          )
        })}
        <div className={styles.submit} style={{ gridColumn: '1 / -1' }}>
          <Button buttonWidth="100%" type="submit" variant="gradient" icon={<ArrowWhiteIcon />} disabled={submitting}>
            {submitLabel}
          </Button>
        </div>
        {checkboxesAfterSubmit && (
          <div style={{ gridColumn: '1 / -1', gap: '16px', display: 'grid' }}>
            {fields.filter(f => f.type === 'checkbox').map((f) => {
              const hasError = !!fieldErrors[f.id]
              return (
                <div key={f.id} className={styles.field}>
                  <label className={styles.checkbox}>
                    <input type="checkbox" id={f.id} name={f.id} required={f.required} aria-invalid={hasError} />
                    <span>{f.placeholder}</span>
                  </label>
                  {hasError && <div className={styles.errorText}>{fieldErrors[f.id]}</div>}
                </div>
              )
            })}
          </div>
        )}
        {status.type !== 'idle' && (
          <div className={classNames(styles.alert, status.type === 'error' ? styles.alert_error : styles.alert_success)} style={{ gridColumn: '1 / -1' }}>
            {status.message}
          </div>
        )}
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
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.20486 1.17634C6.21416 1.3806 4.48933 2.07442 3.01089 3.26755C2.41757 3.74739 1.68808 4.52227 1.22769 5.16098C0.965077 5.53059 0.699219 5.99098 0.699219 6.08176C0.699219 6.24063 1.1823 6.98308 1.6589 7.56019C1.98312 7.9525 2.62183 8.58796 3.01089 8.90245C4.36612 9.99507 5.92885 10.6727 7.71854 10.9385C8.31834 11.0261 9.76111 11.0196 10.3771 10.9223C12.0339 10.663 13.441 10.0696 14.767 9.07753C15.2145 8.7371 15.9731 8.01085 16.3427 7.56019C16.8193 6.97984 17.2992 6.24063 17.2992 6.085C17.2992 5.92938 16.8193 5.19016 16.3427 4.60981C15.9699 4.1559 15.2145 3.4329 14.7541 3.08599C13.6874 2.28192 12.5591 1.74372 11.2849 1.42923C10.5068 1.23794 10.0594 1.18607 9.14509 1.1731C8.70092 1.16661 8.27619 1.16986 8.20486 1.17634ZM9.73517 1.87341C12.3808 2.09388 14.8092 3.51071 16.2973 5.70242L16.5567 6.085L16.2973 6.46434C15.0296 8.33507 13.0649 9.65464 10.8472 10.1312C10.1793 10.2771 9.79677 10.3128 8.98299 10.3128C8.35076 10.3096 8.12057 10.2966 7.75096 10.2415C5.7862 9.93671 4.15862 9.12292 2.78718 7.75472C2.26519 7.23597 1.99285 6.91176 1.65242 6.40273L1.44168 6.085L1.64269 5.78348C2.32031 4.77516 3.29296 3.8252 4.31425 3.18649C5.91264 2.18142 7.84498 1.71454 9.73517 1.87341Z" fill="#999999" stroke="#999999" strokeWidth="0.5" />
            <path d="M8.57783 2.61471C7.89571 2.72961 7.30966 3.04052 6.83569 3.54069C6.43859 3.95974 6.15037 4.49708 6.01586 5.06821C5.91659 5.49064 5.91659 6.15978 6.01586 6.58221C6.30408 7.8022 7.21679 8.72817 8.4081 9.00529C8.71874 9.07626 9.37845 9.06274 9.71791 8.97487C10.874 8.6741 11.7515 7.70757 12.0141 6.45041C12.0813 6.1226 12.0685 5.42643 11.9852 5.06821C11.8507 4.50045 11.5625 3.96312 11.1654 3.54069C10.7715 3.12501 10.2559 2.81748 9.73392 2.6823C9.42648 2.60457 8.84684 2.57078 8.57783 2.61471ZM9.58981 3.39537C10.6402 3.66235 11.3736 4.66267 11.3736 5.82521C11.3736 7.22769 10.3296 8.3294 9.00056 8.3294C7.66833 8.3294 6.62753 7.23107 6.62753 5.82521C6.62753 4.35852 7.77081 3.22639 9.16068 3.31764C9.25675 3.3244 9.4521 3.35819 9.58981 3.39537Z" fill="#999999" stroke="#999999" strokeWidth="0.5" />
          </svg>
        ) : (
          <svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.916456 1.26289C0.754738 1.34375 0.68091 1.52305 0.733644 1.69883C0.796925 1.90625 1.03599 2.2332 1.38052 2.58477C1.62661 2.83086 2.54419 3.67812 2.89927 3.9875C2.92036 4.00508 2.67427 4.27227 2.29107 4.65898C1.75669 5.19687 1.64419 5.32344 1.63013 5.42539C1.59146 5.65039 1.76021 5.87187 1.99224 5.90352C2.11177 5.91758 2.15044 5.90352 2.3438 5.75586C2.46333 5.66797 2.79028 5.35508 3.06802 5.06328L3.57427 4.52891L3.99263 4.81367C5.31099 5.70664 6.64692 6.26211 7.92661 6.45898C8.11997 6.48711 8.34146 6.51523 8.4188 6.51875L8.55942 6.5293L8.577 7.53828L8.59458 8.55078L8.7106 8.66328C8.80903 8.76172 8.84771 8.7793 8.99888 8.7793C9.15005 8.7793 9.18872 8.76172 9.28716 8.66328L9.40317 8.55078L9.42075 7.53828L9.43833 6.5293L9.73364 6.50117C10.479 6.43437 11.4282 6.1707 12.2649 5.79453C12.8309 5.54141 13.2915 5.28477 13.9172 4.86992L14.4235 4.53242L14.9297 5.06328C15.2075 5.35508 15.5309 5.66797 15.6504 5.75586C15.8473 5.90352 15.886 5.91758 16.0055 5.90352C16.2375 5.87187 16.4063 5.65039 16.3676 5.42539C16.3536 5.32344 16.2411 5.19687 15.7067 4.65898C15.3551 4.30742 15.0739 4.01211 15.0809 4.00508C15.429 3.75898 16.5786 2.63398 17.0215 2.10664C17.3415 1.73047 17.3731 1.53359 17.1516 1.32266C17.0637 1.23828 17.0145 1.2207 16.8668 1.2207H16.6875L16.4063 1.53711C14.2653 3.92773 11.952 5.35859 9.74419 5.65039C7.18833 5.98789 4.26685 4.51484 1.59497 1.54414C1.34888 1.26641 1.30318 1.23125 1.17661 1.21719C1.08521 1.20664 0.9938 1.2207 0.916456 1.26289Z" fill="#999999" stroke="#999999" strokeWidth="0.5" />
          </svg>
        )}
      </button>
    </div>
  )
}

export default Form

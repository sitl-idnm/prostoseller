"use client"
import { FC, useMemo } from 'react'
import classNames from 'classnames'

import styles from './login.module.scss'
import { LoginProps } from './login.types'
import { Wrapper } from '@/ui/wrapper'
import { Form, Button } from '@/ui'
import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import type { FormFieldConfig } from '@/ui/form/form.types'

const Login: FC<LoginProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)
  const router = useRouter()
  const sp = useSearchParams()
  const mode = sp.get('mode') as 'auth' | 'register' | 'partner' | null
  const active: 'auth' | 'register' | 'partner' = mode || 'auth'

  const switchMode = (m: 'auth' | 'register' | 'partner') => {
    const q = new URLSearchParams(sp.toString())
    q.set('mode', m)
    router.push(`/login?${q.toString()}`)
  }

  type TabsMode = 'auth_partner' | 'none'
  type Aux = { text: string; cta: string; to: 'auth' | 'register' }
  interface FormConfig { title: string; tabs: TabsMode; fields: FormFieldConfig[]; submit: string; aux?: Aux }

  const formConfig: FormConfig = useMemo(() => {
    if (active === 'auth') {
      return {
        title: 'Войти или зарегистрироваться',
        tabs: 'auth_partner' as const,
        fields: [
          { id: 'email', type: 'email', label: 'Электронная почта', placeholder: '__@__', required: true },
          { id: 'password', type: 'password', label: 'Введите пароль', placeholder: 'Ваш пароль', required: true }
        ],
        submit: 'Войти',
        aux: { text: 'Нет аккаунта Prostoseller?', cta: 'Зарегистрироваться', to: 'register' as const }
      }
    }
    if (active === 'register') {
      return {
        title: 'Зарегистрироваться',
        tabs: 'none' as const,
        fields: [
          { id: 'email', type: 'email', label: 'Электронная почта', placeholder: '__@__', required: true },
          { id: 'phone', type: 'tel', label: 'Ваш телефон', placeholder: '+7 (___) ___-__-__' },
          { id: 'password', type: 'password', label: 'Введите пароль', placeholder: 'Ваш пароль', required: true },
          { id: 'password2', type: 'password', label: 'Повторите пароль', placeholder: 'Ваш пароль', required: true },
          { id: 'invite', type: 'input', label: 'Пригласительный код (необязательно)', placeholder: 'Введите код' },
          { id: 'agree', type: 'checkbox', placeholder: 'Я даю согласие на обработку моей персональной информации на условиях, определенных политикой конфиденциальности, согласен с условиями лицензионного соглашения Prostoseller', required: true },
          { id: 'marketing', type: 'checkbox', placeholder: 'Я даю согласие на информационную и рекламную рассылку' }
        ],
        submit: 'Зарегистрироваться',
        aux: { text: 'Есть аккаунт?', cta: 'Войти', to: 'auth' as const }
      }
    }
    return {
      title: 'Регистрация для партнеров',
      tabs: 'auth_partner' as const,
      fields: [
        { id: 'username', type: 'input', label: 'Имя пользователя', placeholder: 'Введите имя', required: true },
        { id: 'inn', type: 'input', label: 'ИНН компании', placeholder: 'Введите ИНН компании', required: true },
        { id: 'company', type: 'input', label: 'Наименование компании', placeholder: 'Введите наименование компании', gridColumn: '1 / -1', required: true },
        { id: 'email', type: 'email', label: 'Электронная почта', placeholder: '__@__', required: true },
        { id: 'phone', type: 'tel', label: 'Ваш телефон', placeholder: '+7 (___) ___-__-__' },
        { id: 'password', type: 'password', label: 'Введите пароль', placeholder: 'Ваш пароль', required: true },
        { id: 'password2', type: 'password', label: 'Повторите пароль', placeholder: 'Ваш пароль', required: true },
        { id: 'agree', type: 'checkbox', placeholder: 'Я даю согласие на обработку моей персональной информации на условиях, определенных политикой конфиденциальности, согласен с условиями оферты для партнерской программы', gridColumn: '1 / -1', required: true },
        { id: 'marketing', type: 'checkbox', placeholder: 'Я даю согласие на информационную и рекламную рассылку', gridColumn: '1 / -1' }
      ],
      submit: 'Создать аккаунт партнера'
    }
  }, [active])

  return (
    <main className={rootClassName}>
      <Wrapper className={styles.wrapper}>
        {active === 'partner' && (
          <div className={styles.backLink} onClick={() => switchMode('auth')}>
            <span aria-hidden>←</span> Назад к авторизации
          </div>
        )}
        <div className={styles.content}>
          <div className={classNames(styles.grid, { [styles.gridWithImage]: active === 'auth' })}>
            <div className={styles.formCol}>
              <h2>{formConfig.title}</h2>
              {formConfig.tabs === 'auth_partner' && (
                <div className={styles.tabs}>
                  <Button type="button" variant={active === 'auth' ? 'purple' : 'purpleOutline'} onClick={() => switchMode('auth')}>
                    Авторизация
                  </Button>
                  <Button type="button" variant={active === 'partner' ? 'purple' : 'purpleOutline'} onClick={() => switchMode('partner')}>
                    Регистрация для партнеров
                  </Button>
                </div>
              )}
              <Form
                grid={{ columns: active === 'auth' ? '1fr' : '1fr 1fr', gap: 12 }}
                fields={formConfig.fields}
                validate={(values) => {
                  const e: Record<string, string> = {}
                  if (values.password && values.password2 && values.password !== values.password2) {
                    e.password2 = 'Пароли не совпадают'
                  }
                  if (active === 'partner') {
                    if (values.inn && !/^(?:\d{10}|\d{12})$/.test(values.inn)) e.inn = 'ИНН должен быть 10 или 12 цифр'
                  }
                  return e
                }}
                submitLabel={<span>{formConfig.submit}</span>}
                checkboxesAfterSubmit={active !== 'auth'}
              />
              {formConfig.aux && (
                <div className={styles.ctaNote} style={{ gridColumn: '1 / -1' }}>
                  {formConfig.aux.text}
                  <div style={{ marginTop: 8 }}>
                    <Button type="button" variant="gradientOutline" onClick={() => switchMode(formConfig.aux!.to)} buttonWidth="100%">
                      {formConfig.aux!.cta}
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <div className={classNames(styles.imageCol, { [styles.imageColWithImage]: active === 'auth' })}>
              <Image
                src="/images/formImageDesktop.png"
                alt=""
                width={800}
                height={600}
                quality={100}
                className={styles.desktopImage}
              />
              <Image
                src="/images/formImage.png"
                alt=""
                width={800}
                height={600}
                quality={100}
                className={styles.mobileImage}
              />
            </div>
          </div>
        </div>
      </Wrapper>
    </main>
  )
}

export default Login

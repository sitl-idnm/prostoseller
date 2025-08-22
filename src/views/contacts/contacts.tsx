"use client"
import { FC } from 'react'
import classNames from 'classnames'

import styles from './contacts.module.scss'
import { ContactsProps } from './contacts.types'
import { Form, Wrapper } from '@/ui'

const Contacts: FC<ContactsProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <main className={rootClassName}>
      <Wrapper>
        <Form
          grid={{ columns: '1fr 1fr', gap: 12 }}
          fields={[
            { id: 'name', type: 'input', label: 'Введите имя', placeholder: 'Ваше имя' },
            { id: 'email', type: 'email', label: 'Электронная почта', placeholder: '__@__' },
            { id: 'subject', type: 'input', label: 'Тема', placeholder: 'Например: консультация', gridColumn: '1 / -1' },
            { id: 'message', type: 'textarea', label: 'Текст обращения (необязательно)', placeholder: 'Введите текст', gridColumn: '1 / -1' }
          ]}
          submitLabel={<span>Отправить →</span>}
          onSubmit={(v) => console.log('contacts form', v)}
        />
      </Wrapper>
    </main>
  )
}

export default Contacts

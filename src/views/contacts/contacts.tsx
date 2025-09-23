"use client"
import { FC } from 'react'
import classNames from 'classnames'

import styles from './contacts.module.scss'
import { ContactsProps } from './contacts.types'
import { Form, Wrapper } from '@/ui'
import Image from 'next/image'
import { ContactInfo } from '@/modules/contactInfo'
import { SocialLinks } from '@/components'


const Contacts: FC<ContactsProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <main className={rootClassName}>
      <Wrapper className={styles.wrapper}>
        <div className={styles.headerSection}>
          <div className={styles.titleWithSocial}>
            <h1 className={styles.title}>Контакты</h1>
            <SocialLinks className={styles.socialLinks} />
          </div>
          <div className={styles.description}>Вы всегда сможете связаться с нами по любым интересующим Вас вопросам</div>
        </div>
        <div className={styles.content}><h2 className={styles.titleForm}>Остались вопросы?</h2>
          <div className={styles.contentFlex}>
            <Form
              grid={{ columns: '1fr 1fr', gap: 12 }}
              fields={[
                { id: 'name', type: 'input', label: 'Введите имя', placeholder: 'Ваше имя', required: true },
                { id: 'email', type: 'email', label: 'Электронная почта', placeholder: '__@__', required: true },
                { id: 'subject', type: 'input', label: 'Тема', placeholder: 'Например: консультация', gridColumn: '1 / -1', required: true },
                { id: 'message', type: 'textarea', label: 'Текст обращения (необязательно)', placeholder: 'Введите текст', gridColumn: '1 / -1' }
              ]}
              submitLabel={<span>Отправить</span>}
              onSubmit={(v) => console.log('contacts form', v)}
              enableEmailSubmit
              emailSubject="Сообщение с контактной формы"
              className={styles.form}
              buttonWidth="70%"
            />
            <Image src="/images/contacts.png" alt="Контакты" width={500} height={500} className={styles.image} />
          </div></div>
        <ContactInfo />
      </Wrapper>
    </main>
  )
}

export default Contacts

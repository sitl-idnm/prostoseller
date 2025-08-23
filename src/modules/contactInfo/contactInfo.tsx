import { FC } from 'react'
import classNames from 'classnames'

import styles from './contactInfo.module.scss'
import { ContactInfoProps } from './contactInfo.types'
import Image from 'next/image'

const ContactInfo: FC<ContactInfoProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <section className={rootClassName}>
      <div className={styles.panel}>
        <div className={styles.textArea}>
          <div className={styles.columns}>
            <div className={styles.col}>
              <h3 className={styles.heading}>Контакты</h3>
              <dl className={styles.list}>
                <div className={styles.item}>
                  <dt className={styles.term}>Адрес:</dt>
                  <dd className={styles.desc}>г. Москва ул.Рябиновая д.26 стр.8 БЦ West Plaza</dd>
                </div>
                <div className={styles.item}>
                  <dt className={styles.term}>Телефон:</dt>
                  <dd className={styles.desc}><a href="tel:+74953637386">+ 7 (495) 363-73-86</a></dd>
                </div>
                <div className={styles.item}>
                  <dt className={styles.term}>Email:</dt>
                  <dd className={styles.desc}><a href="mailto:info@prostoseller.com">info@prostoseller.com</a></dd>
                </div>
              </dl>
            </div>

            <div className={styles.col}>
              <h3 className={styles.heading}>Реквизиты:</h3>
              <dl className={styles.list}>
                <div className={styles.item}>
                  <dt className={styles.term}>ИП</dt>
                  <dd className={styles.desc}>КУЗНЕЧИХИН СЕРГЕЙ АНДРЕЕВИЧ</dd>
                </div>
                <div className={styles.item}>
                  <dt className={styles.term}>ИНН</dt>
                  <dd className={styles.desc}>503809769906</dd>
                </div>
                <div className={styles.item}>
                  <dt className={styles.term}>Банк:</dt>
                  <dd className={styles.desc}>АО «Тинькофф Банк»</dd>
                </div>
                <div className={styles.item}>
                  <dt className={styles.term}><a className={styles.link} href="#" aria-disabled>Бик банка</a></dt>
                  <dd className={styles.desc}>044525974</dd>
                </div>
                <div className={styles.item}>
                  <dt className={styles.term}><a className={styles.link} href="#" aria-disabled>Расчетный счет</a></dt>
                  <dd className={styles.desc}>40802810200001573274</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div className={styles.map}>
          <div className={styles.mapInner}>
            <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Ae83f99707b245e2274d65e205cb8280dd388adc0f12ddecba3974b1032113ba0&amp;source=constructor" width="100%" height="100%" frameBorder="0"></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactInfo

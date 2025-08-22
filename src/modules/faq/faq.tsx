'use client'

import { FC, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'

import styles from './faq.module.scss'
import { FaqEntry, FaqProps } from './faq.types'

import FaqArrow from '@icons/faq-arrow.svg'

const Faq: FC<FaqProps> = ({
  className,
  items,
  title
}) => {
  const rootClassName = classNames(styles.root, className)
  const defaultItems: FaqEntry[] = [
    {
      question: 'Чем аналитика Prostoseller будет мне полезна?',
      answer:
        'Prostoseller позволит вам в любой момент времени видеть ваш бизнес на маркетплейсе как на ладони. Вы будете знать, сколько точно зарабатываете на каждом из товаров, сможете следить за расходами и оптимизировать их, а так же рассчитывать и планировать закупки товаров, и управлять эффективностью ваших инвестиций и бизнес. По сути, это P&L вашего личного кабинета!'
    },
    {
      question: 'Насколько ваши данные точные?',
      answer:
        'Все данные сервис подгружает по API непосредственно из базы данных Ozon, а значит достоверность соответствует той, которую вам показывает личный кабинет Ozon seller. Можете быть уверены в корректности на 100%.'
    },
    {
      question: 'Сколько времени мне надо тратить на настройку Prostoseller',
      answer:
        'Первичная настройка сервиса займет 6 минут вашего времени, а при необходимости персональный менеджер с вами свяжется и поможет сделать эту настройку.'
    },
    {
      question: 'Какой тариф мне выбрать для подписки?',
      answer:
        'У нас есть 2 тарифа: Базовый и Оптимальный. Для понимания основной ситуации по вашему магазину будет достаточно тарифа Базовый. Если вы хотите видеть подробную аналитику расходов и оборачиваемость, у вас более 2x магазинов или вы занимаетесь качественным планированием доходов в бизнесе, то рекомендуем тариф Оптимальный.'
    },
    {
      question:
        'Если я подключу свой личный кабинет, кто-нибудь кроме меня сможет узнать конфиденциальную информацию?',
      answer:
        'После подключения к сервису посредством API никто не имеет доступа к информации вашего личного кабинета, кроме Вас. А сами данные хранятся на защищенном сервере. Можете быть уверены в своей безопасности.'
    }
  ]
  const itemsToRender = items && items.length ? items : defaultItems

  const [openIndex, setOpenIndex] = useState(-1)
  const contentRefs = useRef<Array<HTMLDivElement | null>>([])
  const innerRefs = useRef<Array<HTMLDivElement | null>>([])

  // Ensure correct measurements after mount so initial item opens with full height
  useEffect(() => {
    setOpenIndex(0)
  }, [])

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? -1 : idx))
  }

  return (
    <section className={rootClassName}>
      {title && <div className={styles.title}>{title}</div>}
      <div className={styles.grid}>
        {itemsToRender.map((entry, idx) => {
          const isOpen = openIndex === idx
          return (
            <div
              key={idx}
              className={classNames(styles.item, { [styles.item_open]: isOpen })}
            >
              <div className={styles.itemHeader} onClick={() => toggle(idx)}>
                <div className={styles.itemTitle}>{entry.question}</div>
                <FaqArrow className={styles.itemArrow} />
              </div>
              <div
                ref={(el) => {
                  contentRefs.current[idx] = el
                }}
                className={classNames(styles.itemContent, isOpen ? styles.itemContent_open : undefined)}
                style={{
                  maxHeight: isOpen
                    ? ((innerRefs.current[idx]?.scrollHeight || 0) + 12 + 24)
                    : 0
                }}
              >
                <div
                  ref={(el) => {
                    innerRefs.current[idx] = el
                  }}
                  className={styles.itemContent_inner}
                >
                  {entry.answer}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Faq

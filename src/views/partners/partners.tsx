import { FC } from 'react'
import classNames from 'classnames'

import styles from './partners.module.scss'
import { PartnersProps } from './partners.types'
import { Content } from '@/modules/content'
import { Wrapper } from '@/ui/wrapper'
import { Button } from '@/ui'
import { TitleHandler } from '@/modules/titleHandler'
import { CardHolder } from '@/modules/cardHolder'
import Image from 'next/image'
import { LogoCarousel } from '@/modules/logoCarousel'

const cards = [
  {
    key: 'freeMonth',
    icon: <Image src="/images/icon-rocket.svg" alt="Бесплатный месяц" width={24} height={24} />,
    title: 'Каждому вашему клиенту - бесплатный месяц Prostoseller после первой оплаты',
    animated: true,
  },
  {
    key: 'training',
    icon: <Image src="/images/icon-rocket.svg" alt="Обучение" width={24} height={24} />,
    title: 'Бесплатное обучение работе с Prostoseller',
    animated: true,
  },
  {
    key: 'diagnostics',
    icon: <Image src="/images/icon-rocket.svg" alt="Диагностика" width={24} height={24} />,
    title: 'Диагностика магазина по 40 пунктам с обратной связью от действующих предпринимателей на маркетплейсах',
    animated: true,
  },
]

const Partners: FC<PartnersProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <main className={rootClassName}>
      <Wrapper>
        <Content
          variant="solid"
          background="#D9E3FF"
          title="Станьте партнером Prostoseller и зарабатывайте 25% с каждой оплаты приведенных клиентов в течение 6 месяцев"
          subtitle="Приводи один раз, зарабатывай долго!"
          buttons={
            <>
              <Button variant="gradient">Подключить бесплатно</Button>
            </>
          }
        />
        <TitleHandler
          title="Стать партнером просто!"
          titleTagName="h2"
          titleSize="lg"
          mark={<>Как стать партнером?</>}>
        </TitleHandler>
        <TitleHandler
          title="Супер бонусы для Ваших клиентов"
          titleTagName="h2"
          titleSize="lg"
          mark={<>Бонусы</>}>
          <CardHolder cards={cards} />
        </TitleHandler>
        <TitleHandler
          title="Наши партнеры"
          titleTagName="h2"
          titleSize="lg">
          <LogoCarousel />
        </TitleHandler>
      </Wrapper>
    </main>
  )
}

export default Partners

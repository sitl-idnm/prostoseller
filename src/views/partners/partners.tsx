import { FC } from 'react'
import classNames from 'classnames'

import styles from './partners.module.scss'
import { PartnersProps } from './partners.types'
import { Content } from '@/modules/content'
import { Wrapper } from '@/ui/wrapper'
import { Button } from '@/ui'
import { LINKS } from '@/shared/const'
import { TitleHandler } from '@/modules/titleHandler'
import { CardHolder } from '@/modules/cardHolder'
import { LogoCarousel } from '@/modules/logoCarousel'
import { PartnersStages } from '@/modules/partnersStages'
import ArrowWhiteIcon from '@icons/arrowWhite.svg'

import CardRubIcon from '@icons/card_rub.svg'
import MonFileIcon from '@icons/mon_file.svg'
import LupaStatIcon from '@icons/lupa_stat.svg'
import { Notice } from '@/modules/notice'
import { CalcIncome } from '@/modules/calcIncome'

const cards = [
  {
    key: 'freeMonth',
    icon: <CardRubIcon />,
    title: 'Каждому вашему клиенту - бесплатный месяц Prostoseller после первой оплаты',
    animated: true,
  },
  {
    key: 'training',
    icon: <MonFileIcon />,
    title: 'Бесплатное обучение работе с Prostoseller',
    animated: true,
  },
  {
    key: 'diagnostics',
    icon: <LupaStatIcon />,
    title: 'Диагностика магазина по 40 пунктам с обратной связью от действующих предпринимателей на маркетплейсах',
    animated: true,
  },
]

const Partners: FC<PartnersProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <main className={rootClassName}>
      <Wrapper className={styles.wrapper}>
        <Content
          variant="split"
          backgroundRoot="#D9E3FF"
          backgroundContent='transparent'
          title={<>Станьте партнером <span className={styles.purple}>Prostoseller</span> и зарабатывайте <span className={styles.purple}>25%</span> с каждой оплаты приведенных клиентов в течение <span className={styles.purple}>6 месяцев</span></>}
          titleSize='sm'
          subtitle="Приводи один раз, зарабатывай долго!"
          buttons={
            <>
              <Button as="a" isRouteLink href={LINKS.connectFree} variant="gradient" buttonWidth="70%" icon={<ArrowWhiteIcon />}>Стать партнером</Button>
            </>
          }
          imageSrc="/images/partners_gift.png"
          imageAlt="Станьте партнером Prostoseller и зарабатывайте 25% с каждой оплаты приведенных клиентов в течение 6 месяцев"
          contentSize='minmax(0, 60%) minmax(0, 40%)'
        />
        <Notice
          text={
            <><span className={styles.purple}>Приглашайте</span> друзей, клиентов, коллег, читателей блогов, аудиторию фулфилмент центров и образовательных программ в сервис <span className={styles.purple}>Prostoseller!</span></>
          }
        />
        <CalcIncome
          title={<>Рассчитайте Ваш <span className={styles.purple}>доход</span> c&nbsp;<span className={styles.purple}>Prostoseller</span></>}
          text={<>Получайте доход после оплаты клиентом любого из тарифов</>}
        />
        <PartnersStages
          title={<><span className={styles.purple}>Стать партнером</span> просто!</>}
          titleStage={[<>Регистрируйтесь как партнер в Prostoseller</>, <>Копируйте реферальную ссылку из Вашего личного кабинета партнера</>, <>Привлекайте пользователей и получайте регулярный доход 25% с каждой оплаты</>]}
          mark={<>Как стать партнером?</>}
          buttons={
            <>
              <Button as="a" isRouteLink href={LINKS.connectFree} variant="gradient" buttonWidth="50%" icon={<ArrowWhiteIcon />}>Cтать партнером</Button>
            </>
          }
        />
        <TitleHandler
          title={<><span className={styles.purple}>Супер бонусы</span> для Ваших клиентов</>}
          titleTagName="h2"
          titleSize="lg"
          mark={<>Бонусы</>}>
          <CardHolder cards={cards} vertical />
        </TitleHandler>
        <TitleHandler
          title={<>Наши <span className={styles.purple}>партнеры</span></>}
          titleTagName="h2"
          titleSize="lg">
          <LogoCarousel />
        </TitleHandler>
      </Wrapper>
    </main>
  )
}

export default Partners

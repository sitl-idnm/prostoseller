import { FC } from 'react'
import classNames from 'classnames'

import styles from './company.module.scss'
import { CompanyProps } from './company.types'
import { Content } from '@/modules/content'
import { Wrapper } from '@/ui/wrapper'
import { TitleHandler } from '@/modules/titleHandler'
import { Button } from '@/ui'
import ArrowWhiteIcon from '@icons/arrowWhite.svg'
import { LINKS } from '@/shared/const'

const Company: FC<CompanyProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <main className={rootClassName}>
      <Wrapper className={styles.wrapper}>
        <Content
          variant="split"
          backgroundRoot="transparent"
          backgroundContent="#fff url('/images/company_bg.png') no-repeat 300px 80px / contain"
          title="О компании"
          titleTagName="h1"
          titleSize="lgmin"
          subtitle={<><span className={styles.purple}>Prostoseller</span> – это сервис, который показывает реальный <span className={styles.purple}>доход</span> и экономику продаж на <span className={styles.purple}>Wildberries</span> и <span className={styles.ozon}>Ozon</span></>}
          buttons={<Button as="a" isRouteLink href={LINKS.connectFree} variant="gradient" buttonWidth="70%" icon={<ArrowWhiteIcon />}>Подключить бесплатно</Button>}
          imageSrc="/images/photo_team.png"
          imageAlt="Команда Prostoseller"
          className={styles.content}
          contentSize='minmax(0, 50%) minmax(0, 50%)'
        />
        <TitleHandler
          title={<><span className={styles.purple>НАША ЦЕЛЬ</span> – сделать прибыль селлеров больше, а бизнес понятнее!</>}
          titleTagName="h2"
          titleSize="lg"
          mark={<>Наша <b>миссия</b></>}
          description={<><span style={{fontWeight: 400}}>Мы, опытные продавцы на OZON и Wildberries со стажем более 5 лет, поняли, как тяжело разобраться в множестве цифр, чтобы оценить реальную эффективность и доходность продаж на российских маркетплейсах. Глядя на то, как другие продавцы ведут бизнес «в минус», приняли решение изменить эту ситуацию и создали Prostoseller. Теперь каждый селлер точно понимает, сколько зарабатывает в разрезе каждого товара и принимает самые верные решения по ассортименту и оптимизации расходов!</span></>}
        />
      </Wrapper>
    </main>
  )
}

export default Company

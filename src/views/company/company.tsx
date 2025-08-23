import { FC } from 'react'
import classNames from 'classnames'

import styles from './company.module.scss'
import { CompanyProps } from './company.types'
import { Content } from '@/modules/content'
import { Wrapper } from '@/ui/wrapper'
import { TitleHandler } from '@/modules/titleHandler'

const Company: FC<CompanyProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <main className={rootClassName}>
      <Wrapper>
        <Content
          variant="split"
          backgroundRoot="#D9E3FF"
          title="О компании"
          titleTagName="h1"
          titleSize="md"
          subtitle="Prostoseller – это сервис, который показывает реальный доход и экономику продаж на Wildberries и Ozon "

        />
        <TitleHandler
          title="НАША ЦЕЛЬ – сделать прибыль селлеров больше, а бизнес понятнее!"
          titleTagName="h2"
          titleSize="lg"
          mark={<>Наша миссия</>}
          description="Мы, опытные продавцы на OZON и Wildberries со стажем более 5 лет, поняли, как тяжело разобраться в множестве цифр, чтобы оценить реальную эффективность и доходность продаж на российских маркетплейсах. Глядя на то, как другие продавцы ведут бизнес «в минус», приняли решение изменить эту ситуацию и создали Prostoseller. Теперь каждый селлер точно понимает, сколько зарабатывает в разрезе каждого товара и принимает самые верные решения по ассортименту и оптимизации расходов!"
        />

      </Wrapper>
    </main>
  )
}

export default Company

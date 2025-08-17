import { FC } from 'react'
import Image from 'next/image'
import { Button, Heading, Wrapper } from '@/ui'
import classNames from 'classnames'

import styles from './home.module.scss'
import { HomeProps } from './home.types'
import { Content } from '@/modules/content'
import { TitleHandler } from '@/modules/titleHandler'
import PlusMinus from '@/components/plusMinus/plusMinus'
import Faq from '@/modules/faq/faq'

const Home: FC<HomeProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <main className={rootClassName}>
      <Wrapper>
        <Heading tagName="h1" className={styles.title}>
          Next.js template
        </Heading>
        <Image
          src="/images/sticker-shark.png"
          width={512}
          height={492}
          quality={85}
          alt="Ligazavr"
          className={styles.image}
        />
        <TitleHandler
          title="Наши преимущества"
          titleTagName="h2"
          titleSize="lg"
          mark={<>Почему <b>Prostoseller</b></>}
        >
          <PlusMinus
            pairs={[
              {
                was: <>Выручка не растёт, несмотря на усилия?</>,
                became: <>
                  <strong>Prostoseller</strong> показывает, какие товары и инструменты продвижения приносят максимум выручки. Фокусируйтесь на том, что действительно работает!
                </>
              },
              {
                was: <>Продажи есть, а прибыли нет?</>,
                became: <>
                  <strong>Prostoseller</strong> анализирует и показывает чистую прибыль по каждому товару. Зарабатывайте больше, продавая только доходные товары и отказывайтесь от «минусовых»!
                </>
              },
              {
                was: <>Цены ставите наугад и не знаете как их посчитать, чтобы зарабатывать?</>,
                became: <>
                  Калькулятор в <strong>Prostoseller</strong> показывает ваш доход с товара при продаже по текущей цене и подсказывает, по какой цене вы можете заработать больше, учитывая все комиссии, доставку и рекламу. Устанавливайте цены, которые продают и зарабатывают!
                </>
              },
              {
                was: <>Не замечаете падение продаж?</>,
                became: <>
                  <strong>Prostoseller</strong> наглядно показывает динамику по дням и товарам. Анализируйте факторы снижения и улучшайте продажи!
                </>
              },
              {
                was: <>Товар закончился в самый пик спроса?</>,
                became: <>
                  <strong>Prostoseller</strong> заранее предупреждает, какие товары скоро закончатся или зависнут. Планируйте запасы с точными прогнозами продаж!
                </>
              },
              {
                was: <>Excel съедает ваше время?</>,
                became: <>
                  <strong>Prostoseller</strong> автоматически собирает всю аналитику в удобные дашборды. Всё, что нужно для контроля — в одном месте и без ошибок.
                </>
              }
            ]}
          />
        </TitleHandler>
        {/* Раздельный */}
        <Content
          variant="split"
          background="#f7f7fb"
          title="Удваиваем вашу прибыль"
          subtitle="На Wildberries и Ozon"
          description="8 из 10 пользователей увеличивают прибыль..."
          subDescription="Отчет Prostoseller покажет самые прибыльные товары..."
          buttons={
            <>
              <Button variant="gradient">Подключить бесплатно</Button>
              <Button variant="gradientOutline">Демо-кабинет</Button>
            </>
          }
          buttonsNote="4 дня бесплатно без привязки карты"
          imageSrc="/images/banner.jpg"
          imageAlt="Скриншот кабинета"
        />
        {/* Литой */}
        <TitleHandler
          title="Наши преимущества"
          titleTagName="h2"
          titleSize="lg"
          mark={<>Почему <b>Prostoseller</b></>}>
          <Content
            variant="solid"
            background="linear-gradient(90deg,#f1e9ff,#eaf5ff)"
            title="Пользуйтесь Prostoseller бесплатно"
            titleTagName="h1"
            titleSize="lg"
            subtitle="Приглашайте друзей и пользуйтесь сервисом бесплатно"
            description="За каждого друга — по одному бесплатному месяцу..."
            buttons={<Button>Пользоваться бесплатно</Button>}
            buttonsNote="Пригласил 12 друзей — держи год бесплатной аналитики"
          />
        </TitleHandler>
        <TitleHandler
          title="Часто задаваемые вопросы"
          titleTagName="h2"
          titleSize="lg"
          mark={<>FAQ <b>Prostoseller</b></>}>
          <Faq />
        </TitleHandler>
      </Wrapper>
    </main >
  )
}

export default Home

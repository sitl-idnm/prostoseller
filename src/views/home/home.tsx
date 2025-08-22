import { FC } from 'react'
import Image from 'next/image'
import { Button, Wrapper } from '@/ui'
import classNames from 'classnames'

import styles from './home.module.scss'
import { HomeProps } from './home.types'
import { Content } from '@/modules/content'
import { TitleHandler } from '@/modules/titleHandler'
import { PlusMinus } from '@/components/plusMinus'
import { Faq } from '@/modules/faq'
import { Price } from '@/modules/price'
import { CardHolder } from '@/modules/cardHolder'
import { Calculator } from '@/components/calculator'

import wasclose from '@public/images/close.png'
import beopen from '@public/images/tick.png'
import WbIcon from '@icons/pribil_icon.svg'
import OzonIcon from '@icons/pribil_ozon.svg'
import { PartnersStages } from '@/modules/partnersStages'

const cards = [
  { key: 'accuracy', icon: <Image src="/images/icon-rocket.svg" alt="Точность" width={24} height={24} />, title: 'Точность данных', text: 'Реальные данные напрямую с API Wildberries и Ozon — никаких искажений и задержек.', animated: true },
  { key: 'simplicity', icon: <Image src="/images/icon-rocket.svg" alt="Простота" width={24} height={24} />, title: 'Простота и удобство', text: 'Интуитивный интерфейс, понятный даже новичкам.', animated: true },
  { key: 'profit', icon: <Image src="/images/icon-rocket.svg" alt="Прибыль" width={24} height={24} />, title: 'Рост и управление прибылью', text: 'Видите, какие товары приносят деньги, а какие — убытки', animated: true },
  { key: 'time', icon: <Image src="/images/icon-rocket.svg" alt="Экономия времени" width={24} height={24} />, title: 'Экономия времени', text: 'Больше не нужно считать вручную. Ваша аналитика всегда актуальна и автоматизирована', animated: true },
  { key: 'stocks', icon: <Image src="/images/icon-rocket.svg" alt="Планирование остатков" width={24} height={24} />, title: 'Планирование остатков', text: 'Заранее знаете, когда пополнять склад, чтобы никогда не терять продажи и прибыль', animated: true },
  { key: 'calc', icon: <Image src="/images/icon-rocket.svg" alt="Калькулятор" width={24} height={24} />, title: 'Встроенный калькулятор цен', text: 'Больше не нужно считать вручную. Ваша аналитика всегда актуальна и автоматизирована', animated: true },
  { key: 'two-mp', icon: <Image src="/images/icon-rocket.svg" alt="Два маркетплейса" width={24} height={24} />, title: 'Один сервис для двух маркетплейсов', text: 'Вы с комфортом управляете бизнесом через единую платформу аналитики и зарабатываете больше', animated: true },
  {
    key: 'cta',
    icon: <Image src="/images/icon-rocket.svg" alt="CTA" width={24} height={24} />,
    title: 'Начните управлять своим бизнесом уже сегодня!',
    action: (
      <Button as="a" isRouteLink href="/login" variant="gradient" size="md">
        Подключить бесплатно →
      </Button>
    ),
    animated: true,
  },
]

const Home: FC<HomeProps> = ({ className }) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <main className={rootClassName}>
      <Wrapper className={styles.wrapper}>
        {/* Раздельный */}
        <Content
          variant="split"
          background="transparent"
          backgroundContent="#fff"
          title={<>Удваиваем Вашу <span className={`${styles.iconwb} ${styles.icon_profit}`}><WbIcon /></span> прибыль на&nbsp;<span className={styles.wb}>Wildberries</span> и&nbsp;<span className={styles.ozon}>Ozon</span><span className={styles.icon_profit}><OzonIcon /></span></>}
          titleSize="lg"
          subtitle={<><span className={styles.purple}>8 из 10</span> пользователей <span className={styles.purple}>увеличивают прибыль</span> в среднем на <span className={styles.purple}>18%</span> уже на втором месяце использования сервиса</>}
          description={<>Отчет <span className={styles.purple}>Prostoseller</span> покажет самые прибыльные товары, оптимизирует затраты, улучшит планирование и поможет направить инвестиции для роста прибыли.</>}
          buttons={
            <>
              <Button variant="gradient">Подключить бесплатно</Button>
              <Button variant="gradientOutline">Demo-кабинет</Button>
            </>
          }
          buttonsNote="4 дня бесплатно без привязки карты"
          imageSrc="/images/laptop_prostoseller.png"
          imageAlt="Скриншот кабинета"
        />
        <TitleHandler
          title={<>Мы знаем, что мешает вашему <span className={styles.purple}>бизнесу</span> расти и приходим на помощь с <span className={styles.purple}>решениями!</span></>}
          titleTagName="h2"
          titleSize="lg"
          description={<>Откройте для себя <span className={styles.purple}>Prostoseller</span> — платформу, которая помогает зарабатывать больше!</>}
          mark={<>Какие задачи решает <b>Prostoseller</b></>}
        >
          <PlusMinus
            wasIcon={<Image src={wasclose} alt="was" width={36} height={36} />}
            becameIcon={<Image src={beopen} alt="became" width={36} height={36} />}
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

        <PartnersStages />

        {/* Литой */}
        <TitleHandler
          title={<>Пользуйтесь Prostoseller <span className={styles.purple}>бесплатно</span></>}
          titleTagName="h2"
          titleSize="lg"
          mark={<>Как работает <b>Prostoseller</b></>}>
          <Content
            variant="solid"
            background="linear-gradient(90deg,#f1e9ff,#eaf5ff)"
            title={<>Приглашайте друзей в <span className={styles.purple}>Prostoseller</span> и пользуйтесь сервисом бесплатно</>}
            titleTagName="h1"
            titleSize="sm"
            subtitle="За каждого друга - по одному бесплатному месяцу тебе и ему"
            description="Публикуйте свой пригласительный код в социальных сетях, делитесь кодом с друзьями и получайте свой бонус за каждое его использование"
            subDescription="Пригласил 12 друзей - ДЕРЖИ ГОД БЕСПЛАТНОЙ АНАЛИТИКИ"
            buttons={<Button>Пользоваться бесплатно</Button>}
          />
        </TitleHandler>

        <TitleHandler
          title="Наши преимущества"
          titleTagName="h2"
          titleSize="lg"
          mark={<>Почему <b>Prostoseller</b></>}>
          <CardHolder cards={cards} />
        </TitleHandler>
        <Content
          variant="split"
          background="#f7f7fb"
          title={<>Смотрите, как работает <span className={styles.purple}>Pro
            stoseller</span> изнутри<span className={styles.icon_profit}><OzonIcon /></span></>}

          description={<>Отчет <span className={styles.purple}>Prostoseller</span> покажет самые прибыльные товары, оптимизирует затраты, улучшит планирование и поможет направить инвестиции для роста прибыли.</>}

          buttons={
            <>
              <Button variant="gradient">Demo-кабинет</Button>
            </>
          }
          imageSrc="/images/laptop_prostoseller.png"
          imageAlt="Скриншот кабинета"
        />
        <Price />
        <TitleHandler
          title={<><span className={styles.purple}>Отзывы </span>реальных пользователей</>}
          titleTagName="h2"
          titleSize="lg"
          mark={<>Отзывы о <b>Prostoseller</b></>}>
        </TitleHandler>
        <TitleHandler
          title={<>Часто задаваемые <span className={styles.purple}>вопросы</span></>}
          titleTagName="h2"
          titleSize="lg"
          mark={<>FAQ <b>Prostoseller</b></>}>
          <Faq />
        </TitleHandler>


        {/* Литой */}
        <Content
          variant="solid"
          background="#A452D7"
          backgroundContent="#A452D7"
          title={<><span className={styles.white}>Начните управлять своим бизнесом уже сегодня!</span></>}
          titleTagName="h2"
          titleSize="md"
          buttons={<Button variant="white">Подключить бесплатно</Button>}
        />


        <Calculator />
      </Wrapper>
    </main >
  )
}

export default Home

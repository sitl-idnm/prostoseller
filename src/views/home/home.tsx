import { FC } from 'react'
import { Button, Wrapper } from '@/ui'
import { LINKS } from '@/shared/const'
import classNames from 'classnames'

import styles from './home.module.scss'
import { HomeProps } from './home.types'
import { Content } from '@/modules/content'
import { TitleHandler } from '@/modules/titleHandler'
import { PlusMinus } from '@/components/plusMinus'
import { Faq } from '@/modules/faq'
import { Price } from '@/modules/price'
import { CardHolder } from '@/modules/cardHolder'

import WasCloseIcon from '@icons/was-close.svg'
import BeforeOpenIcon from '@icons/before-open.svg'
import WbIcon from '@icons/pribil_icon.svg'
import OzonIcon from '@icons/pribil_ozon.svg'
import { PartnersStages } from '@/modules/partnersStages'

import RykiIcon from '@icons/ryki.svg'
import TochnostIcon from '@icons/tochnost.svg'
import LupaIcon from '@icons/lupa.svg'
import ClockIcon from '@icons/clock.svg'
import ProstotaIcon from '@icons/prostota.svg'
import CalcIcon from '@icons/calc.svg'
import WarehouseIcon from '@icons/warehouse.svg'
import WbOzon from '@icons/ozonwbicon.svg'
import LupapupaIcon from '@icons/lupapupa.svg'
import ArrowWhiteIcon from '@icons/arrowWhite.svg'
import ArrowIcon from '@icons/arrow.svg'

const cards = [
  { key: 'accuracy', icon: <TochnostIcon />, title: 'Точность данных', text: 'Реальные данные напрямую с API Wildberries и Ozon — никаких искажений и задержек.', animated: true },
  { key: 'simplicity', icon: <ProstotaIcon />, title: 'Простота и удобство', text: 'Интуитивный интерфейс, понятный даже новичкам.', animated: true },
  { key: 'profit', icon: <LupaIcon />, title: 'Рост и управление прибылью', text: 'Видите, какие товары приносят деньги, а какие — убытки', animated: true },
  { key: 'time', icon: <ClockIcon />, title: 'Экономия времени', text: 'Больше не нужно считать вручную. Ваша аналитика всегда актуальна и автоматизирована', animated: true },
  { key: 'stocks', icon: <WarehouseIcon />, title: 'Планирование остатков', text: 'Заранее знаете, когда пополнять склад, чтобы никогда не терять продажи и прибыль', animated: true },
  { key: 'calc', icon: <CalcIcon />, title: 'Встроенный калькулятор цен', text: 'Больше не нужно считать вручную. Ваша аналитика всегда актуальна и автоматизирована', animated: true },
  { key: 'two-mp', icon: <WbOzon />, title: 'Один сервис для двух маркетплейсов', text: 'Вы с комфортом управляете бизнесом через единую платформу аналитики и зарабатываете больше', animated: true },
  {
    key: 'cta',
    icon: <RykiIcon />,
    title: 'Начните управлять своим бизнесом уже сегодня!',
    action: (
      <Button as="a" isRouteLink href="/login" variant="gradient" size="md" icon={<ArrowWhiteIcon />}>
        Подключить бесплатно
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
          backgroundRoot="transparent"
          backgroundContent="#fff"
          title={<>Удваиваем Вашу <span className={`${styles.iconwb} ${styles.icon_profit}`}><WbIcon /></span> прибыль на&nbsp;<span className={styles.wb}>Wildberries</span> и&nbsp;<span className={styles.ozon}>Ozon</span><span className={styles.icon_profit}><OzonIcon /></span></>}
          titleSize="lg"
          subtitle={<><span className={styles.purple}>8 из 10</span> пользователей <span className={styles.purple}>увеличивают прибыль</span> в среднем на <span className={styles.purple}>18%</span> уже на втором месяце использования сервиса</>}
          description={<>Отчет <span className={styles.purple}>Prostoseller</span> покажет самые прибыльные товары, оптимизирует затраты, улучшит планирование и поможет направить инвестиции для роста прибыли.</>}
          buttons={
            <>
              <Button as="a" isRouteLink href={LINKS.connectFree} variant="gradient" buttonWidth="70%" icon={<ArrowWhiteIcon />}>Подключить бесплатно</Button>
              <Button as="a" isRouteLink href={LINKS.demoCabinet} variant="gradientOutline" buttonWidth="30%">Demo-кабинет</Button>
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
            wasIcon={<WasCloseIcon />}
            becameIcon={<BeforeOpenIcon />}
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

        <PartnersStages
          title={<><span className={styles.purple}>3 простых шага</span>, чтобы начать зарабатывать <span className={styles.purple}>больше в 2 раза</span> <span className={styles.icon_profit}><WbOzon /></span></>}
          titleStage={[<>3 простых шага</>, <>Сервис автоматически соберёт и рассчитает все показатели</>, <>Управлять бизнесом теперь станет значительно проще</>]}
          textStage={[<>Интеграция в один клик — уже через минуту данные в системе!</>, <>Вы отдыхаете — сервис считает, анализирует и показывает ключевые цифры</>, <>Понимайте, что работает, а что — нет. Принимайте решения на основе точных данных, а не на интуиции.</>]}
          mark={<>Как работает <b>Prostoseller</b></>}
          buttons={
            <>
              <Button as="a" isRouteLink href={LINKS.connectFree} variant="gradient" buttonWidth="48%" icon={<ArrowWhiteIcon />}>Подключить бесплатно</Button>
              <Button as="a" isRouteLink href={LINKS.demoCabinet} variant="gradientOutline" buttonWidth="48%">Demo-кабинет</Button>
            </>
          }
        />

        {/* Литой */}
        <TitleHandler
          title={<>Пользуйтесь Prostoseller <span className={styles.purple}>бесплатно</span></>}
          titleTagName="h2"
          titleSize="lg"
          mark={<>Как работает <b>Prostoseller</b></>}>
          <Content
            variant="split"
            backgroundRoot="url('/images/prostoseller_free.png') no-repeat center center / cover"
            backgroundContent='transparent'
            title={<>Приглашайте друзей в <span className={styles.purple}>Prostoseller</span> и пользуйтесь сервисом бесплатно</>}
            titleTagName="h1"
            titleSize="sm"
            subtitle="За каждого друга - по одному бесплатному месяцу тебе и ему"
            description="Публикуйте свой пригласительный код в социальных сетях, делитесь кодом с друзьями и получайте свой бонус за каждое его использование"
            subDescription="Пригласил 12 друзей - ДЕРЖИ ГОД БЕСПЛАТНОЙ АНАЛИТИКИ"
            buttons={<Button as="a" isRouteLink href={LINKS.invite ?? LINKS.connectFree} style={{ width: '100%' }} variant="gradient" icon={<ArrowWhiteIcon />}>Пользоваться бесплатно</Button>}
            imageSrc="/images/box_free.png"
            imageAlt="Скриншот кабинета"
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
          backgroundRoot="#f7f7fb"
          title={<>Смотрите, как работает <span className={styles.purple}>Prostoseller</span> изнутри <span className={styles.icon_profit}><LupapupaIcon /></span></>}

          description={<>Отчет <span className={styles.purple}>Prostoseller</span> покажет самые прибыльные товары, оптимизирует затраты, улучшит планирование и поможет направить инвестиции для роста прибыли.</>}

          buttons={
            <>
              <Button as="a" isRouteLink href={LINKS.demoCabinet} variant="gradient" icon={<ArrowWhiteIcon />} buttonWidth="100%">Demo-кабинет</Button>
            </>
          }
          imageSrc="/images/laptop-see.png"
          imageAlt="Скриншот кабинета"
        />
        <Price />
        <TitleHandler
          title={<><span className={styles.purple}>Отзывы </span>реальных пользователей</>}
          titleTagName="h2"
          titleSize="lg"
          mark={<>Отзывы о <b>Prostoseller</b></>}>
          <div style={{ width: '560px', height: '800px', margin: '0 auto', overflow: 'hidden', position: 'relative' }}><iframe style={{ width: '100%', height: '100%', border: '1px solid #e6e6e6', borderRadius: '8px', boxSizing: 'border-box' }} src="https://yandex.ru/maps-reviews-widget/220547016069?comments"></iframe><a href="https://yandex.ru/maps/org/prostoseller/220547016069/" target="_blank" style={{ boxSizing: 'border-box', textDecoration: 'none', color: '#b3b3b3', fontSize: '10px', fontFamily: 'YS Text,sans-serif', padding: '0 20px', position: 'absolute', bottom: '8px', width: '100%', textAlign: 'center', left: '0', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block', maxHeight: '14px', whiteSpace: 'nowrap', paddingBlock: '0 16px', MozBoxSizing: 'border-box' }}>Prostoseller на карте Москвы — Яндекс Карты</a></div>
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
          variant="split"
          backgroundRoot="linear-gradient(75deg,#FA457E 0%,#7B49FF 20%)"
          backgroundContent="transparent"
          title={<><span className={styles.white}>Начните управлять своим бизнесом уже сегодня!</span></>}
          titleTagName="h2"
          titleSize="sm"
          buttons={<Button as="a" isRouteLink href={LINKS.connectFree} variant="white" style={{ width: '100%' }} icon={<ArrowIcon />}>Подключить бесплатно</Button>}
          imageSrc="/images/start_laptop.png"
          imageAlt="Скриншот кабинета"

        />
      </Wrapper>
    </main >
  )
}

export default Home

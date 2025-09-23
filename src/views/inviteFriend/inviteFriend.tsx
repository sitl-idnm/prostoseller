import { FC } from 'react'
import classNames from 'classnames'

import styles from './inviteFriend.module.scss'
import { InviteFriendProps } from './inviteFriend.types'
import { Wrapper } from '@/ui/wrapper'
import { Content } from '@/modules/content'
import { Button } from '@/ui'
import { LINKS } from '@/shared/const'
import { TitleHandler } from '@/modules/titleHandler'
import { LogoCarousel } from '@/modules/logoCarousel'
import ArrowWhiteIcon from '@icons/arrowWhite.svg'

const InviteFriend: FC<InviteFriendProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <main className={rootClassName}>
      <Wrapper className={styles.wrapper}>
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
          buttons={<Button as="a" isRouteLink href={LINKS.invite ?? LINKS.connectFree} style={{ width: '50%' }} variant="gradient" icon={<ArrowWhiteIcon />}>Пользоваться бесплатно</Button>}
          imageSrc="/images/box_free.png"
          imageAlt="Скриншот кабинета"
          contentSize='minmax(0, 59%) minmax(0, 41%)'
        />
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

export default InviteFriend

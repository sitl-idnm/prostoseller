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

const InviteFriend: FC<InviteFriendProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)

  return (
    <main className={rootClassName}>
      <Wrapper>
        <Content
          variant="solid"
          backgroundRoot="#D9E3FF"
          title="Приглашайте друзей в Prostoseller и пользуйтесь сервисом бесплатно"
          subtitle="За каждого друга - по одному бесплатному месяцу тебе и ему"
          description="Публикуйте свой пригласительный код в социальных сетях, делитесь кодом с друзьями и получайте свой бонус за каждое его использование"
          subDescription="Пригласил 12 друзей - ДЕРЖИ ГОД БЕСПЛАТНОЙ АНАЛИТИКИ"
          buttons={<Button as="a" isRouteLink href={LINKS.invite}>Пользоваться бесплатно</Button>}
        />
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

export default InviteFriend

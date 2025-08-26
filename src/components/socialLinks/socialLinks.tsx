import { FC } from 'react'
import classNames from 'classnames'

import styles from './socialLinks.module.scss'
import { SocialLinksProps } from './socialLinks.types'

import IconTg from '@icons/tg.svg'
import IconWa from '@icons/wa.svg'

const SocialLinks: FC<SocialLinksProps> = ({
  className
}) => {
  const rootClassName = classNames(styles.root, className)


  return (
    <div className={rootClassName}>
      <a href="https://t.me/prostoseller_com" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
        <IconTg />
      </a>
      <a href="https://wa.me/message/E3CSFZG7WBDMA1" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
        <IconWa />
      </a>
    </div>
  )
}

export default SocialLinks

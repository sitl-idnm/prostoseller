import { FC } from 'react'
import classNames from 'classnames'

import styles from './logoCarousel.module.scss'
import { LogoCarouselProps } from './logoCarousel.types'
import FilGood from '@icons/carousel/filgood.svg'
import GetCourse from '@icons/carousel/getcourse.svg'
import MM from '@icons/carousel/mm.svg'
import OZON from '@icons/carousel/ozon.svg'
import MySklad from '@icons/carousel/mysklad.svg'
import Otzovik from '@icons/carousel/otzovik.svg'
import WB from '@icons/carousel/wb.svg'
import Yandex from '@icons/carousel/yandex.svg'


const LogoCarousel: FC<LogoCarouselProps> = ({
  className,
  icons
}) => {
  const rootClassName = classNames(styles.root, className)
  const items = icons && icons.length ? icons : [
    <FilGood key="filgood" />,
    <GetCourse key="getcourse" />,
    <MM key="mm" />,
    <OZON key="ozon" />,
    <MySklad key="mysklad" />,
    <Otzovik key="otzovik" />,
    <WB key="wb" />,
    <Yandex key="yandex" />
  ]

  // duplicate list for seamless looping
  const sequence = [...items, ...items]

  return (
    <div className={rootClassName}>
      <div className={styles.viewport}>
        <div className={styles.marquee}>
          {sequence.map((icon, idx) => (
            <div key={idx} className={styles.item} aria-hidden={false}>
              {icon}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LogoCarousel

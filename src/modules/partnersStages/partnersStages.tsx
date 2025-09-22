'use client'

import { FC, useRef, useEffect, useState } from 'react'
import classNames from 'classnames'

import styles from './partnersStages.module.scss'
import { PartnersStagesProps } from './partnersStages.types'
import { useGSAP } from '@gsap/react'

import gsap from 'gsap'
import FirstStage from '@icons/firstCircle.svg'
import SecondStage from '@icons/secondDisactive.svg'
import ThirdStage from '@icons/thirdDisactive.svg'

import Image from 'next/image'
import DisactiveLine from '@public/images/disactiveLine.png'
import ActiveLine from '@public/images/activeLine.png'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SecondStageActive = () => {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="49" fill="#A452D7" />
      <circle cx="50" cy="50" r="49" stroke="#D544EE" />
      <path d="M38.4956 47.1C38.6156 45.34 39.1956 43.82 40.2356 42.54C41.2756 41.24 42.6556 40.25 44.3756 39.57C46.1156 38.87 48.0756 38.52 50.2556 38.52C52.3356 38.52 54.1456 38.84 55.6856 39.48C57.2456 40.1 58.4556 40.97 59.3156 42.09C60.1756 43.21 60.6056 44.51 60.6056 45.99C60.6056 47.13 60.2956 48.2 59.6756 49.2C59.0556 50.18 58.0856 51.15 56.7656 52.11C55.4456 53.05 53.7156 54.04 51.5756 55.08L45.3956 58.17L45.1556 56.58H61.2356V61.5H38.9756V57.18L48.6356 51.75C50.1356 50.89 51.2956 50.17 52.1156 49.59C52.9556 48.99 53.5456 48.44 53.8856 47.94C54.2456 47.44 54.4256 46.91 54.4256 46.35C54.4256 45.73 54.2556 45.2 53.9156 44.76C53.5956 44.3 53.1056 43.94 52.4456 43.68C51.7856 43.42 50.9756 43.29 50.0156 43.29C48.8156 43.29 47.8356 43.47 47.0756 43.83C46.3156 44.17 45.7456 44.63 45.3656 45.21C44.9856 45.77 44.7556 46.4 44.6756 47.1H38.4956Z" fill="white" />
    </svg>
  )
}

const ThirdStageActive = () => {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="49" fill="#A452D7" />
      <circle cx="50" cy="50" r="49" stroke="#D544EE" />
      <path d="M38.827 46.26C38.947 44.84 39.457 43.55 40.357 42.39C41.257 41.21 42.557 40.27 44.257 39.57C45.957 38.87 48.027 38.52 50.467 38.52C52.547 38.52 54.357 38.78 55.897 39.3C57.457 39.82 58.657 40.55 59.497 41.49C60.357 42.43 60.787 43.54 60.787 44.82C60.787 45.82 60.477 46.74 59.857 47.58C59.257 48.42 58.297 49.09 56.977 49.59C55.677 50.07 53.977 50.3 51.877 50.28V49.65C53.837 49.57 55.517 49.71 56.917 50.07C58.317 50.43 59.387 51.02 60.127 51.84C60.887 52.66 61.267 53.7 61.267 54.96C61.267 56.32 60.827 57.53 59.947 58.59C59.067 59.65 57.787 60.48 56.107 61.08C54.447 61.68 52.407 61.98 49.987 61.98C47.647 61.98 45.607 61.66 43.867 61.02C42.127 60.38 40.767 59.47 39.787 58.29C38.827 57.09 38.317 55.69 38.257 54.09H44.437C44.597 55.09 45.117 55.86 45.997 56.4C46.897 56.94 48.227 57.21 49.987 57.21C51.587 57.21 52.807 56.97 53.647 56.49C54.507 56.01 54.937 55.34 54.937 54.48C54.937 53.98 54.797 53.56 54.517 53.22C54.257 52.88 53.787 52.63 53.107 52.47C52.427 52.29 51.477 52.2 50.257 52.2H46.387V48H50.257C51.837 48 52.937 47.79 53.557 47.37C54.197 46.95 54.517 46.39 54.517 45.69C54.517 44.93 54.147 44.34 53.407 43.92C52.687 43.5 51.597 43.29 50.137 43.29C48.577 43.29 47.377 43.55 46.537 44.07C45.697 44.59 45.197 45.32 45.037 46.26H38.827Z" fill="white" />
    </svg>
  )
}

const PartnersStages: FC<PartnersStagesProps> = ({
  className,
  title,
  titleStage,
  textStage,
  mark,
  buttons,
  buttonsNote
}) => {
  const rootClassName = classNames(styles.root, className)
  const [isMobile, setIsMobile] = useState(false)

  const lineRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const secondStageRef = useRef<HTMLDivElement>(null)
  const thirdStageRef = useRef<HTMLDivElement>(null)
  const secondStageTextRef = useRef<HTMLDivElement>(null)
  const thirdStageTextRef = useRef<HTMLDivElement>(null)

  const MobileFirstLineRef = useRef<HTMLImageElement>(null)
  const MobileSecondLineRef = useRef<HTMLImageElement>(null)
  const MobileSecondStageRef = useRef<HTMLDivElement>(null)
  const MobileSecondStageTextRef = useRef<HTMLDivElement>(null)
  const MobileThirdStageRef = useRef<HTMLDivElement>(null)
  const MobileThirdStageTextRef = useRef<HTMLDivElement>(null)

  // Определяем мобильную версию по размеру экрана
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
        markers: false
      }
    })

    if (!isMobile) {
      // Десктопная анимация
      if (lineRef.current) {
        tl.fromTo(lineRef.current, {
          width: '0%',
        }, {
          width: '50%',
          duration: 1,
          ease: 'power2.inOut',
        })

        tl.to([secondStageRef.current, secondStageTextRef.current], {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.inOut',
        }, '-=0.5')

        tl.fromTo(lineRef.current, {
          width: '50%',
        }, {
          width: '100%',
          duration: 1,
          ease: 'power2.inOut',
        })

        tl.to([thirdStageRef.current, thirdStageTextRef.current], {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.inOut',
        }, '-=0.5')
      }
    } else {
      // Мобильная анимация
      if (MobileFirstLineRef.current) {
        tl.fromTo(MobileFirstLineRef.current, {
          width: '0%',
        }, {
          width: '100%',
          duration: 1,
          ease: 'power2.inOut',
        })

        tl.to([MobileSecondStageRef.current, MobileSecondStageTextRef.current], {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.inOut',
        }, '-=0.3')

        tl.fromTo(MobileSecondLineRef.current, {
          width: '0%',
        }, {
          width: '100%',
          duration: 1,
          ease: 'power2.inOut',
        })

        tl.to([MobileThirdStageRef.current, MobileThirdStageTextRef.current], {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.inOut',
        }, '-=0.3')
      }
    }
  }, [isMobile])

  return (
    <section className={rootClassName} ref={containerRef}>
      <div className={styles.title}>
        <h2>
          {title}
        </h2>
        <div className={styles.mark}>{mark}</div>
      </div>
      <div className={styles.container}>
        <div className={styles.lines}>
          <Image src={DisactiveLine} alt="Disactive Line" className={styles.disactiveLine} />
          <Image src={ActiveLine} alt="Active Line" className={styles.activeLine} ref={lineRef} />
        </div>
        <div className={styles.stages}>
          <div className={`${styles.stage} ${styles.first}`}>
            <FirstStage />
            <div className={`${styles.stageContent} ${styles.firstText}`}>
              <h2>{titleStage[0]}</h2>
              {textStage &&
                <p>{textStage[0]}</p>
              }
            </div>
          </div>
          <div className={`${styles.stage} ${styles.second}`}>
            <SecondStage />
            <div
              ref={secondStageRef}
              className={styles.stageActive}
            >
              <SecondStageActive />
            </div>
            <div
              ref={secondStageTextRef}
              className={styles.stageContent}
            >
              <h2>{titleStage[1]}</h2>
              {textStage &&
                <p>{textStage[1]}</p>
              }
            </div>
          </div>
          <div className={`${styles.stage} ${styles.third}`}>
            <ThirdStage />
            <div
              ref={thirdStageRef}
              className={styles.stageActive}
            >
              <ThirdStageActive />
            </div>
            <div
              ref={thirdStageTextRef}
              className={styles.stageContent}
            >
              <h2>{titleStage[2]}</h2>
              {textStage &&
                <p>{textStage[2]}</p>
              }
            </div>
          </div>
        </div>
      </div>

      {/* Мобильная версия */}
      <div className={styles.mobile}>
        <div className={styles.mobileStage}>
          <div className={`${styles.stage} ${styles.first}`}>
            <FirstStage />
          </div>
          <div className={`${styles.stageContent} ${styles.firstText}`}>
            <h2>{titleStage[0]}</h2>
            {textStage && <p>{textStage[0]}</p>}
          </div>
        </div>
        <div className={styles.mobileStage}>
          <div className={styles.stage}>
            <SecondStage />
            <div
              ref={MobileSecondStageRef}
              className={styles.stageActive}
            >
              <SecondStageActive />
            </div>
          </div>
          <div
            ref={MobileSecondStageTextRef}
            className={styles.stageContent}
          >
            <h2>{titleStage[1]}</h2>
            {textStage && <p>{textStage[1]}</p>}
          </div>
        </div>
        <div className={styles.mobileStage}>
          <div className={styles.stage}>
            <ThirdStage />
            <div
              ref={MobileThirdStageRef}
              className={styles.stageActive}
            >
              <ThirdStageActive />
            </div>
          </div>
          <div
            ref={MobileThirdStageTextRef}
            className={styles.stageContent}
          >
            <h2>{titleStage[2]}</h2>
            {textStage && <p>{textStage[2]}</p>}
          </div>
        </div>
      </div>
      {buttons &&
        <div className={styles.buttons}>
          {buttons}
          {buttonsNote && <p className={styles.buttonsNote}>{buttonsNote}</p>}
        </div>
      }

    </section>
  )
}

export default PartnersStages

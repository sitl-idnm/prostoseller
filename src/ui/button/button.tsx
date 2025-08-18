'use client'

import { ElementType, useEffect, useMemo, useRef } from 'react'
import Link from 'next/link'
import classNames from 'classnames'

import styles from './button.module.scss'
import { ButtonProps } from './button.types'

const defaultElement = 'button'

export default function Button<E extends ElementType = typeof defaultElement>({
  isRouteLink,
  variant,
  colorScheme = 'black',
  size = 'md',
  children,
  icon,
  iconPosition = 'right',
  iconGap = 8,
  as,
  className,
  ...props
}: ButtonProps<E>) {
  // map legacy colorScheme to new variants
  const mappedVariant = useMemo(() => {
    if (variant) return variant
    if (colorScheme === 'white') return 'white'
    return 'purple'
  }, [variant, colorScheme])

  const elClassName = classNames(
    styles.root,
    styles[`root_${size}`],
    styles[`root_${mappedVariant}`],
    className
  )

  const TagName = as || defaultElement
  const isLink = !!(isRouteLink && TagName === 'a')

  const iconRef = useRef<HTMLSpanElement | null>(null)
  const textRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    // optional GSAP draw animation stub, import only if icon exists
    if (!iconRef.current) return
      // Lazy import gsap only on client and when icon provided
      ; (async () => {
        try {
          const gsap = (await import('gsap')).default
          // If the icon contains stroked paths, we can simulate draw by dashoffset
          const el = iconRef.current as unknown as HTMLElement
          if (!el) return
          gsap.set(el, { opacity: 0 })
          const onEnter = () => {
            gsap.to(el, { opacity: 1, duration: 0.3 })
            if (textRef.current) {
              const shift = iconGap
              const dir = iconPosition === 'right' ? -shift : shift
              gsap.to(textRef.current, { x: dir, duration: 0.3 })
            }
          }
          const onLeave = () => {
            gsap.to(el, { opacity: 0, duration: 0.3 })
            if (textRef.current) {
              gsap.to(textRef.current, { x: 0, duration: 0.3 })
            }
          }
          const rootEl = (textRef.current?.parentElement as HTMLElement) || undefined
          if (rootEl) {
            rootEl.addEventListener('mouseenter', onEnter)
            rootEl.addEventListener('mouseleave', onLeave)
            return () => {
              rootEl.removeEventListener('mouseenter', onEnter)
              rootEl.removeEventListener('mouseleave', onLeave)
            }
          }
        } catch (e) {
          // gsap not installed; ignore animation
        }
      })()
  }, [iconPosition, iconGap])

  const content = (
    <span className={styles.content} style={{ gap: `${iconGap}px`, flexDirection: iconPosition === 'right' ? 'row' : 'row-reverse' }}>
      {icon && (
        <span className={styles.icon} ref={iconRef} aria-hidden="true">
          {icon}
        </span>
      )}
      <span className={styles.text} ref={textRef}>{children}</span>
    </span>
  )

  return isLink ? (
    <Link {...(props as Record<string, unknown>)} href={(props as Record<string, string>).href} className={elClassName}>
      {content}
    </Link>
  ) : (
    <TagName {...props} className={elClassName}>
      {content}
    </TagName>
  )
}

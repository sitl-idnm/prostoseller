'use client'

import { FC, ReactNode, useEffect, Suspense } from 'react'
import { DeviceSize, SCALING_BREAKPOINTS } from '@/shared/const'
import { isDeviceAtom } from '@atoms/deviceAtom'
import { useScaling } from '@hooks/index'
import { Provider as JotaiProvider, useAtom } from 'jotai'
import { useSearchParams } from 'next/navigation'

const UtmCapture: FC = () => {
  const sp = useSearchParams()
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const keys = ['utm_source', 'utm_medium', 'utm_campaign']
      keys.forEach((k) => {
        const v = sp.get(k)
        if (v && !localStorage.getItem(k)) {
          localStorage.setItem(k, v)
        }
      })
    } catch { /* ignore storage errors */ }
  }, [sp])
  return null
}

const ScalingLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const [isDeviceDetected] = useAtom(isDeviceAtom)

  useScaling({
    deviceBreakpoints: {
      tablet: DeviceSize.Tablet.PORTRAIT,
      desktop: DeviceSize.Desktop.SMALL
    },
    scalingBreakpoints: SCALING_BREAKPOINTS
  })

  return isDeviceDetected ? children : <></>
}

export const Provider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <JotaiProvider>
      <Suspense fallback={null}>
        <UtmCapture />
      </Suspense>
      <ScalingLayout>{children}</ScalingLayout>
    </JotaiProvider>
  )
}

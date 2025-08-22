import { ReactNode } from 'react'
import { Footer } from '@modules/footer'
import { Header } from '@modules/header'

import '@styles/global.scss'

import localFont from 'next/font/local'
import { Provider } from '@service/provider'

const font = localFont({
  src: [
    {
      path: './fonts/Montserrat-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: './fonts/Montserrat-Medium.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: './fonts/Montserrat-SemiBold.woff2',
      weight: '600',
      style: 'normal'
    },
    {
      path: './fonts/Montserrat-Bold.woff2',
      weight: '700',
      style: 'normal'
    }
  ]
})

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={font.className}>
        <Provider>
          <div id="root">
            <Header />
            {children}
            <Footer />
          </div>

          <div id="modal-root" />
        </Provider>
      </body>
    </html>
  )
}

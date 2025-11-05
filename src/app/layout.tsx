import { ReactNode } from 'react'
import Script from 'next/script'
import { Footer } from '@modules/footer'
import { Header } from '@modules/header'
import { CookieBanner } from '@modules/cookieBanner'
import { InstallPrompt } from '@modules/installPrompt'

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
        <Script id="yandex-metrika" strategy="afterInteractive">{`(function(m,e,t,r,i,k,a){
  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
  m[i].l=1*new Date();
  for (var j = 0; j < document.scripts.length; j++) { if (document.scripts[j].src === r) { return; } }
  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
})(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=105126754', 'ym');
ym(105126754, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});`}</Script>

        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/105126754" style={{ position: 'absolute', left: '-9999px' }} alt="" />
          </div>
        </noscript>
        <Provider>
          <div id="root">
            <Header />
            {children}
            <Footer />
          </div>

          <div id="modal-root" />
          <CookieBanner />
          <InstallPrompt />
        </Provider>
      </body>
    </html>
  )
}

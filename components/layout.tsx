import Header from "./header"
import type { ReactChildren } from "react"
import Script from "next/script"

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-WMLR3PFFXE"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-WMLR3PFFXE');
        `}
      </Script>

      <Header />
      <main>{children}</main>
    </>
  )
}

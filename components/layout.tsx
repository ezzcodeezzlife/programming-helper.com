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
        id="Adsense-id"
        data-ad-client="ca-pub-8251732556629149"
        async
        strategy="beforeInteractive"
        onError={(e) => {
          console.error("Script failed to load", e)
        }}
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      />
      
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

      <div
        style={{
          backgroundColor: "#f5faff",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          paddingBottom: "1rem",
          borderRadius: "10px",
          border: "2px solid #f2f2ff",
          marginBottom: "30rem",
        }}
      >
        <main>{children}</main>
      </div>
    </>
  )
}

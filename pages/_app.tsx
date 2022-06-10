import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
import { withPasswordProtect } from "@storyofams/next-password-protect"
import "../styles/globals.css"
import "./styles.css"
import Script from "next/script"
import Head from "next/head"

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Script
        id="Adsense-id"
        data-ad-client="ca-pub-8251732556629149"
        async
        strategy="afterInteractive"
        onError={(e) => {
          console.error("Script failed to load", e)
        }}
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      />

      <Head>
      <meta name="propeller" content="16835aec6473836849046ebbbac20fbc"></meta>
      </Head>
      <Script
      strategy="beforeInteractive"
      onError={(e) => {
        console.error("Script failed to load", e)
      }}
      >
      {`<script>(function(s,u,z,p){s.src=u,s.setAttribute('data-zone',z),p.appendChild(s);})(document.createElement('script'),'https://inklinkor.com/tag.min.js',5150157,document.body||document.documentElement)</script> `}
      </Script>
      
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
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  )
}

// Before: export default App;
export default process.env.PASSWORD_PROTECT
  ? withPasswordProtect(App, {
      // Options go here (optional)
      loginApiUrl: "/api/login",
    })
  : App

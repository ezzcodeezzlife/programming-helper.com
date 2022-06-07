import Header from "./header"
import type { ReactChildren } from "react"
import Script from "next/script"

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />

      <div
        style={{
          backgroundColor: "#f5faff",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          paddingBottom: "1rem",
          borderRadius: "10px",
          border: "2px solid #f2f2ff",
        }}
      >
        <main>{children}</main>
      </div>
      <div>
        {/*  <Script id="show-banner" strategy="lazyOnload">
            {`var uid = '354526';var wid = '658604';var pop_tag = document.createElement('script');pop_tag.src='//cdn.popcash.net/show.js';document.body.appendChild(pop_tag);pop_tag.onerror = function() {pop_tag = document.createElement('script');pop_tag.src='//cdn2.popcash.net/show.js';document.body.appendChild(pop_tag)}; `}
           </Script>
         */}
      </div>
    </>
  )
}

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import Layout from "../components/layout"
import AccessDenied from "../components/access-denied"
import { NextScript } from "next/document"
import Select from "react-select"
import { NextSeo } from "next-seo"
import Head from "next/head"
import { signIn, signOut } from "next-auth/react"
import Script from "next/script"


export const Bottomtext = () => {
  return (
    <div className="bottom-text">
      <h2>From Text Description to SQL Syntax</h2>
      {/* Write three sentences about this tool  */}
      <p>
        Get SQL Syntax from text. Its easy and
        fast
      </p>
    </div>
  )
}

export default function translate() {
  const { data: session, status } = useSession()
  const loading = status === "loading"
  const [content, setContent] = useState("")
  const [textup, setTextup] = useState("")
  const [selectedOption, setSelectedOption] = useState()
  const [requestloading, setRequestloading] = useState(false)
  const [count, setCount] = useState(0)

  // Fetch content from protected route
  const fetchData = async () => {
    const res = await fetch("/api/examples/sql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ textup: textup, selectedOption: selectedOption }),
    })
      .then(
        (response) => response.json(),

        (error) => console.log("An error occurred.", error)
      )
      .then((res) => setContent(res.data.trim()))
      .catch((err) => {
        setContent(
          "Max 1000 characters. Please dont Spam requests. No Adult Content. Try again in a few seconds."
        )
        console.log(err)
      })
      .finally(() => setRequestloading(false))
  }

  const buttonPress = () => {
    
    if (textup === "") {
      alert("Please enter some code")
      return
    }

    setRequestloading(true)
    console.log("button pressed", textup)
    fetchData()
  }

  const buttonPressLogin = () => {
    signIn()
  }

  const handleChange = (selectedOption: any) => {
    setSelectedOption(selectedOption)
    console.log(`Option selected:`, selectedOption)
  }

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null

  // If no session exists, display access denied message
  if (!session) {
    return (
      <Layout>
        <Head>
          <title>From Text Description to SQL Syntax</title>
          <meta
            name="description"
            content="Generate function from description for any Programming Language"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="robots" content="INDEX" />
          <meta name="robots" content="FOLLOW" />
          <meta property="og:type" content="article" />

          <meta property="og:title" content="TITLE OF YOUR POST OR PAGE" />

          <meta
            property="og:description"
            content="DESCRIPTION OF PAGE CONTENT"
          />

          <meta property="og:url" content="PERMALINK" />

          <meta property="og:site_name" content="SITE NAME" />
        </Head>
        <h1>From Text Description to SQL Syntax:</h1>
        
        <p>
          <textarea
            value={textup}
            placeholder="Get all customers from Los Angeles between ages 30 and 40"
            onKeyDown={(e) => {
              if (e.key === "Tab") {
                e.preventDefault()
                // add tab to content
                setTextup(textup + "\t")
              }
            }}
            onChange={(e) => {
              setTextup(e.target.value)
              setCount(e.target.value.length)
            }}
          ></textarea>

          {count > 1000 ? (
            <p id="counter">Too much! +{count - 1000}</p>
          ) : (
            <p id="counter">{count}</p>
          )}
          <button onClick={buttonPressLogin}>Sign in to Generate SQL</button>
          {requestloading ? <p>Loading...</p> : <></>}

          <textarea
            placeholder="SELECT * FROM customers WHERE city = 'Los Angeles' AND age >= 30 AND age <= 40"
            value={content}
          ></textarea>
        </p>
        <span>AI Service - Results may vary</span>

        <Bottomtext />
      </Layout>
    )
  }

  // If session exists, display content
  return (
    <>
      <Head>
        <title>From Text Description to SQL Syntax</title>
        <meta name="description" content="Generate function from description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="INDEX" />
        <meta name="robots" content="FOLLOW" />
        <meta property="og:type" content="article" />

        <meta property="og:title" content="TITLE OF YOUR POST OR PAGE" />

        <meta property="og:description" content="DESCRIPTION OF PAGE CONTENT" />

        <meta property="og:url" content="PERMALINK" />

        <meta property="og:site_name" content="SITE NAME" />
      </Head>
      <NextSeo
        title="Generate function from description"
        description="Generate function from description"
        canonical="https://aiservice.vercel.app/generate-function"
        openGraph={{
          title: "Generate function from description",
          description: "Generate function from description",
          url: "https://aiservice.vercel.app/generate-function",
          site_name: "Generate function from description",
        }}
      />

      <Layout>
        <h1>From Text Description to SQL Syntax:</h1>
       
        <p>
          <textarea
            value={textup}
            placeholder="Get all customers from Los Angeles between ages 30 and 40"
            onKeyDown={(e) => {
              if (e.key === "Tab") {
                e.preventDefault()
                // add tab to content
                setTextup(textup + "\t")
              }
            }}
            onChange={(e) => {
              setTextup(e.target.value)
              setCount(e.target.value.length)
            }}
          ></textarea>

          {count > 1000 ? (
            <p id="counter">Too much! +{count - 1000}</p>
          ) : (
            <p id="counter">{count}</p>
          )}
          <button onClick={buttonPress}>Generate SQL Command</button>
          {requestloading ? <p>Loading...</p> : <></>}

          <textarea placeholder="SELECT * FROM customers WHERE city = 'Los Angeles' AND age >= 30 AND age <= 40" value={content}></textarea>
        </p>
        <span>AI Service - Results may vary</span>
      </Layout>
    </>
  )
}

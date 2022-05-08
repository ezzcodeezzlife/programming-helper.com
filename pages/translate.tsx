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

const options = [
  { value: "Python", label: "Python" },
  { value: "Javascript", label: "Javascript" },
  { value: "C++", label: "C++" },
  { value: "Go", label: "Go" },
  { value: "TypeScript", label: "TypeScript" },
  { value: "Rust", label: "Rust" },
  { value: "Java", label: "Java" },
  { value: "PHP", label: "PHP" },
  { value: "C", label: "C" },
  { value: "Swift", label: "Swift" },
  { value: "C#", label: "C#" },
  { value: "Elixir", label: "Elixir" },
  { value: "Haskell", label: "Haskell" },
  { value: "Scala", label: "Scala" },
  { value: "Kotlin", label: "Kotlin" },
  { value: "R", label: "R" },
  { value: "Ruby", label: "Ruby" },
]

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
    const res = await fetch("/api/examples/protected", {
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

  const copyToClip = () => {
    navigator.clipboard.writeText(content)
  }

  const buttonPress = () => {
    if (selectedOption === undefined) {
      alert("Please select a language")
      return
    }
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
          <title>Translate Programming Language</title>
          <meta
            name="description"
            content="Translate from any Language to any Programming Language"
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
        <h1>Translate to:</h1>
        <Select
          isSearchable={false}
          options={options}
          onChange={handleChange}
        />
        <p>
          <textarea
            value={textup}
            placeholder="console.log('Hello World')"
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
          <button onClick={buttonPressLogin}>Sign in to Translate</button>
          {requestloading ? <p>Loading...</p> : <></>}

          <textarea placeholder='print("test")' value={content}></textarea>
          <button style={{ backgroundColor: "grey" }} onClick={copyToClip}>
            Copy to Clipboard
          </button>
        </p>
        <span>AI Service - Results may vary</span>
      </Layout>
    )
  }

  // If session exists, display content
  return (
    <>
      <Head>
        <title>Translate Programming Language</title>
        <meta
          name="description"
          content="Translate from any Language to any Programming Language"
        />
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
        title="Translate Programming Language"
        description="Translate from any Language to any Programming Language"
        canonical="https://aiservice.vercel.app/translate"
        openGraph={{
          title: "Translate Programming Language",
          description:
            "Translate from any Language to any Programming Language",
          url: "https://aiservice.vercel.app/translate",
          site_name: "Translate from any Language to any Programming Language",
        }}
      />

      <Layout>
        <h1>Translate to:</h1>
        <Select
          isSearchable={false}
          placeholder="Select Language ..."
          options={options}
          onChange={handleChange}
        />
        <p>
          <textarea
            value={textup}
            placeholder="console.log('Hello World')"
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
          <button onClick={buttonPress}>Translate</button>
          {requestloading ? <p>Loading...</p> : <></>}

          <textarea placeholder='print("test")' value={content}></textarea>
          <button style={{ backgroundColor: "grey" }} onClick={copyToClip}>
            Copy to Clipboard
          </button>
        </p>
        <span>AI Service - Results may vary</span>
      </Layout>
    </>
  )
}

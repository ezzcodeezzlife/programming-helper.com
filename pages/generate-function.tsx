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
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition"

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

export const Bottomtext = () => {
  return (
    <div className="bottom-text">
      <h2>Generate a fuction just by describing what is should do</h2>
      {/* Write three sentences about this tool  */}
      <p>
        Generate a function just by describing what is should do. Its easy and
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

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition()

  if (!browserSupportsSpeechRecognition) {
    console.log(
      "Sorry, your browser doesn't support speech recognition. Try Chrome or Firefox!"
    )
  }

  // Fetch content from protected route
  const fetchData = async () => {
    const res = await fetch("/api/examples/generate-function", {
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

  const copyToClip = () => {
    navigator.clipboard.writeText(content)
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
          <title>Generate function from description</title>
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
        <h1>Create function from description:</h1>
        <Select
          isSearchable={false}
          options={options}
          onChange={handleChange}
        />
        <p>
          <textarea
            value={textup}
            placeholder="Add two numbers and return them"
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
          <button onClick={buttonPressLogin}>Sign in to Generate</button>
          {requestloading ? <p>Loading...</p> : <></>}

          <textarea
            placeholder="function add(a, b){ return a + b }"
            value={content}
          ></textarea>
          <button style={{ backgroundColor: "grey" }} onClick={copyToClip}>
            Copy to Clipboard
          </button>
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
        <title>Generate function from description</title>
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
        <h1>Create function from description:</h1>
        <Select
          isSearchable={false}
          placeholder="Select Language ..."
          options={options}
          onChange={handleChange}
        />
        <p>
          <textarea
            defaultValue={textup + "" + transcript}
            placeholder="Add two numbers and return them"
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

          {/* 

<div>
      <p>Use Voice: {listening ? (<> <button style={{backgroundColor:"#e9e9e9"}}   onClick={SpeechRecognition.stopListening}>⏹️</button> </> ) : <button style={{backgroundColor:"#e9e9e9"}} onClick={SpeechRecognition.startListening}> 🔴</button>}
      
      <button style={{backgroundColor:"#e9e9e9", color:"black"}} onClick={resetTranscript}>Reset</button>
      </p>
      
      
      
       <p>{transcript}</p> 
    </div>
*/}

          <button onClick={buttonPress}>Generate Function</button>
          {requestloading ? <p>Loading...</p> : <></>}

          <textarea
            placeholder="function add(a, b){ return a + b }"
            value={content}
          ></textarea>
          <button style={{ backgroundColor: "grey" }} onClick={copyToClip}>
            Copy to Clipboard
          </button>

          <button style={{ backgroundColor: "grey" }} onClick={copyToClip}>
            Copy to Clipboard
          </button>
        </p>
        <span>AI Service - Results may vary</span>
      </Layout>
    </>
  )
}

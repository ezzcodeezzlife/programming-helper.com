import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import Layout from "../components/layout"
import AccessDenied from "../components/access-denied"
import { NextScript } from "next/document"
import Select from "react-select"
import { NextSeo } from "next-seo"

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
        setContent("Max 1000 characters. Please dont Spam requests. No Adult Content. Try again in a few seconds.")
        console.log(err)
      })
      .finally(() => setRequestloading(false))
  }

  const buttonPress = () => {
    setRequestloading(true)
    console.log("button pressed", textup)
    fetchData()
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
        <AccessDenied />
      </Layout>
    )
  }

  // If session exists, display content
  return (
    <>
      <NextSeo
        openGraph={{
          title: "Translate Programming Language",
          description:
            "Translate from any Language to any Programming Language",
          url: "/translate",
          site_name: "Translate",
        }}
      />

      <Layout>
        <h1>Translate to:</h1>
        <Select options={options} onChange={handleChange} />
        <p>
          <textarea
            value={textup}
            placeholder="Type or paste code here"
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
          
          {count > 1000 ? (<p id="counter">Too much! +{count - 1000}</p>):(<p id="counter">{count}</p>)}
          <button onClick={buttonPress}>Translate</button>
          {requestloading ? <p>Loading...</p> : <></>}

          <textarea value={content}></textarea>
        </p>
        <span>AI Service - Results may vary</span>
      </Layout>
    </>
  )
}

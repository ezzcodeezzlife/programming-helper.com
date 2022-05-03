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
      <h2>From Code to Explanation</h2>
      {/* Write three sentences about this tool  */}
      <p>From Code to Explanation. Its easy and fast.</p>
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
    const res = await fetch("/api/examples/code-to-explanation", {
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
          <title>From Code to Explanation</title>
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
        <h1>From Code to Explanation:</h1>

        <p>
          <textarea
            value={textup}
            placeholder="function quicksort(array) {
              if (array.length <= 1) {
                return array;
              }
            
              var pivot = array[0];
              
              var left = []; 
              var right = [];
            
              for (var i = 1; i < array.length; i++) {
                array[i] < pivot ? left.push(array[i]) : right.push(array[i]);
              }
            
              return quicksort(left).concat(pivot, quicksort(right));
            };"
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
          <button onClick={buttonPressLogin}>
            Sign in to Generate Explanation
          </button>
          {requestloading ? <p>Loading...</p> : <></>}

          <textarea
            placeholder="This function is a quicksort algorithm. The quicksort algorithm is a sorting algorithm that sorts an array by selecting a pivot element from the array and partitioning the other elements into two subarrays, one of which contains elements less than the pivot and the other of which contains elements greater than the pivot. The algorithm then sorts the subarrays and combines them to produce the sorted array."
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
        <title>From Code to Explanation</title>
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
        <h1>From Code to Explanation:</h1>

        <p>
          <textarea
            value={textup}
            placeholder="function quicksort(array) {
              if (array.length <= 1) {
                return array;
              }
            
              var pivot = array[0];
              
              var left = []; 
              var right = [];
            
              for (var i = 1; i < array.length; i++) {
                array[i] < pivot ? left.push(array[i]) : right.push(array[i]);
              }
            
              return quicksort(left).concat(pivot, quicksort(right));
            };"
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
          <button onClick={buttonPress}>Generate Explanation</button>
          {requestloading ? <p>Loading...</p> : <></>}

          <textarea
            placeholder="This function is a quicksort algorithm. The quicksort algorithm is a sorting algorithm that sorts an array by selecting a pivot element from the array and partitioning the other elements into two subarrays, one of which contains elements less than the pivot and the other of which contains elements greater than the pivot. The algorithm then sorts the subarrays and combines them to produce the sorted array."
            value={content}
          ></textarea>
        </p>
        <span>AI Service - Results may vary</span>
      </Layout>
    </>
  )
}
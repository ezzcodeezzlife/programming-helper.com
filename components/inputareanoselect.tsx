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
import Seocomponent from "./seocomponent"
import Typed from "react-typed"

export default function translate(props: any) {
  const { data: session, status } = useSession()
  const loading = status === "loading"
  const [content, setContent] = useState("")
  const [textup, setTextup] = useState("")
  const [selectedOption, setSelectedOption] = useState()
  const [requestloading, setRequestloading] = useState(false)
  const [count, setCount] = useState(0)
  const [copytext, setCopytext] = useState("Copy to Clipboard")

  // Fetch content from protected route
  const fetchData = async () => {
    const res = await fetch("/api/examples/" + props.apipath, {
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

  const copyToClip = () => {
    navigator.clipboard.writeText(content)
    setCopytext("Copied!")
    setTimeout(() => {
      setCopytext("Copy to Clipboard")
    }, 1000)
  }

  useEffect(() => {
    // Update the document title using the browser API

    if (localStorage.getItem(props.apipath)) {
      setTextup(localStorage.getItem(props.apipath) || "")
    }
  })

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null

  return (
    <>
      <Seocomponent title={props.title} apipath={props.apipath}></Seocomponent>

      <Layout>
        <div className="flex flex-col my-auto items-center">
          <div className="xl:w-1/2 px-4 my-12 self-center">
            <h1 className="p-4 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {props.title}
            </h1>

            <textarea
              value={textup + ""}
              placeholder={props.placeholdertop}
              onKeyDown={(e) => {
                if (e.key === "Tab") {
                  e.preventDefault()
                  // add tab to content
                  setTextup(textup + "\t")
                }
              }}
              onChange={(e) => {
                setTextup(e.target.value)
                localStorage.setItem(props.apipath, e.target.value)
                setCount(e.target.value.length)
              }}
            ></textarea>
            <p>
              {count > 1000 ? (
                <p id="counter">Too much! +{count - 1000}</p>
              ) : (
                <p id="counter">{count}</p>
              )}

              {/*
<div>
      <p>Use Voice: {listening ? (<> <button style={{backgroundColor:"#e9e9e9"}}   onClick={(event) =>  SpeechRecognition.stopListening()}>⏹️</button> </> ) : <button style={{backgroundColor:"#e9e9e9"}} onClick={(event) => SpeechRecognition.startListening()}> 🔴</button>}
      
      <button style={{backgroundColor:"#e9e9e9", color:"black"}} onClick={(event) => resetTranscript}>Reset</button>
      </p>
      
       <p>{transcript}</p> 
    </div>

*/}
              {!session ? (
                <button
                  className="m-4 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                  onClick={buttonPressLogin}
                >
                  Sign in - {props.buttontext}
                </button>
              ) : (
                <button
                  className="m-4 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                  onClick={buttonPress}
                >
                  {" "}
                  {requestloading ? (
                    <>
                      Loading
                      <Typed
                        strings={["..."]}
                        typeSpeed={50}
                        backSpeed={25}
                        loop
                      />
                    </>
                  ) : (
                    <>{props.buttontext}</>
                  )}{" "}
                </button>
              )}

              <textarea
                readOnly
                placeholder={props.placeholderbot}
                value={content}
              ></textarea>
              <button
                className="m-4 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4  hover:border-blue-500 rounded"
                style={{ backgroundColor: "grey" }}
                onClick={copyToClip}
              >
                {copytext}
              </button>
            </p>
            {/*
            <span>AI Service - Results may vary</span>
          */}
          </div>
        </div>
      </Layout>
    </>
  )
}

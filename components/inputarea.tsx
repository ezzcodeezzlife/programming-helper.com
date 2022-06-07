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
import {
  AnnotationIcon,
  GlobeAltIcon,
  LightningBoltIcon,
  ScaleIcon,
} from "@heroicons/react/outline"
import Seocomponent from "./seocomponent"
import Typed from "react-typed"
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react"

const features = [
  {
    name: "Function from Description",
    description:
      "Generate a function just by describing what is needs to do. Choose of many programming languages.",
    icon: GlobeAltIcon,
    link: "/generate-function",
  },
  {
    name: "Code to Explanation",
    description: "Any code explained in plain english",
    icon: ScaleIcon,
    link: "/code-to-explanation",
  },
  {
    name: "Fix invalid Code",
    description:
      "To spot a missing character somewhere can be frustrating. This feature will help you to fix it.",
    icon: LightningBoltIcon,
    link: "/fix-invalid-code",
  },
  {
    name: "Translate Languages",
    description: "Translate code to any programming language",
    icon: AnnotationIcon,
    link: "/translate",
  },
  {
    name: "Class from Description",
    description:
      "Generate a class just by describing what is needs to do. Choose of many programming languages.",
    icon: AnnotationIcon,
    link: "/class-from-description",
  },
  {
    name: "Get Language from Code",
    description: "Get the programming language from a code.",
    icon: AnnotationIcon,
    link: "/language-from-code",
  },
  {
    name: "Function from Docstring",
    description: "Provide a docstring to generate the actual function.",
    icon: AnnotationIcon,
    link: "/docstring",
  },
  {
    name: "Regex from Description",
    description: 'Create a regex from a describtion like "check for email".',
    icon: AnnotationIcon,
    link: "/regex",
  },
  {
    name: "Regex to Explanation",
    description: "Create a plain english explanation from a regex.",
    icon: AnnotationIcon,
    link: "/regex-explanation",
  },
  {
    name: "Linux Command",
    description: "Get the linux commend from a description. ",
    icon: AnnotationIcon,
    link: "/linux",
  },
  {
    name: "Get time complexity",
    description: "",
    icon: AnnotationIcon,
    link: "/time-complexity",
  },
  {
    name: "Git Command from Description",
    description: "Find the Git Command you are looking for from a description.",
    icon: AnnotationIcon,
    link: "/git",
  },
  {
    name: "Text Description to SQL Command",
    description: "Create a SQL command from a description.",
    icon: AnnotationIcon,
    link: "/text-to-sql-syntax",
  },
  {
    name: "Generate HTML from Description",
    description: "",
    icon: AnnotationIcon,
    link: "/generate-html-from-description",
  },
  {
    name: "Generate CSS from Description",
    description: "",
    icon: AnnotationIcon,
    link: "/css-from-description",
  },
  {
    name: "Meta Tags from Description",
    description: "",
    icon: AnnotationIcon,
    link: "/meta",
  },
]
//ff
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
  { value: "Dart", label: "Dart" },
]

export default function Inputarea(props: any) {
  const { data: session, status } = useSession()

  const loading = status === "loading"
  const [content, setContent] = useState("")
  const [textup, setTextup] = useState("")
  const [selectedOption, setSelectedOption] = useState()
  const [requestloading, setRequestloading] = useState(false)
  const [count, setCount] = useState(0)
  const [copytext, setCopytext] = useState("Copy to Clipboard")

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
    const res = await fetch("/api/examples/" + props.apipath, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        textup: textup + "" + transcript,
        selectedOption: selectedOption,
      }),
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
    setCopytext("Copied!")
    setTimeout(() => {
      setCopytext("Copy to Clipboard")
    }, 1000)
  }

  const buttonPressLogin = () => {
    signIn()
  }

  const handleChange = (selectedOption: any) => {
    setSelectedOption(selectedOption)
    localStorage.setItem("language", JSON.stringify(selectedOption))
    console.log(`Option selected:`, selectedOption)
  }

  useEffect(() => {
    // Update the document title using the browser API

    if (localStorage.getItem(props.apipath)) {
      setTextup(localStorage.getItem(props.apipath) || "")
    }
    if (localStorage.getItem("language")) {
      const selection = localStorage.getItem("language") || ""
      setSelectedOption(JSON.parse(selection))
    }
  }, [])

  // If no session exists, display access denied message

  // If session exists, display content
  return (
    <>
      <Seocomponent title={props.title} apipath={props.apipath}></Seocomponent>

      <Layout>
        <div className="flex flex-col my-auto items-center ">
          <div className="xl:w-1/2 px-4 my-12 self-center">
            <h1 className="p-4 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {props.title}
            </h1>
            <Select
              className="my-4 mr-4 xl:w-1/3"
              isSearchable={false}
              placeholder={
                selectedOption ? selectedOption["value"] : "Select language.."
              }
              options={options}
              onChange={handleChange}
            />

            <textarea
              value={textup + "" + transcript}
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

              {/*
              <Editor
              className="border-grey border-2 p-1 rounded-lg"
              height="30vh"
              theme="vs"
              defaultLanguage="javascript"
              defaultValue={props.placeholderbot}
              value={content}
            />
            */}
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

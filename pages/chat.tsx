// @ts-nocheck
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
import Inputarea from "../components/inputarea"
import Features from "../components/features"
import Recent from "../components/recent"
import { Alert } from "react-bootstrap"
import styles from "../components/header.module.css"

//create your forceUpdate hook
function useForceUpdate() {
  const [value, setValue] = useState(0) // integer state
  return () => setValue((value) => value + 1) // update state to force render
  // An function that increment 👆🏻 the previous state like here
  // is better than directly setting `value + 1`
}

export default function translate() {
  const { data: session, status } = useSession()
  const forceUpdate = useForceUpdate()

  const loading = status === "loading"

  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([
    {
      message: "Hello",
      user: "0",
    },
    {
      message: "Hi there I have a question about programming:",
      user: "1",
    },
  ])

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    if (input.length < 1) {
      alert("Please enter a message")
      return
    }
    setInput("")
    //@ts-ignore
    const copymes = messages
    //@ts-ignore
    copymes.push({
      //@ts-ignore
      message: input,
      //@ts-ignore
      user: "1",
      //@ts-ignore
    })
    setMessages(copymes)
    forceUpdate()
    console.log(copymes)
    console.log(input)

    if (session) {
      console.log(session)
    }

    console.log("form submitted ✅")
    fetch("/api/examples/chat", {
      method: "POSt",
      body: JSON.stringify({
        input: input,
      }),
    }).then(async (resdata) => {
      const data = await resdata.json()
      console.log(data)

      const arr = ["Hey there", "Just sign in to chat with me", "Login to chat"]

      copymes.push({
        //@ts-ignore
        message: data.data
          ? data.data
          : data.message,
        //@ts-ignore
        user: "0",
        //@ts-ignore
      })
      setMessages(copymes)
      forceUpdate()
    })
  }

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null

  // If no session exists, display access denied message

  // If session exists, display content
  return (
    <>
      {/*@ts-ignore*/}
      <center>
        <div className=" flex-1 pb-16  justify-between flex flex-col h-screen xl:w-2/3 2xl:w-1/3">
          <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
            <div className="relative flex items-center space-x-4 pl-4">
              <div className="relative">
                <span className="absolute text-green-500 right-0 bottom-0">
                  <svg width="20" height="20">
                    <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                  </svg>
                </span>
                <img
                  src="https://images.unsplash.com/photo-1535378620166-273708d44e4c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1257&q=80"
                  alt=""
                  className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
                ></img>
              </div>
              <div className="flex flex-col leading-tight">
                <div className="text-2xl mt-1 flex items-center">
                  <span className="mr-3 text-gray-800 font-bold tracking-wide">
                    Programming Helper
                  </span>
                </div>
                <span className="text-lg text-indigo-600 tracking-wide">
                  Automated AI Agent
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2"></div>
          </div>
          <div
            id="messages"
            className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
          >
            {messages.map((message, index) => (
              <>
                {message.user === "0" ? (
                  <div className="chat-message">
                    <div className="flex items-end">
                      <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                        <div>
                          <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-blue-600 text-white">
                            {message.message}
                          </span>
                        </div>
                      </div>

                      {/*@ts-ignore*/}

                      <img
                        src="https://images.unsplash.com/photo-1535378620166-273708d44e4c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1257&q=80"
                        alt="My profile"
                        className="w-6 h-6 rounded-full order-1"
                      ></img>
                    </div>
                  </div>
                ) : (
                  <>
                    {" "}
                    <div className="chat-message">
                      <div className="flex items-end justify-end">
                        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                          <div>
                            <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-gray-300 text-gray-600 ">
                              {message.message}
                            </span>
                          </div>
                        </div>

                        {session ? (
                          <>
                            <img
                              src={session.user.image}
                              alt="My profile"
                              className="w-6 h-6 rounded-full order-2"
                            ></img>
                          </>
                        ) : (
                          <img
                            src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                            alt="My profile"
                            className="w-6 h-6 rounded-full order-2"
                          ></img>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </>
            ))}
          </div>
          <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
            <div className="relative ">
            <center>
              <form className="" onSubmit={handleSubmit}>
                <input
                className=" bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="text"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Write your message! ..."
                  className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
                />
                <span></span>

                
                <input 
                  type="text"
                  className="hidden"
                  id="first"
                  name="first"
                  value=""
                  onChange={(event) => setInput(event.target.value)}
                  autoComplete="off"
                />
              
                <button className="hidden" type="submit">
                  Submit
                </button>
              </form>
              </center>
              <div className="absolute right-0 items-center inset-y-0  sm:flex">
               
                <button
                  onClick={handleSubmit}
                  type="button"
                  className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
                >
                  {session ? <span className="font-bold">Send</span> : <></>}

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-6 w-6 ml-2 transform rotate-90"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {!session && (
                <>
                  <a
                    href={`/api/auth/signin`}
                    className="text-white p-3 m-2 rounded-md bg-blue-600 hover:text-gray-100"
                    onClick={(e) => {
                      e.preventDefault()
                      signIn()
                    }}
                  >
                    Sign In
                  </a>
                </>
              )}
        {/*@ts-ignore*/}
      </center>

      <Features></Features>
    </>
  )
}

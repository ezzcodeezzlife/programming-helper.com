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

export default function translate() {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null

  // If no session exists, display access denied message

  // If session exists, display content
  return (
    <>
      <Inputarea
        title="Function from Docstring"
        placeholdertop={`/**
        * Add two numbers.
        * @param  {Number} a     first number
        * @param  {Number} b     second number
        * @return {Number}       first and second number added
        */
                   `}
        placeholderbot={`function addNumbers(a: number, b: number): number { 
          return a + b; 
      }
                `}
        buttontext="Generate Function from Docstring"
        apipath="docstring"
      ></Inputarea>

      <Features></Features>
      <Recent></Recent>
    </>
  )
}

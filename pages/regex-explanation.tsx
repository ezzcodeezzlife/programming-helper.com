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
import Inputareanoselect from "../components/inputareanoselect"
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
      <Inputareanoselect
        title="Regex to explanation"
        placeholdertop=" /^([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4})$/i;"
        placeholderbot={`The Regex is used to match an email address. The email address must start with a lowercase letter or a number, followed by one or more characters (including periods, underscores, and/or hyphens), followed by an @ symbol, followed by one or more lowercase letters or numbers (again, including periods, underscores, and/or hyphens), followed by a period, followed by two to four lowercase letters. The i at the end makes the match case-insensitive. `}
        buttontext="Get Regex explanation"
        apipath="regexexp"
      ></Inputareanoselect>

      <Features></Features>
      <Recent></Recent>
    </>
  )
}

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
        title="Class from description:"
        placeholdertop="a vector class"
        placeholderbot={`class Vector(object): 
        def __init__(self,x,y): 
        self.x = x 
        self.y = y`}
        buttontext="Generate Class from description"
        apipath="class"
      ></Inputarea>

      <Features></Features>
      <Recent></Recent>
    </>
  )
}

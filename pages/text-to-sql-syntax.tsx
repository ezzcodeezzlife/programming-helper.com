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
import Inputareanoselect from '../components/inputareanoselect'
import Features from "../components/features"

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
        title="From Text Description to SQL Syntax"
        placeholdertop="Get all customers from Los Angeles between ages 30 and 40"
        placeholderbot={`SELECT * FROM customers WHERE city = 'Los Angeles' AND age >= 30 AND age <= 40`}
        buttontext="Get SQL Syntax"
        apipath="sql"
      ></Inputareanoselect>
       
      <Features></Features>
    </>
  )
}

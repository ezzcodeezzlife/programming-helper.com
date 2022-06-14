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
        title="Get Test for code"
        placeholdertop={`const englishCode = "en-US";
const spanishCode = "es-ES";
function getAboutUsLink(language){
  switch (language.toLowerCase()){
      case englishCode.toLowerCase():
          return '/about-us';
      case spanishCode.toLowerCase():
          return '/acerca-de';
      }
      return '';
}`}
        placeholderbot={`test("Returns about-us for english language", () => {
          expect(getAboutUsLink("en-US")).toBe("/about-us");
});`}
        buttontext="Get test for code"
        apipath="tests"
      ></Inputareanoselect>

      <Features></Features>
      <Recent></Recent>
    </>
  )
}

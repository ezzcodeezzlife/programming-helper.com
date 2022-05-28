import React, { Component } from "react"
import Layout from "../components/layout"
import Link from "next/link"
import { FaGithub, FaReadme, FaDonate } from "react-icons/fa"

export default function IndexPage() {
  return (
    <Layout>
      <>
        <h1>Home</h1>
        <p>Contact: appsplosion.help@gmail.com</p>

        <FaGithub />
        <span>&ensp;</span>
        <Link href="https://github.com/ezzcodeezzlife/openaiwebsite">
          GitHub
        </Link>

        <br></br>
        <FaReadme />
        <span>&ensp;</span>
        <Link href="https://homepage-appsplosion.herokuapp.com/privacypolicy">
          Privacy Policy
        </Link>

        <br></br>
        <FaDonate />
        <span>&ensp;</span>
        <Link href="https://www.paypal.com/donate/?hosted_button_id=GDCZM8ZTUQCDE">
          Donate
        </Link>

        
        

      </>
    </Layout>
  )
}


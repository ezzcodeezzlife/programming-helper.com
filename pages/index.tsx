import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"

/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react"
import { Popover, Transition } from "@headlessui/react"
import { MenuIcon, XIcon } from "@heroicons/react/outline"
import Script from "next/script"
import {
  AnnotationIcon,
  GlobeAltIcon,
  LightningBoltIcon,
  ScaleIcon,
} from "@heroicons/react/outline"

import Typed from "react-typed"
import FeaturesHero from "../components/featuresHero"
import Seocomponent from "../components/seocomponent"
import RecentSingle from "../components/recentSingle"

// @ts-ignore
import AdSense from "react-adsense"

const navigation = [
  { name: "Features", href: "#features" },
  { name: "Chat", href: "/chat" },
  { name: "GitHub", href: "https://github.com/ezzcodeezzlife/openaiwebsite" },
  {
    name: "Privacy Policy",
    href: "https://homepage-appsplosion.herokuapp.com/privacypolicy",
  },
]

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
    description: 'Create a regex from a description like "check for email".',
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
import Logo from "./logo.svg"
import { NextScript } from "next/document"

export default function Example() {
  return (
    <>
      <Seocomponent
        title="Generate Code just by typing a text description. AI will help you to generate the code in a few seconds."
        apipath=""
      ></Seocomponent>
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>

            <Popover>
              <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
                <nav
                  className="relative flex items-center justify-between sm:h-10 lg:justify-start"
                  aria-label="Global"
                >
                  <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                    <div className="flex items-center justify-between w-full md:w-auto">
                      <a href="#">
                        <span className="sr-only">Workflow</span>
                        <img
                          alt="Workflow"
                          className="h-8 w-auto sm:h-10"
                          src="https://www.svgrepo.com/show/68023/logo.svg"
                        />
                      </a>
                      <div className="-mr-2 flex items-center md:hidden">
                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                          <span className="sr-only">Open main menu</span>
                          <MenuIcon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="font-medium text-gray-500 hover:text-gray-900"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </nav>
              </div>

              <Transition
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Popover.Panel
                  focus
                  className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
                >
                  <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <div className="px-5 pt-4 flex items-center justify-between">
                      <div>
                        <img
                          className="h-8 w-auto"
                          src="https://www.svgrepo.com/show/68023/logo.svg"
                          alt="logo"
                        />
                      </div>
                      <div className="-mr-2">
                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                          <span className="sr-only">Close main menu</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                      </div>
                    </div>
                    <div className="px-2 pt-2 pb-3 space-y-1">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                    {/* 
                    <a
                      href="#"
                      className="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100"
                    >
                      Log in
                    </a>
                    */}
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>

            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">
                    Code faster with the help of
                  </span>{" "}
                  <span className="block text-indigo-600 xl:inline"> AI</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Generate Code just by typing a text description. AI will help
                  you to generate the code in a few seconds. Plus its free.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <a
                      href="#features"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                    >
                      Get started
                    </a>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <a
                      href="/generate-function"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                    >
                      Try it
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1612&q=80"
            alt=""
          />
        </div>
      </div>

      <div className="pt-16	">
        <div id="features" className="pt-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
                Feauture Preview
              </h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-indigo-600 sm:text-4xl">
                Generate&#160;
                <Typed
                  className="text-indigo-400"
                  strings={[
                    "Code from a text description",
                    "SQL from a text description",
                    "an explanation for your code",
                    "Docstring from Code",
                    "Regex from a text description",
                    "HTML from a description",
                    "Linux command from a description",
                  ]}
                  typeSpeed={50}
                  backSpeed={25}
                  loop
                />
              </p>

              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                More than just a code generator. A tool that helps you with a
                wide range of tasks. All in one place.
              </p>
            </div>

            <FeaturesHero></FeaturesHero>

            <div className="mt-12 overflow-hidden rounded-sm pt-6">
              <AdSense.Google
                client="ca-pub-8251732556629149"
                slot="6693148006"
                //style={{ display: 'block'}}
                layout="display"
                format="auto"
              />
            </div>
          </div>
        </div>
      </div>
      <script
        async
        src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      ></script>

      <div className="bg-gray-50 m-6 my-14	rounded-xl">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Question about programming?</span>
            <span className="block text-indigo-600">
              Chat with personal AI assistant
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href="/chat"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Get chatting
              </a>
            </div>
          </div>
        </div>
      </div>

      <RecentSingle></RecentSingle>
    </>
  )
}

export async function getServerSideProps(context: any) {
  return {
    props: {}, // will be passed to the page component as props
  }
}

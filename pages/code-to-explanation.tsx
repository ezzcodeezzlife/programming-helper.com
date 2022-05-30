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
import { AnnotationIcon, GlobeAltIcon, LightningBoltIcon, ScaleIcon } from '@heroicons/react/outline'

const features = [
  {
    name: 'Function from Description',
    description:
      'Generate a function just by describing what is needs to do. Choose of many programming languages.',
    icon: GlobeAltIcon,
    link: '/generate-function',
  },
  {
    name: 'Code to Explanation',
    description:
      'Any code explained in plain english',
    icon: ScaleIcon,
    link: '/code-to-explanation',
  },
  {
    name: 'Fix invalid Code',
    description:
      'To spot a missing character somewhere can be frustrating. This feature will help you to fix it.',
    icon: LightningBoltIcon,
    link: '/fix-invalid-code',
  },
  {
    name: 'Translate Languages',
    description:
      'Translate code to any programming language',
    icon: AnnotationIcon,
    link: '/translate',
  },
  {
    name: 'Class from Description',
    description:
      'Generate a class just by describing what is needs to do. Choose of many programming languages.',
    icon: AnnotationIcon,
    link: '/class-from-description',
  },
  {
    name: 'Get Language from Code',
    description:
      'Get the programming language from a code.',
    icon: AnnotationIcon,
    link: '/language-from-code',
  },
  {
    name: 'Function from Docstring',
    description:
      'Provide a docstring to generate the actual function.',
    icon: AnnotationIcon,
    link: '/docstring',
  },
  {
    name: 'Regex from Description',
    description:
      'Create a regex from a describtion like "check for email".',
    icon: AnnotationIcon,
    link: '/regex',
  },
  {
    name: 'Regex to Explanation',
    description:
      'Create a plain english explanation from a regex.',
    icon: AnnotationIcon,
    link: '/regex-explanation',
  },
  {
    name: 'Linux Command',
    description:
      'Get the linux commend from a description. ',
    icon: AnnotationIcon,
    link: '/linux',
  },
  {
    name: 'Get time complexity',
    description:
      '',
    icon: AnnotationIcon,
    link: '/time-complexity',
  },
  {
    name: 'Git Command from Description',
    description:
      'Find the Git Command you are looking for from a description.',
    icon: AnnotationIcon,
    link: '/git',
  },
  {
    name: 'Text Description to SQL Command',
    description:
      'Create a SQL command from a description.',
    icon: AnnotationIcon,
    link: '/text-to-sql-syntax',
  },
  {
    name: 'Generate HTML from Description',
    description:
      '',
    icon: AnnotationIcon,
    link: '/generate-html-from-description',
  },
  {
    name: 'Generate CSS from Description',
    description:
      '',
    icon: AnnotationIcon,
    link: '/css-from-description',
  },
  {
    name: 'Meta Tags from Description',
    description:
      '',
    icon: AnnotationIcon,
    link: '/meta',
  }
  
]

export default function translate() {
  const { data: session, status } = useSession()
  const loading = status === "loading"
  const [content, setContent] = useState("")
  const [textup, setTextup] = useState("")
  const [selectedOption, setSelectedOption] = useState()
  const [requestloading, setRequestloading] = useState(false)
  const [count, setCount] = useState(0)

  // Fetch content from protected route
  const fetchData = async () => {
    const res = await fetch("/api/examples/code-to-explanation", {
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

  const copyToClip = () => {
    navigator.clipboard.writeText(content)
  }

  const buttonPressLogin = () => {
    signIn()
  }

  const handleChange = (selectedOption: any) => {
    setSelectedOption(selectedOption)
    console.log(`Option selected:`, selectedOption)
  }

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null

  // If session exists, display content
  return (
    <>
      <Head>
        <title>From Code to Explanation</title>
        <meta name="description" content="Generate function from description" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="INDEX" />
        <meta name="robots" content="FOLLOW" />
        <meta property="og:type" content="article" />

        <meta property="og:title" content="TITLE OF YOUR POST OR PAGE" />

        <meta property="og:description" content="DESCRIPTION OF PAGE CONTENT" />

        <meta property="og:url" content="PERMALINK" />

        <meta property="og:site_name" content="SITE NAME" />
      </Head>
      <NextSeo
        title="Generate function from description"
        description="Generate function from description"
        canonical="https://aiservice.vercel.app/generate-function"
        openGraph={{
          title: "Generate function from description",
          description: "Generate function from description",
          url: "https://aiservice.vercel.app/generate-function",
          site_name: "Generate function from description",
        }}
      />

      <Layout>
      <div className="flex flex-col my-auto items-center ">
      
      <div className="xl:w-1/2 px-4 my-12 self-center">
      <h1 className="p-4 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">Explain code:</h1>

        <p>
          <textarea
            value={textup}
            placeholder={`function quicksort(array) { 
              if (array.length <= 1) {
                return array;
              }
            
              var pivot = array[0];
              
              var left = []; 
              var right = [];
            
              for (var i = 1; i < array.length; i++) {
                array[i] < pivot ? left.push(array[i]) : right.push(array[i]);
              }
            
              return quicksort(left).concat(pivot, quicksort(right));
            };`}
            onKeyDown={(e) => {
              if (e.key === "Tab") {
                e.preventDefault()
                // add tab to content
                setTextup(textup + "\t")
              }
            }}
            onChange={(e) => {
              setTextup(e.target.value)
              setCount(e.target.value.length)
            }}
          ></textarea>

          {count > 1000 ? (
            <p id="counter">Too much! +{count - 1000}</p>
          ) : (
            <p id="counter">{count}</p>
          )}
           {!session ? (<button className="m-4 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={buttonPressLogin}>Sign in to Explain Code</button>) : (<button className="m-4 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={buttonPress}>Explain Code</button>)}
          
          {requestloading ? (<svg role="status" className="m-2 w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
</svg>) : <></>}


          <textarea
            placeholder="This function is a quicksort algorithm. The quicksort algorithm is a sorting algorithm that sorts an array by selecting a pivot element from the array and partitioning the other elements into two subarrays, one of which contains elements less than the pivot and the other of which contains elements greater than the pivot. The algorithm then sorts the subarrays and combines them to produce the sorted array."
            value={content}
          ></textarea>

<button className="m-4 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4  hover:border-blue-500 rounded"style={{ backgroundColor: "grey" }} onClick={copyToClip}>
            Copy to Clipboard
          </button>
        </p>
        <span>AI Service - Results may vary</span>

        </div>
        </div>
      </Layout>

      <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">more features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
             Choose from a variety of different tools 
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Different areas are Programming, Web, Database and more Helper features.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <a href={feature.link}>
              <div key={feature.name} className="relative  hover:bg-slate-100 rounded-md py-2">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
              </div>
              </a>
            ))}
          </dl>
        </div>
      </div>
    </div>

    </>
  )
}

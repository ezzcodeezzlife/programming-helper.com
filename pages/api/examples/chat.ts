// This is an example of to protect an API route
import { getSession } from "next-auth/react"
import type { NextApiRequest, NextApiResponse } from "next"
import rateLimit from "../../../utils/rate-limit"
import { env } from "process"

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
})

const { Configuration, OpenAIApi } = require("openai")

const configuration = new Configuration({
  apiKey: env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await limiter.check(res, 15, "CACHE_TOKEN") // 8 requests per minute

  const session = await getSession({ req })

  //console.log(req.body)
  //console.log(req.body.textup)
  //console.log(req.body.selectedOption.value)

  if (req.body.input > 1000) {
    res.status(400).json({
      message: "Please under 1000 chars",
    })
    return
  }

  if (session) {
    const { user } = session
    const parsed = JSON.parse(req.body)

    openai
      .createCompletion({
        model: "content-filter-alpha",
        //text-davinci-002,
        prompt: "<|endoftext|>" + parsed.input + "\n--\nLabel:",
        temperature: 0,
        max_tokens: 1,
        top_p: 0,
        logprobs: 10,
      })
      .then(function (response: any) {
        console.log("content-filter score:", response.data.choices[0].text)
        if (response.data.choices[0].text === "0") {
          console.log("safe contnet")

          console.log("usermail:", user?.email)

          console.log("Chatmessage:", parsed.input)
          // add sending user id to the request
          openai
            .createCompletion({
              model: "text-davinci-002",
              prompt:
                "kindly answer the question the in the context of computer programming. \n\n\n\n Q: " +
                parsed.input +
                "\n\n\n\n A:",
              temperature: 0.9,
              max_tokens: 250,
              top_p: 1,
              frequency_penalty: 0,
              presence_penalty: 0,
              user: user?.email,
            })
            .then((response: any) => {
              console.log(response.data.choices[0].text)
              //res.status(200).json(response.data)
              try {
                res.status(200).json({ data: response.data.choices[0].text })
              } catch (err) {
                console.log(err)
              }
            })
            .catch((error: any) => {
              console.log(error)
              res.status(500).json(error.message)
            })
        } else {
          res.status(200).json({
            message:
              "I can not talk about this kind of topic. Please try another one.",
          })
        }
      })
  } else {
    res.status(200).json({
      message:
        "Please login to chat with me. I will answer all your questions. You can Sign In below.",
    })
  }
}

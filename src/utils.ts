import { connect } from "mongoose"

const MONGO_URI = process.env.MONGO_URI as string

console.log(MONGO_URI)
/*eslint-disable */
type ConnectionOptions = {
  useFindAndModify: boolean
  useUnifiedTopology: boolean
  useCreateIndex: boolean
  useNewUrlParser: boolean
}

const options = {
  useFindAndModify: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
}

export const connectToDatabase = () => connect(MONGO_URI, options)
/*eslint-enable */

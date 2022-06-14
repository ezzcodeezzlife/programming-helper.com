import { connect, ConnectionOptions } from "mongoose"
const  MONGO_URI  = process.env.MONGO_URI as string

console.log(MONGO_URI)

const options: ConnectionOptions = {
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true
}

export const connectToDatabase = () => connect(MONGO_URI, options)

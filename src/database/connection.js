
import {} from 'dotenv/config'

const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const database = process.env.DB_DATABASE

export const MONGO_URI = `mongodb+srv://${username}:${password}@cluster0.v8skq.mongodb.net/${database}?retryWrites=true&w=majority`
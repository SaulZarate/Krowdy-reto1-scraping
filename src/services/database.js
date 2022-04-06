import mongoose from "mongoose"
import { MONGO_URI } from "../database/connection.js"

const db = async ()=>{
    const conn = await mongoose.connect(MONGO_URI)
    return conn.connection
}

export default db
import { MongoClient } from 'mongodb'
require("dotenv").config({ path: ".env" });

const uri = process.env.MONGODB_URI
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}


if (!uri) {
    throw new Error('Add Mongo uri to .env.local')
}

try {
    var client = new MongoClient(uri, options)
    var clientPromise = client.connect()
} catch (error) {
    console.log("Could not connect to mongodb client.")
}


export default clientPromise
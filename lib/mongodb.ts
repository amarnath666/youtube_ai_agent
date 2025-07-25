import { MongoClient, MongoClientOptions } from 'mongodb'

const uri: string = process.env.MONGODB_URI!
const options: MongoClientOptions = {}

let client: MongoClient
let clientPromise: Promise<MongoClient>

// Add type to globalThis to include _mongoClientPromise
declare global {
  // allow globalThis._mongoClientPromise in development
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable')
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise

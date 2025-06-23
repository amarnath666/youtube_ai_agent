import mongoose, { Connection } from 'mongoose'

const MONGODB_URI: string = process.env.MONGODB_URI!

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable')
}

interface MongooseGlobal {
  conn: Connection | null
  promise: Promise<typeof mongoose> | null
}

// Extend Node.js global type to include `mongoose`
declare global {
  var mongoose: MongooseGlobal | undefined
}

let cached: MongooseGlobal = global.mongoose ?? { conn: null, promise: null }

if (!global.mongoose) {
  global.mongoose = cached
}

async function dbConnect(): Promise<Connection> {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => mongoose)
  }

  try {
    cached.conn = (await cached.promise).connection
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default dbConnect

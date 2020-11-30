import {MongoClient} from 'mongodb'

const {MONGODB_URL, MONGODB_DBNAME} = process.env

if (!MONGODB_URL) {
  throw new Error(
    'Veuillez définir la variable globale MONGODB_URL dans le fichier .env'
  )
}

if (!MONGODB_DBNAME) {
  throw new Error(
    'Veuillez définir la variable globale MONGODB_DBNAME dans le fichier .env'
  )
}

let cached = global.mongo
if (!cached) {
  global.mongo = {}
  cached = global.mongo
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const conn = {}
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
    cached.promise = MongoClient.connect(MONGODB_URL, options)
      .then(client => {
        conn.client = client
        return client.db(MONGODB_DBNAME)
      })
      .then(db => {
        conn.db = db
        cached.conn = conn
      })
  }

  await cached.promise
  return cached.conn
}

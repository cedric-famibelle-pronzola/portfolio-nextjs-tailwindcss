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

export async function connectToDatabase() {
  const mongo = {}
  const conn = {}
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
  mongo.promise = MongoClient.connect(MONGODB_URL, options)
    .then(client => {
      conn.client = client
      return client.db(MONGODB_DBNAME)
    })
    .then(db => {
      conn.db = db
      mongo.conn = conn
    })

  await mongo.promise
  return mongo.conn
}

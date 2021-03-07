const mongoose = require('mongoose')
require('dotenv').config()

const MONGODB_URL = process.env.MONGODB_URL
const MONGODB_DBNAME = process.env.MONGODB_DBNAME

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

async function connectToDatabase() {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }

  mongoose.connect(`${MONGODB_URL}/${MONGODB_DBNAME}`, options)

  const db = mongoose.connection

  return db
}

module.exports = {connectToDatabase}

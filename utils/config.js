require('dotenv').config()

const DB_COLLECTION = process.env.DB_COLLECTION
const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD
const PORT = process.env.PORT

module.exports = {
  DB_COLLECTION,
  DB_USERNAME,
  DB_PASSWORD,
  PORT
}

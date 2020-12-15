require('dotenv').config()

const DB_COLLECTION      = process.env.DB_COLLECTION
const TEST_DB_COLLECTION = process.env.TEST_DB_COLLECTION
const DB_USERNAME        = process.env.DB_USERNAME
const DB_PASSWORD        = process.env.DB_PASSWORD
const PORT               = process.env.PORT
const NODE_ENV           = process.env.NODE_ENV

module.exports = {
  DB_COLLECTION,
  TEST_DB_COLLECTION,
  DB_USERNAME,
  DB_PASSWORD,
  PORT,
  NODE_ENV,
}

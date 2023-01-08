const { MongoClient } = require("mongodb")
require("dotenv").config()
const uri = process.env.MONGODB_URI
const database = process.env.DATABASE
const withDB = async (operations, response) => {
  try {
    const client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    const db = client.db(database)
    await operations(db)
    client.close()
  } catch (error) {
    console.log("Database Error", error)
  }
}
module.exports = { withDB }

const express = require("express")
const router = express.Router()
const { withDB } = require("../config")

router.use(express.json())

router.post("/", async (req, res) => {
  const { body: data } = req

  const params = {
    walletAccount: data.walletAccount,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    username: null,
    email: null,
    bio: null,
    siteURL: null,
    twitterUsername: null,
    instagramUsername: null,
    name: null,
    surname: null,
    profilePhoto: null,
  }

  if (data.walletAccount) {
    withDB(async (db) => {
      // Register user
      const response = await db.collection("accounts").insertOne(params)
      if (response) {
        res.send({ message: "INFO : Account successfully created" })
      } else {
        res.status(500).send({ message: "ERROR : Can't registered user" })
      }
    })
  } else {
    res.status(400).send({ message: "ERROR : walletAddress doesn't entered" })
  }
})

module.exports = router

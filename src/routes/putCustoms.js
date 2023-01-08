const express = require("express")
const router = express.Router()
const { withDB } = require("../config")
router.use(express.json())

router.put("/", (req, res) => {
  const { body: data } = req

  let params = {
    siteURL: data.siteURL,
    bio: data.bio,
    twitterUsername: data.twitterUsername,
    instagramUsername: data.instagramUsername,
    updatedAt: Date.now(),
  }
  for (let prop in params) if (!params[prop]) delete params[prop]
  if (data.walletAccount) {
    withDB(async (db) => {
      const response = await db.collection("accounts").findOneAndUpdate({
        walletAccount: data.walletAccount,
        // buradan devam edecek
      })
      if (response) {
        res.send({ message: "INFO : Informations successfully updated!" })
      } else {
        res.status(500).send("ERROR : Informations can't updated")
      }
    })
  } else {
    res.status(500).send({
      message: "ERROR : You must enter walletAddress",
    })
  }
})

module.exports = router

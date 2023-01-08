const express = require("express")
const router = express.Router()
const { withDB } = require("../config")
router.use(express.json())

router.put("/", (req, res) => {
  const { body: data } = req

  let customInfos = {
    siteURL: data.siteURL,
    bio: data.bio,
    twitterUsername: data.twitterUsername,
    instagramUsername: data.instagramUsername,
    name: data.name,
    surname: data.surname,
    updatedAt: Date.now(),
  }
  for (let prop in customInfos) if (!customInfos[prop]) delete customInfos[prop]
  if (data.walletAccount) {
    withDB(async (db) => {
      const response = await db.collection("accounts").updateOne(
        { walletAccount: data.walletAccount },
        {
          $set: customInfos,
        }
      )
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

const express = require("express")
const router = express.Router()
const { withDB } = require("../config")
router.use(express.json())

router.get("/:walletAddress", (req, res) => {
  const { params: data } = req

  // Get User Profile
  /**
   * if request with a username getProfile by Username
   * else getProfile by walletAddress
   */
  withDB(async (db) => {
    var response

    if (data.walletAddress.length <= 16) {
      response = await db.collection("accounts").findOne({
        username: data.walletAddress,
      })
    } else {
      response = await db.collection("accounts").findOne({
        walletAccount: data.walletAddress,
      })
    }

    if (response) {
      res.send({ message: response })
    } else {
      res.status(500).send({ message: "ERROR : Can't find user" })
    }
  })
})

module.exports = router

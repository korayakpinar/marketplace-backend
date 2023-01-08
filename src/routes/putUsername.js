const express = require("express")
const router = express.Router()
const { withDB } = require("../config")
router.use(express.json())

router.put("/", (req, res) => {
  const { body: data } = req
  if (data.username && data.walletAccount) {
    withDB(async (db) => {
      const response = await db
        .collection("accounts")
        .findOneAndUpdate(
          { walletAccount: data.walletAccount },
          { $set: { username: data.username, updatedAt: Date.now() } }
        )
      if (response) {
        res.send({ message: "INFO : Username successfully updated!" })
      } else {
        res.status(500).send("ERROR : Username can't updated")
      }
    })
  }
})

module.exports = router

const express = require("express")
const router = express.Router()
const { withDB } = require("../config")
router.use(express.json())

router.get("/:walletAccount", (req, res) => {
  const { params: data } = req

  withDB(async (db) => {
    const response = await db.collection("images").findOne({
      ownerAccount: data.walletAccount,
    })
    if (response) {
      res.set("Content-Type", response.contentType)
      res.send(response.data)
    } else {
      res.status(500).send({ message: "ERROR : User photo can't view" })
    }
  })
})

module.exports = router

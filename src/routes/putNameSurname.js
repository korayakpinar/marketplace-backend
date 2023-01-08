const express = require("express")
const router = express.Router()
const { withDB } = require("../config")
router.use(express.json())

router.put("/", (req, res) => {
  const { body: data } = req

  if (data.walletAccount && (data.name || data.surname)) {
    withDB(async (db) => {
      if (data.name && data.surname) {
        const response = await db.collection("accounts").findOneAndUpdate(
          { walletAccount: data.walletAccount },
          {
            $set: {
              name: data.name,
              surname: data.surname,
              updatedAt: Date.now(),
            },
          }
        )
        res.send({ message: "INFO : Name & Surname successfully updated" })
      } else if (data.name && !data.surname) {
        const response = await db.collection("accounts").findOneAndUpdate(
          { walletAccount: data.walletAccount },
          {
            $set: {
              name: data.name,
              updatedAt: Date.now(),
            },
          }
        )
        res.send({ message: "INFO : Name successfully updated" })
      } else {
        const response = await db.collection("accounts").findOneAndUpdate(
          { walletAccount: data.walletAccount },
          {
            $set: {
              surname: data.surname,
              updatedAt: Date.now(),
            },
          }
        )
        res.send({ message: "INFO : Surname successfully updated" })
      }
    })
  } else {
    res.status(500).send({ message: "ERROR : Wrong Inputs" })
  }
})

module.exports = router

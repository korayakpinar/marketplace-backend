const express = require("express")
const router = express.Router()
const { v4: uuidv4 } = require("uuid")
const multer = require("multer")
const { withDB } = require("../config")
router.use(express.json())

const fileStorage = multer.memoryStorage()

const upload = multer({
  storage: fileStorage,
  limits: {
    fileSize: 1000000, // 10MB
    files: 1,
  },
})

// Post endpoint for profile photo upload
router.post("/", upload.single("file"), (req, res) => {
  const { body: data } = req
  file = req.file
  const fileName = uuidv4()

  if (!file) {
    return res.status(400).send("File must be a PNG, JPEG or JPG file")
  } else {
    const image = {
      data: new Buffer.from(req.file.buffer, "binary"),
      contentType: req.file.mimetype,
      filename: fileName,
      ownerAccount: data.walletAccount,
      updatedAt: Date.now(),
    }
    withDB(async (db) => {
      console.log(image.contentType)
      const response = await db.collection("images").findOneAndUpdate(
        {
          ownerAccount: data.walletAccount,
        },
        {
          $set: {
            data: image.data,
            contentType: image.contentType,
            filename: image.filename,
            updatedAt: image.updatedAt,
          },
        },
        {
          upsert: true,
        }
      )
      if (response) {
        await db
          .collection("accounts")
          .updateOne(
            {
              walletAccount: data.walletAccount,
            },
            {
              $set: {
                updatedAt: image.updatedAt,
                profilePhoto: image.filename,
              },
            }
          )
          .then(() => {
            res.send({ message: "INFO : Profile photo saved successfully" })
          })
      } else {
        res.status(500).send({ message: " ERROR : Profile photo can't upload" })
      }
    })
  }
})

module.exports = router

const express = require("express")
const router = express.Router()
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");

router.use(express.json());

const fileStorage = multer.memoryStorage();

const upload = multer({
    storage: fileStorage,
    limits: {
      fileSize: 10000, // 10MB
      files: 1,
    },
  });

// Post endpoint for profile photo upload
router.post("/", upload.single("file"), (req, res) => {
    file = req.file;
    const fileName = uuidv4();
    
  
    // const { username, wallet } = req.body; || Olacak mı bilmiyorum, sana bıraktım; istersen bir sor.
  
    if (file.mimetype != "application/png" || file.mimetype != "application/jpeg" || file.mimetype != "application/jpg") {
      return res.status(400).send("File must be a PNG, JPEG or JPG file");
    } else {
  
      
    }
  });

module.exports = router
const express = require("express")
const router = express.Router()

router.use(express.json());

router.post("/", (req, res) => {

    const { name, surname } = req.body;

})

module.exports = router
const express = require("express")
const router = express.Router()

router.use(express.json());

router.post("/", (req, res) => {

    const { username } = req.body;

})

module.exports = router
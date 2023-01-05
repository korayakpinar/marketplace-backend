const express = require("express")
const router = express.Router()

router.use(express.json());

router.get("/", (req, res) => {
    
    //const { wallet } = req.body;   || Wallet'a göre mi olacak yoksa username'e göre mi olacak bilmiyorum, sana bıraktım; istersen bir sor.

})

module.exports = router
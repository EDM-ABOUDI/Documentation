const express = require("express")
const router = express.Router()

const { GetUsers } = require("../Controller/UserController")

router.get('/', GetUsers)

module.exports = router
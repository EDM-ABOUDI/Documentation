const express = require("express")
const router = express.Router()

const { AddSubItem, DeleteSubItem } = require("../Controller/SubItemController")

//sub items
router.post('/add', AddSubItem)
router.delete('/:id', DeleteSubItem)

module.exports = router
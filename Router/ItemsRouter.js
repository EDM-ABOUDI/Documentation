const express = require("express")
const router = express.Router()

const { GetItems, AddItem, DeleteItem, ModifyItem } = require("../Controller/ItemsController")

router.get('/', GetItems)
router.post('/add', AddItem)
router.delete('/:id', DeleteItem)
router.put('/:id',ModifyItem)


module.exports = router
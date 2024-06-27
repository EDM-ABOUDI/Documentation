const express = require("express")
const router = express.Router()

const { AddArticle, GetArticles, DeleteArticle, GetArticle, ModifyArticle , DeleteAllArticles} = require("../Controller/ArticlesController")
//All articles
router.get('/:id/articles', GetArticles)
router.delete('/:id/articles',DeleteAllArticles)

router.get('/:id/article/:aid', GetArticle)
router.post('/:id/article/add', AddArticle)
router.put('/:id/article/:aid', ModifyArticle)
router.delete('/:id/article/:aid', DeleteArticle)

module.exports = router
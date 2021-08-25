const express = require('express')
const router = express.Router()
const admController = require('../controllers/admController')
const authController = require('../controllers/authController')
var methodOverride = require('method-override')
router.use(express.urlencoded({ extended: true }))

router.use(methodOverride('_method'))
router.get('/', admController.loginForm)
router.get('/all', admController.admAllPosts)
router.get('/new', admController.newForm)
router.get('/edit/:id', admController.editForm)
router.post('/edit/:id', admController.editPost, admController.admAllPosts)
router.post('/login', admController.loginAdm, admController.admAllPosts)
router.post('/new',admController.newPost, admController.admAllPosts)
router.delete('/delete', admController.deletePost, admController.admAllPosts)

module.exports = router
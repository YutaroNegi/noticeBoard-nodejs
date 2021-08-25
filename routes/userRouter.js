const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
router.use(express.urlencoded({extended:true}))

router.get('/all', userController.allPosts)
router.post('/new', userController.registerUser)
router.post('/login', userController.loginUser, userController.allPosts)

module.exports = router
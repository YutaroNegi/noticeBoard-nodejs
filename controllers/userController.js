const User = require('../models/User')
const Post = require('../models/Post')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userController = {

    registerUser: async function (req, res) {
        let selectedUser = await User.findOne({email: req.body.email})
        if (selectedUser) return res.status(400).send("email exists")

        let user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
        })

        try {
            let savedUser = await user.save()
            res.send(savedUser)
        } catch (error) {
            res.status(400).send("error occurred", erro)
        }
    },

    loginUser: async function (req, res, next) {
        const selectedUser = await User.findOne({email: req.body.email})
        if (!selectedUser) return res.status(400).send("email or password incorrect")

        const passwordAndUserMatch = bcrypt.hashSync(req.body.password, selectedUser.password)
        if (!passwordAndUserMatch) return res.status(400).send("email or password incorrect")

        const token = jwt.sign({_id:selectedUser._id, adm: selectedUser.adm}, process.env.TOKEN_SECRET)
        res.header("auth-token", token)
        // res.send("logged")
        next()

    },

    allPosts: async function (req, res) {
        try {
            let doc = await Post.find()
            res.render('all', {doc})
            return {doc}
        } catch (error) {
            res.status(400).send("error ocured")
        }
    }
}

module.exports = userController
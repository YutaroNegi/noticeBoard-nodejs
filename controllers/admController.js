const Post = require('../models/Post')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const admController = {


    loginForm: function(req,res){
        res.render('adm' )
    },

    loginAdm: async function (req, res, next) {
        const selectedUser = await User.findOne({email: req.body.email})
        if (!selectedUser) return res.status(400).send("email or password incorrect")

        const passwordAndUserMatch = bcrypt.hashSync(req.body.password, selectedUser.password)
        if (!passwordAndUserMatch) return res.status(400).send("email or password incorrect")

        const token = jwt.sign({_id:selectedUser._id, adm: selectedUser.adm}, process.env.TOKEN_SECRET)
        res.header("auth-token", token)
        
        if(selectedUser.adm){
            next()
        }else{
            res.status(401).send("acess denied")
        }
    },

    admAllPosts: async function (req, res) {
        let token = req.header('auth-token')
        try {
            let doc = await Post.find()
            res.render('allAdm', {doc})
            return {doc}
        } catch (error) {
            res.status(400).send("error ocured")
        }
    },

    newForm: function(req,res){
        res.render('newPost' )
    },

    newPost: function (req, res, next) {
        title = req.body.title
        desc = req.body.desc

        let post = new Post({ title, desc })

        post.save().then(doc => {
            next()
        }).catch(error => {
            res.status(400).send(error);
        })
    },

    editForm:async function(req,res){
        let id = req.params.id

        try {
            let doc = await Post.findById(id)
            res.render('edit', {body: doc})
        } catch (error) {
            res.send(error)
        }
        
    },

    editPost: async function(req,res,next){
        let id = req.params.id
        let link = {}
        link.title = req.body.title
        link.desc = req.body.desc
        
        try {
        doc = await Post.updateOne({_id: id}, link)
        next()
        } catch (error) {
            res.send(error)
        }
    },

    deletePost: async function (req, res, next) {
        let id = req.body.id

        try {
            await Post.findByIdAndDelete(id)
            next()
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

module.exports = admController
const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title:{type: String, required:[true, "must have a title"]},
    desc:{type: String, required:[true, "must have a description"]},
})

module.exports = mongoose.model('Post', postSchema)
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{type: String, required:[true, "must have a name"], minLenght: 5},
    email:{type: String, required:[true, "must have a email"], minLenght: 5},
    password:{type: String, required:[true, "must have a password"], minLenght: 5},
    adm: {type:Boolean, default: false}
})

module.exports = mongoose.model('User', userSchema)
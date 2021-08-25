const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const userRouter = require('./routes/userRouter')
const admRouter = require('./routes/admRouter')
require('dotenv').config()

//connect to mongo atlas
mongoose.connect(process.env.MONGO_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {console.log("error ocured");})
db.once('open', () => {console.log("mongo db running");})
//connect to mongo atlas

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'templates'))

app.get('/', (req,res)=>{res.render('index')})
app.use('/user', userRouter)
app.use('/adm', admRouter)

app.listen(process.env.PORT, () => { console.log("server running on port:", process.env.PORT); })


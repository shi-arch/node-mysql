const express = require('express')
const {medicareSignUp, login, getUserList} = require('../controllers/controller')
const auth = require('../auth/auth')
const app = express()

app.get("/test", (req, res)=> {
    res.send("Welcome to medicare ... !")
})

app.post('/signup', medicareSignUp)
app.post('/login', login)
app.get('/userList', auth, getUserList)

module.exports = app
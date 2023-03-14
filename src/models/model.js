
const {getDb} = require('../connection/connection')
const jsonwebtoken = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const signUpModel = async (body) => {
    let response = ""
    const collection = await getDb().collection("sign-up");
    const findUser = await collection.findOne({email: body.email})
    if(findUser == null){
        collection.insertOne(body)
        response = "new user created"
    }
    return response
}

const loginModel = async (body) => {
    let response = ""
    const collection = await getDb().collection("sign-up");
    const findUser = await collection.findOne({email: body.email})
    if(findUser !== null){
        const passwordCheck = await bcrypt.compare(body.password, findUser.password)
        if(passwordCheck){
            const token = jsonwebtoken.sign({email: body.email}, 'test')
            return {token: token}
        }       
    }
    return response
}

const userList = async (body) => {
    let response = ""
    const collection = await getDb().collection("sign-up");
    const findUser = await collection.find({}).toArray()
    if(findUser !== null){
        response = findUser 
    }
    return response
}



module.exports = {
    signUpModel, loginModel, userList
}
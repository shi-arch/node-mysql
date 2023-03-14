
const bcrypt = require('bcrypt');

const { signUpModel, loginModel, userList } = require('../models/model')

const medicareSignUp = async (req, res) => {
  const { email, password, verifyPassword, contact, address } = req.body
  if (email && password && verifyPassword && contact && address) {
    if ((password == verifyPassword) && (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) &&
      /^\s*(?:\+?(\d{1,3}))?[- (]*(\d{3})[- )]*(\d{3})[- ]*(\d{4})(?: *[x/#]{1}(\d+))?\s*$/.test(contact)) {
      let ecrPass = await bcrypt.hash(password, 10)
      const obj = req.body
      delete obj.verifyPassword
      obj.password = ecrPass
      const response = await signUpModel(obj)
      if (response) {
        res.status(201).send(response)
      } else {
        res.status(400).send({ error: "user is already created", Status: "Bad request" })
      }
    } else {
      res.status(400).send({ error: "invalid parameters", Status: "Bad request" })
    }
  } else {
    res.status(400).send({ error: "All params are mandatory", Status: "Bad request" })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body
  if (email && password && (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
    const response = await loginModel(req.body)
    if (response) {
      res.status(200).send({ response, Status: "login successfull" })
    } else {
      res.status(401).send({ error: "login failed", Status: "Auth failed" })
    }
  } else {
    res.status(400).send({ error: "All params are mandatory", Status: "Bad request" })
  }
}

const getUserList = async (req, res) => {
  const response = await userList()
  if (response) {
    res.status(200).send({ response, Status: "user list" })
  } else {
    res.status(204).send({ error: "No content" })
  }
}



module.exports = {
  medicareSignUp, getUserList, login
}
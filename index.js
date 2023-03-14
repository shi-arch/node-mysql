let connection = require('./src/connection/connection')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
dotenv.config();
const medicare = require('./src/medicalRouter/medicare')
const mysql = require('mysql');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(medicare)

var con = mysql.createConnection({
    host: "217.21.91.219",
    user: "u804822716_rickyriccs",
    password: "IGhn#Rt]0",
    database: "u804822716_chemist"
  });
app.get('/', function(req, res){
  res.send('Welcome to Ricky-Shiv-Meds backened >>>')
})
app.get('/list', function(req, res){
  con.connect()
  // con.query("SELECT * FROM digiriccs_chemists where id=2", function (err, result, fields) {
  //   if (err) throw err;
  //   res.send({length: result.length, data: result})
  // });
  con.query("SELECT * FROM digiriccs_chemists", function (err, result, fields) {
    if (err) throw err;
    res.send({length: result.length, data: result})
  });
  con.end();
})

app.listen( process.env.PORT, async () => {
  console.log(`app listening at http://localhost:` + process.env.PORT)
})

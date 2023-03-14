const mysql = require('mysql');
const params = require('../constants/constant')
let dbConn;
var con = mysql.createConnection({
    host: "217.21.91.219",
    user: "u804822716_rickyriccs",
    password: "IGhn#Rt]0",
    database: "u804822716_chemist"
  });
module.exports = {
    connectToServer: function( callback ) {
        try{
            con.connect(function(err) {
                if (err) throw err;
                dbConn = con
                console.log("connected successfully...")
                // dbConn.query("SELECT * FROM digiriccs_vendor_pool", function (err, result, fields) {
                //   if (err) throw err;
                //   console.log(result,'rrrrrrrrrrrrrrrr');
                // });
              });
        } catch (err){
            console.log(err);
        }
    },
  
    getDb: function() {
      return dbConn;
    }
};

  
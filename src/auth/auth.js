const jsonwebtoken = require('jsonwebtoken')

const webTokenVerification = async (req, res, next) => {
    const token = req.body.token || req.query.token
    try {
        if(token){
            const res = jsonwebtoken.verify(token, 'test')
            console.log(res,'rrrrrrrrrrrrr')
            if(res){
                next()
            } else {
                next("Invalid token")
            }
        } else {
            next("Token is mandatory")
        }
    } catch (err) {
        console.log(err)
        next("Invalid token")
    }
    
    
    
}

module.exports = webTokenVerification
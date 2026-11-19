
const jwt = require('jsonwebtoken')
require('dotenv').config()

function auth(req, res, next) {
    try {
        const tokenReq = req.headers.authorization
           console.log("Authorization Header:", tokenReq);
        if (!tokenReq || !tokenReq.startsWith("Bearer ")) {
            return res.status(401).send({
                msg: "Not Authorized",
                success: false
            })
        }

        const token = tokenReq.trim().split(/\s+/)[1]

        console.log(token, "Exact Token")

        const decodedUser = jwt.verify(
            token,
            process.env.SCRITE_KEY
        )

        console.log(decodedUser)

        req.user = decodedUser

        next()

    } catch (error) {
        return res.status(401).send({
            msg: error.message,
            success: false
        })
    }
}

function admin(req, res, next) {
    if(req.user.role == 'admin'){
        next()

    }
    else{
        res.status(400).send({msg:"You are no admin"})
    }

}

module.exports = {
    admin,
    auth
}

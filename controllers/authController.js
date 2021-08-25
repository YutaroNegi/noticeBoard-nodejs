const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    let token = req.header('auth-token')
    if (!token) return res.status(401).send("acess denied")
    try {
        const userVerified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = userVerified
        if (req.user.adm) {
            console.log("adm");
            next()
        }else{
            res.status(401).send("not adm")
        }

    } catch (error) {
        res.status(401).send(error)
    }
}
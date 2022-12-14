const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {

    //verify authentication
    const {authorization} = req.headers

    if (!authorization) {
        return res.status(401).json({error: 'Authorization token required'})
    }

    const token = authorization.split(' ')[1]
    
    try{
        const {_id} = jwt.verify(token, process.env.SECRET)
        console.log('Auth Passed')
        req.user = await User.findOne({_id}).select('_id')
        return next()

    }catch(error){
        if (error.name === 'TokenExpiredError'){
            return res.status(401).header("Clear-Site-Data", "storage").json({error: 'Authorization token expired'})
        }
        console.log("Auth error: " + error)
        console.log(error.name)
        res.status(401).json({error: 'Request is not authorized'})
    }
}

module.exports = requireAuth
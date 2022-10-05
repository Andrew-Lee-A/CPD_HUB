const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

//jwt token
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '1d'})
}

// login user
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)

        const _id = user._id
        // GET the user details completetion status
        const {detailsCompletedStatus, userDetails} = await User.findById({_id}, {"detailsCompletedStatus": 1, "_id": 0, "userDetails": 1 })
        const {prefferedName} = userDetails
        console.log(detailsCompletedStatus)
        
        //create a token
        const token = createToken(user._id)
        res.status(200).json({email, token, detailsCompletedStatus, prefferedName})
    }catch(error){
        res.status(400).json({error: error.message})
    }

}

// signup user
const signupUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.signup(email, password)

        //create a token
        const token = createToken(user._id)
        res.status(200).json({email, token})
    }catch(error){
        res.status(400).json({error: error.message})
    }

}

module.exports = {
    loginUser,
    signupUser,
}
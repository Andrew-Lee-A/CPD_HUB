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

        //create a token
        const token = createToken(user._id)
        res.status(200).json({email, token})
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

const getCPDSummary = async (req, res) => {
    const user_id = req.user._id;
    // const cpdSummary= await User.find({user_id}).sort({createdAt: -1})
    res.status(200).json(user_id)
}

module.exports = {
    loginUser,
    signupUser,
    getCPDSummary
}
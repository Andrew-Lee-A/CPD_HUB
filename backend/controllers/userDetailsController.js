const User = require('../models/userModel')
const mongoose = require('mongoose')


const getUserCPDSummary = async (req, res) => {
    const _id = req.user._id
    const user = await User.findById({_id})
    res.status(200).json(user.cpdSummary)
}


module.exports = {
    getUserCPDSummary
}
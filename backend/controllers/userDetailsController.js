const User = require('../models/userModel')
const mongoose = require('mongoose')


const getUserCPDSummary = async (req, res) => {
    const _id = req.user._id
    const user = await User.findById({_id})
    res.status(200).json(user.cpdSummary)
}

const getUserStartDate = async (req, res) => {
    const _id = req.user._id
    const user = await User.findById({_id})
    res.status(200).json(user.cpdStartDate)
}

const updateCpdEvent = async (req, res) => {
    const _id = req.user._id 
    if (!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).json({error: 'No such user '})
    }

    const user = await User.findOneAndUpdate({_id: _id}, {
        cpdSummary: {
            ...req.body
        }
    })
    res.status(200).json(user.cpdSummary)
}

const getUserDetailsCompletionStatus = async (req, res) => {
    const _id = req.user._id 
    const user = await User.findById({_id})
    res.status(200).json(user.detailsCompletedStatus)
}

module.exports = {
    getUserCPDSummary,
    getUserStartDate,
    updateCpdEvent,
    getUserDetailsCompletionStatus,
    getUserStartDate,
}
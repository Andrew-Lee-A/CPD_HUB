const User = require('../models/userModel')
const mongoose = require('mongoose')


const getUserCPDPoints = async (req, res) => {
    const _id = req.user._id
    const user = await User.findById({_id})
    res.status(200).json(user.cpdSummary)
}

const updateUserCPDPoints = async (req, res) => {
    const _id = req.user._id 
    if (!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).json({error: 'No such user '})
    }

    if (Object.values(req.body).every((item) => typeof item === "number")) {
        const user = await User.findOneAndUpdate({ _id: _id }, 
            {
                cpdSummary: {
                    ...req.body,
                },
            }
        );
        res.status(200).json(user.cpdSummary);
    } else {
        res.status(400).json({
            error: "A value in cpdSummary is not of type number",
        });
    }

}

const getUserDetails = async (req, res) => {
    const _id = req.user._id
    const user = await User.findById({_id})
    res.status(200).json(user.userDetails)
}

const updateUserDetails = async (req, res) => {
    const _id = req.user._id 
    if (!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).json({error: 'No such user '})
    }

    const user = await User.findOneAndUpdate({_id: _id}, {
        userDetails: {
            ...req.body
        },
        $set: {detailsCompletedStatus:
            'true'
        }
    })
    res.status(200).json(user.userDetails)
}

module.exports = {
    getUserCPDPoints,
    updateUserCPDPoints,
    getUserDetails,
    updateUserDetails,
}
const CpdEvent = require('../models/cpdEventModel')
const mongoose = require('mongoose')
const User = require('../models/userModel')

//Get all booked CPD
const getUserBookedCPD = async (req, res) => {
    const _id = req.user._id
    const user = await User.findById({_id})
    const bookedCPD_array = []
    for (const id of user.cpdBooked){
        const cpdEvent = await CpdEvent.findOne({_id: id})
        bookedCPD_array.push(cpdEvent)
    }
    res.status(200).json(bookedCPD_array)
}

//Add a booked CPD
const addUserBookedCPD = async (req, res) => {
    const cpd_id = req.body
    console.log(req.body)
    const _id = req.user._id
    const user = await User.findByIdAndUpdate({_id},
        {
            $push: { cpdBooked: cpd_id }
        
    })
    res.status(200).json(user.cpdBooked)
}

//Delete booked CPD
const deleteBookedCpdEvent = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such CPD event'})
    }

    const user = await User.findByIdAndUpdate({_id: req.user._id},
        {
            $pull: { cpdBooked: {_id: id} }
        
    })
    

    if (!user){
        return res.status(404).json({error: 'No such workout'})
    }else{
        cpdEvent = await CpdEvent.findOne({_id: id})
        res.status(200).json(cpdEvent)
    }

}


//Get completed CPD
const getUserCompletedCPD = async (req, res) => {
    const _id = req.user._id
    const user = await User.findById({_id})
    const bookedCPD_id = user.cpdBooked
    const bookedCPDEvents = await CpdEvent.find({bookedCPD_id}).sort({createdAt: -1})
    res.status(200).json(bookedCPDEvents)
}

//Update completed CPD

//Delete completed CPD

//Get pushed CPD
const getUserPushedCPD = async (req, res) => {
    const _id = req.user._id
    const user = await User.findById({_id})
    const pushedCPD_array = []
    for (const id of user.cpdPushed){
        const cpdEvent = await CpdEvent.findOne({_id: id})
        pushedCPD_array.push(cpdEvent)
    }
    res.status(200).json(pushedCPD_array)
}

module.exports = {
    getUserBookedCPD,
    getUserCompletedCPD,
    getUserPushedCPD,
    addUserBookedCPD,
    deleteBookedCpdEvent,
    
}
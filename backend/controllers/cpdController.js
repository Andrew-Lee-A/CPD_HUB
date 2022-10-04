const CpdEvent = require('../models/cpdEventModel')
const mongoose = require('mongoose')

// get all workouts
const getCpdEvents = async (req, res) => {
    const user_id = req.user._id
    const cpdEvents = await CpdEvent.find({user_id}).sort({createdAt: -1})
    res.status(200).json(cpdEvents)
} 

// get a single workout
const getCpdEvent = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }
    const cpdEvent = await CpdEvent.findById(id)
    if(!cpdEvent){
        return res.status(404).json({error: 'No such workout'})
    }
    res.status(200).json(cpdEvent)
}

// create new workout
const createCpdEvent = async (req, res) => {
    const {title, cpd_points, field, date, location} = req.body

    //error message check
    let emptyFields = []
    if (!title) {
        emptyFields.push('title')
    }
    if (!cpd_points) {
        emptyFields.push('cpd_points')
    }
    if (!field) {
        emptyFields.push('field')
    }
    if (!date) {
        emptyFields.push('date')
    }
    if (!location) {
        emptyFields.push('location')
    }
    if (emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }

    try {
        const user_id = req.user._id
        console.log(date + " Controller")
      const cpdEvent = await CpdEvent.create({title, cpd_points, field, user_id, date, location})
      res.status(200).json(cpdEvent)
    } catch (error) {
      res.status(400).json({error: error.message})
    }
}
//delete a workout
const deleteCpdEvent = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const cpdEvent = await CpdEvent.findOneAndDelete({_id: id})

    if (!cpdEvent){
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(cpdEvent)
}

//update a workout
const updateCpdEvent = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const cpdEvent = await CpdEvent.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    res.status(200).json(cpdEvent)

}

module.exports = {
    getCpdEvents,
    getCpdEvent,
    createCpdEvent,
    updateCpdEvent,
    deleteCpdEvent
}
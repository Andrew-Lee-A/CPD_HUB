const mongoose = require('mongoose')

const Schema = mongoose.Schema

const cpdEventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  cpd_points: {
    type: Number,
    required: true
  },
  field: {
    type: String,
    required: true
  },
  date:{
    type: Date,
    required: false
  },
  location:{
    type: String,
    required: false
  },
  user_id: {
    type: String,
    required: true
  },
  booking_Url:{
    type: String,
    default: ""
  }
}, { timestamps: true })

module.exports = mongoose.model('CpdEvent', cpdEventSchema)
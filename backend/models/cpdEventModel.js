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
  date:{
    type: Date,
    required: false
  },
  price:{
    type: String,
    required: false
  },
  booking_Url:{
    type: String,
    default: ""
  }
}, { timestamps: true })

module.exports = mongoose.model('CpdEvent', cpdEventSchema)
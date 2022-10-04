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
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('CpdEvent', cpdEventSchema)
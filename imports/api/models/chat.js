import shortid from 'shortid'

import mongo from './../db/mongo'
import mongoose from 'mongoose'

const chatSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  user: {
    type: String,
    lowercase: true,
    min: 1,
    trim: true,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  timeframe: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('chat', chatSchema)

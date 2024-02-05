import mongoose from 'mongoose'

const { Schema } = mongoose

const Counters = new Schema({
  _id: String,
  seq: {
    type: Number,
    default: 0,
  },
})

export const CountersModel = mongoose.model('Counters', Counters)

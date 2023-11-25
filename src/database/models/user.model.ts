import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  start_date: {
    type: Date,
    default: Date.now
  },
  calls: [{
    call: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }]
})

export const UserModel = mongoose.model('User', userSchema)
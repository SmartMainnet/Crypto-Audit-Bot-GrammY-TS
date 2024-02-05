import mongoose from 'mongoose'

import { getNextSequence } from '../utils/index.js'

const { Schema } = mongoose

const Users = new Schema(
  {
    id: Number,

    user_id: {
      type: Number,
      required: true,
    },

    username: String,
    first_name: String,
    last_name: String,

    calls: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

Users.index({ id: 1 }, { unique: true })
Users.index({ user_id: 1 }, { unique: true })

Users.pre('save', async function (next) {
  if (this.isNew) {
    this.id = await getNextSequence('users')
  }
  next()
})

export const UsersModel = mongoose.model('Users', Users)

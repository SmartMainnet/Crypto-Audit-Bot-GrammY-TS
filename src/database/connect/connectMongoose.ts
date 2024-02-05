import mongoose from 'mongoose'

const { MONGODB_URI } = process.env

export const connectMongoose = async () => {
  if (!MONGODB_URI) {
    throw new Error('MONGO_URL is missing')
  }

  return await mongoose.connect(MONGODB_URI)
}

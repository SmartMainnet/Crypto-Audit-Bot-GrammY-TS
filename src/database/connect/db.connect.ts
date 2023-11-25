import mongoose from 'mongoose'

const { MONGODB_URI } = process.env

mongoose
  .connect(MONGODB_URI!)
  .then(() => console.log('Connected to MongoDB'))
  .catch(e => console.log(`DB connection error: ${e}`))
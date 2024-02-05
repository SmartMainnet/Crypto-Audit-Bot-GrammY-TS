import { CountersModel } from '../models/index.js'

export const getNextSequence = async (name: string) => {
  const counter = await CountersModel.findByIdAndUpdate(
    { _id: name },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  )
  return counter.seq
}

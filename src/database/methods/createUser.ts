import { User } from 'grammy/types'

import { UsersModel } from '../models/index.js'

export const createUser = async (user: User) => {
  try {
    const userFromDb = await UsersModel.findOne({ user_id: user.id })

    if (!userFromDb) {
      return await UsersModel.create({
        user_id: user.id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
      })
    }
  } catch (e) {
    console.log(e)
  }
}

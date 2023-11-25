import { User } from 'grammy/types'

import { UserModel } from '../models/index.js'

export const createUser = async (user: User) => {
  const userFromDb = await UserModel.findOne({ id: user.id })

  if (!userFromDb) {
    const User = new UserModel({
      id: user.id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name
    })
  
    User
      .save()
      .then(res => console.log(res))
      .catch(e => console.log(e))
  }
}
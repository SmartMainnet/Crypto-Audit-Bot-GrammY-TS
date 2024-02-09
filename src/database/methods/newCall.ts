import { User } from 'grammy/types'

import { createUser } from './index.js'
import { UsersModel } from '../models/index.js'
import { IChain } from '../../types/index.js'

export const newCall = async (user: User, address: string, chain: IChain) => {
  try {
    await createUser(user)

    return await UsersModel.findOneAndUpdate(
      { user_id: user.id },
      {
        $push: {
          calls: {
            successful: true,
            address,
            chain: {
              id: chain.id,
              name: chain.name,
              coin: chain.coin,
            },
            date: new Date(),
          },
        },
      }
    )
  } catch (e) {
    console.log(e)
  }
}

import { UsersModel } from '../models/index.js'
import { IChain } from '../../types/index.js'

export const newCall = async (id: number, address: string, chain: IChain) => {
  try {
    return await UsersModel.findOneAndUpdate(
      { id },
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

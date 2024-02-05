import { InlineKeyboard } from 'grammy'

import { IChain } from '../../types/index.js'

export const checkChainsInlineKeyboard = (chains: IChain[], address: string) => {
  const buttonRow = chains.map((chain: IChain) =>
    InlineKeyboard.text(chain.name, `${chain.name} ${address}`)
  )
  return InlineKeyboard.from([buttonRow])
}

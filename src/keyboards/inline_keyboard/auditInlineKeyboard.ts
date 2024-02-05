import { InlineKeyboard } from 'grammy'

import { IChain } from '../../types/index.js'

export const auditInlineKeyboard = (chain: IChain, address: string) => {
  const auditUrl = `https://gopluslabs.io/token-security/${chain.id}/${address}`
  const scanUrl = `${chain.scan}${address}`
  const swapUrl = `https://app.1inch.io/#/${chain.id}/simple/swap/${chain.coin}/${address}`
  const chartUrl = `https://${
    chain.name === 'BSC' ? 'poocoin.app/tokens' : 'coingecko.com/en/coins'
  }/${address}`

  return new InlineKeyboard()
    .url('Audit', auditUrl)
    .url('Contract', scanUrl)
    .row()
    .url('Buy', swapUrl)
    .url('Chart', chartUrl)
}

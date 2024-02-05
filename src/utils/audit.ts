import axios from 'axios'

import { ContextType, IChain } from '../types/index.js'

export const audit = async (ctx: ContextType, chain: IChain, address: string) => {
  try {
    const resGoPlus = await axios.get(
      `https://api.gopluslabs.io/api/v1/token_security/${chain.id}?contract_addresses=${address}`
    )
    const res = resGoPlus.data.result[address]

    const buyTaxValue = res.buy_tax * 100
    const sellTaxValue = res.sell_tax * 100

    const buyTax = buyTaxValue.toFixed(0) + (buyTaxValue > 15 ? `% ⚠️` : '%')
    const sellTax = sellTaxValue.toFixed(0) + (sellTaxValue > 15 ? `% ⚠️` : '%')

    const roundedTotalSupply = String(Math.floor(res['total_supply']))
    const regExp = /(\d)(?=(\d\d\d)+([^\d]|$))/g
    const totalSupply = roundedTotalSupply.replace(regExp, '$1,')
    const isRenounced =
      res.owner_address === '0x000000000000000000000000000000000000dead' ||
      res.owner_address === '0x0000000000000000000000000000000000000000'

    const token = {
      name: res.token_name,
      symbol: res.token_symbol,
      chain: chain.name,
      totalSupply,
      buyTax,
      sellTax,
      contractVerified: res.is_open_source ? 'Yes' : 'No ⚠️',
      renouncedOwnership: isRenounced ? 'Yes' : 'No',
      can_take_back_ownership: +res.can_take_back_ownership ? '⚠️ *Yes*' : '✅ *No*',
      hidden_owner: +res.hidden_owner ? '⚠️ *Yes*' : '✅ *No*',
      is_proxy: +res.is_proxy ? '⚠️ *Yes*' : '✅ *No*',
      is_anti_whale: +res.is_anti_whale ? '⚠️ *Yes*' : '✅ *No*',
      anti_whale_modifiable: +res.anti_whale_modifiable ? '⚠️ *Yes*' : '✅ *No*',
      is_blacklisted: +res.is_blacklisted ? '⚠️ *Yes*' : '✅ *No*',
      is_mintable: +res.is_mintable ? '⚠️ *Yes*' : '✅ *No*',
      trading_cooldown: +res.trading_cooldown ? '⚠️ *Yes*' : '✅ *No*',
      transfer_pausable: +res.transfer_pausable ? '⚠️ *Yes*' : '✅ *No*',
      slippage_modifiable: +res.slippage_modifiable ? '⚠️ *Yes*' : '✅ *No*',
      is_whitelisted: +res.is_whitelisted ? '⚠️ *Yes*' : '✅ *No*',
    }

    return ctx.t('audit_result', token)
  } catch (e) {
    console.log(e)
  }
}

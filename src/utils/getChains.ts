import { JsonRpcProvider } from 'ethers'

import { chainList } from './index.js'

export const getChains = async (address: string) => {
  const chains = []

  for (const chain of chainList) {
    const providerUrl = process.env[`${chain.coin}_RPC`]

    if (!providerUrl) {
      throw new Error(`${chain.coin}_RPC is missing`)
    }

    const provider = new JsonRpcProvider(providerUrl)
    const addressBytecode = await provider.getCode(address)
    const isContract = addressBytecode !== '0x'

    if (isContract) {
      chains.push(chain)
    }
  }

  return chains
}

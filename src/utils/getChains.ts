import { JsonRpcProvider } from 'ethers'

const { ETH_RPC, BNB_RPC, MATIC_RPC, AVAX_RPC, FTM_RPC } = process.env

const providerETH = new JsonRpcProvider(ETH_RPC)
const providerBNB = new JsonRpcProvider(BNB_RPC)
const providerMATIC = new JsonRpcProvider(MATIC_RPC)
const providerAVAX = new JsonRpcProvider(AVAX_RPC)
const providerFTM = new JsonRpcProvider(FTM_RPC)

export const getChains = async (address: string) => {
  const isContract = {
    ETH: await providerETH.getCode(address) !== '0x',
    BNB: await providerBNB.getCode(address) !== '0x',
    MATIC: await providerMATIC.getCode(address) !== '0x',
    AVAX: await providerAVAX.getCode(address) !== '0x',
    FTM: await providerFTM.getCode(address) !== '0x'
  }

  const chains = [
    {
      id: 1,
      name: 'ETH',
      coin: 'ETH',
      scan: 'https://etherscan.io/token/',
      status: isContract.ETH
    },
    {
      id: 56,
      name: 'BSC',
      coin: 'BNB',
      scan: 'https://bscscan.com/token/',
      status: isContract.BNB
    },
    {
      id: 137,
      name: 'Polygon',
      coin: 'MATIC',
      scan: 'https://polygonscan.com/token/',
      status: isContract.MATIC
    },
    {
      id: 43114,
      name: 'Avalanche',
      coin: 'AVAX',
      scan: 'https://avascan.info/blockchain/c/token/',
      status: isContract.AVAX
    },
    {
      id: 250,
      name: 'Fantom',
      coin: 'FTM',
      scan: 'https://ftmscan.com/token/',
      status: isContract.FTM
    }
  ]

  return chains
}
interface IChain {
  [key: string]: {
    chainId: string
    chainName: string
    rpcUrls: string[]
    nativeCurrency: {
      name: string
      symbol: string
      decimals: number
    }
    blockExplorerUrls: string[]
  }
}

interface IAddresses {
  [chainId: number]: {
    FUEL_NFT_CONTRACT_ADDR : string,
    FUEL_USDT_CONTRACT_ADDR : string,
    FUEL_USDT_TOKEN_ADDR : string,
    FUEL_NFT_ADDR : string,

    ETH_USDC_CONTRACT_ADDR : string,
    ETH_NFT_CONTRACT_ADDR : string,
  }
}

export const addresses: IAddresses = {
  80001 : {
    FUEL_NFT_CONTRACT_ADDR  : "0xb1adfd2179dba47747ce3e444dc9be8a79275821736a2dc6244c931953197d88",
    FUEL_USDT_CONTRACT_ADDR : "0xe68c8aa10ad7fa41743033b6775890574016d0368cacd477040fa8f52c0fbeea",
    FUEL_USDT_TOKEN_ADDR    : "0xfe82260d196cdf11c7983d7019db0838b9971388c6954cb6db5daa23f51fe823",
    FUEL_NFT_ADDR           : "0xe68c8aa10ad7fa41743033b6775890574016d0368cacd477040fa8f52c0fbeea",
    ETH_USDC_CONTRACT_ADDR  : "0xFEca406dA9727A25E71e732F9961F680059eF1F9",
    ETH_NFT_CONTRACT_ADDR   : "0x5430d61C0328c9280b641fd0246427F930De6f25",
  }

}


export const chains: IChain = {
  80001: {
    chainId: "0x13881",
    chainName: "Matic(Polygon) Mumbai Testnet",
    rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
    nativeCurrency: { 
      name: "tMATIC", 
      symbol: "tMATIC", 
      decimals: 18 },
    blockExplorerUrls: ["https://mumbai.polygonscan.com"],
  },
}
export type Chain = keyof typeof chains

const getChain = (chainId: number) => {
  return chains[chainId]
}

export const getAddresses = (chainId: Chain) => {
  return addresses[chainId as number]
}

export const currentAddresses = getAddresses(
  parseInt(process.env.NEXT_PUBLIC_CHAIN_ID)
)

export default getChain


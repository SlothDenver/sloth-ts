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
    MANTLE_USDC_CONTRACT_ADDR : string,
    MANTLE_NFT_CONTRACT_ADDR : string,
    NEON_USDC_CONTRACT_ADDR : string,
    NEON_NFT_CONTRACT_ADDR : string,
  }
}

export const addresses: IAddresses = {
  245022926 : {
    FUEL_NFT_CONTRACT_ADDR  : "0x98b83aa724d3c17a2eb6cba0c4c5b7d330f132f8194406dd7772b57d89593805",
    FUEL_USDT_CONTRACT_ADDR : "0xe68c8aa10ad7fa41743033b6775890574016d0368cacd477040fa8f52c0fbeea",
    
    FUEL_USDT_TOKEN_ADDR    : "0xe68c8aa10ad7fa41743033b6775890574016d0368cacd477040fa8f52c0fbeea",
    FUEL_NFT_ADDR           : "0xe68c8aa10ad7fa41743033b6775890574016d0368cacd477040fa8f52c0fbeea",

    ETH_USDC_CONTRACT_ADDR  : "0xFEca406dA9727A25E71e732F9961F680059eF1F9",
    ETH_NFT_CONTRACT_ADDR   : "0x5430d61C0328c9280b641fd0246427F930De6f25",

    MANTLE_USDC_CONTRACT_ADDR : "0x1296C7D64906176078B3E59E38c42fB2EeB4CC60",
    MANTLE_NFT_CONTRACT_ADDR : "0x41C49aC0E607dCC886e824d0d87CCa17765271C3",
    NEON_USDC_CONTRACT_ADDR : "0x1296C7D64906176078B3E59E38c42fB2EeB4CC60",
    NEON_NFT_CONTRACT_ADDR : "0xe2D2aaBC13B487565cE86a18107E01ED7F3A5acE",
  },
  80001 : {
    FUEL_NFT_CONTRACT_ADDR  : "0x98b83aa724d3c17a2eb6cba0c4c5b7d330f132f8194406dd7772b57d89593805",
    FUEL_USDT_CONTRACT_ADDR : "0xe68c8aa10ad7fa41743033b6775890574016d0368cacd477040fa8f52c0fbeea",
    
    FUEL_USDT_TOKEN_ADDR    : "0xe68c8aa10ad7fa41743033b6775890574016d0368cacd477040fa8f52c0fbeea",
    FUEL_NFT_ADDR           : "0xe68c8aa10ad7fa41743033b6775890574016d0368cacd477040fa8f52c0fbeea",
    
    ETH_USDC_CONTRACT_ADDR  : "0xFEca406dA9727A25E71e732F9961F680059eF1F9",
    ETH_NFT_CONTRACT_ADDR   : "0x5430d61C0328c9280b641fd0246427F930De6f25",
    
    MANTLE_USDC_CONTRACT_ADDR : "0x1296C7D64906176078B3E59E38c42fB2EeB4CC60",
    MANTLE_NFT_CONTRACT_ADDR : "0x41C49aC0E607dCC886e824d0d87CCa17765271C3",
    NEON_USDC_CONTRACT_ADDR : "0x1296C7D64906176078B3E59E38c42fB2EeB4CC60",
    NEON_NFT_CONTRACT_ADDR : "0xe2D2aaBC13B487565cE86a18107E01ED7F3A5acE",
  },
  5001 : {
    FUEL_NFT_CONTRACT_ADDR  : "0xf3f2ba926bb513f06f019e224a51391f8f15dbf43254947c09213852aa6befea",
    FUEL_USDT_CONTRACT_ADDR : "0xe68c8aa10ad7fa41743033b6775890574016d0368cacd477040fa8f52c0fbeea",
    
    FUEL_USDT_TOKEN_ADDR    : "0xe68c8aa10ad7fa41743033b6775890574016d0368cacd477040fa8f52c0fbeea",
    FUEL_NFT_ADDR           : "0xe68c8aa10ad7fa41743033b6775890574016d0368cacd477040fa8f52c0fbeea",
    
    ETH_USDC_CONTRACT_ADDR  : "0xFEca406dA9727A25E71e732F9961F680059eF1F9",
    ETH_NFT_CONTRACT_ADDR   : "0x5430d61C0328c9280b641fd0246427F930De6f25",
    
    MANTLE_USDC_CONTRACT_ADDR : "0x1296C7D64906176078B3E59E38c42fB2EeB4CC60",
    MANTLE_NFT_CONTRACT_ADDR : "0x41C49aC0E607dCC886e824d0d87CCa17765271C3",
    NEON_USDC_CONTRACT_ADDR : "0x1296C7D64906176078B3E59E38c42fB2EeB4CC60",
    NEON_NFT_CONTRACT_ADDR : "0xe2D2aaBC13B487565cE86a18107E01ED7F3A5acE",
  }
}


export const chains: IChain = {
  245022926 : {
    chainId : "0xe9ac0ce",
    chainName : "Neon EVM DevNet",
    rpcUrls: ["https://devnet.neonevm.org"],
    nativeCurrency: { 
      name: "NEON", 
      symbol: "NEON", 
      decimals: 18 },
      blockExplorerUrls: ["https://devnet.neonscan.org"]
  },
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
  5001: {
    chainId: "0x1389",
    chainName: "Mantle Testnet",
    rpcUrls: ["https://rpc.testnet.mantle.xyz"],
    nativeCurrency: { 
      name: "BIT", 
      symbol: "BIT", 
      decimals: 18 },
    blockExplorerUrls: ["https://explorer.testnet.mantle.xyz"],
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


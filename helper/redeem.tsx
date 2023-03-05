import { currentAddresses } from "@/constants";
import { NFTContractAbi__factory } from "@/contracts";
import { AddressInput } from "@/contracts/NFTAbi";
import { Fuel } from "@fuel-wallet/sdk";
import { ethers } from "ethers";
import Polygon_NFT_ABI from "@/abi/Polygon_NFT_ABI.json";

export async function polygonRedeem(tokenId : number) {
  let etherium = (window as any).ethereum;
  const provider = new ethers.providers.Web3Provider(etherium)

  const Redeemsigner = provider.getSigner();
  const Stablincontract = new ethers.Contract(currentAddresses.ETH_NFT_CONTRACT_ADDR, Polygon_NFT_ABI.abi, Redeemsigner);
    
  try {
        let txn = await Stablincontract.redeem(tokenId);
        console.log(`[Logging] Redeem Loading - ${txn.hash}`)
        await txn.wait()
        console.log(`[Logging] Redeem Success - ${txn.hash}`)
    } catch (e) { 
      console.log(e); 
      return false
    }	
    return true
}

export async function RetreiveMyToken(account : string) {

  let provider = (window as any).ethereum;
  const e = new ethers.providers.Web3Provider(provider);
  const getOwnerSign = e.getSigner();
  const Stablincontract = new ethers.Contract(currentAddresses.ETH_NFT_CONTRACT_ADDR, Polygon_NFT_ABI.abi, getOwnerSign);

  for(var i = 0 ; i<=100; i++){
      try{
          let txn2 = await Stablincontract.ownerOf(i);
          if(txn2 == account){
              //console.log("[Logging]",account, " Have Token ", i);
              return i;
          }
      }
      catch (e) {
          console.log(e);
      }
  }
}

export async function fuelRedeem(fuel : Fuel, tokenId : number){

  const account = await fuel?.currentAccount()
  const LockedWallet = await fuel?.getWallet(account)
  const c = await LockedWallet.getCoins(currentAddresses.FUEL_USDT_CONTRACT_ADDR)

  const contract = NFTContractAbi__factory.connect(currentAddresses.FUEL_NFT_CONTRACT_ADDR, LockedWallet);
  const addr: AddressInput = {
      value: LockedWallet.address.toHexString(),
  }

  try {
    let resp = await contract.functions
    .redeem(tokenId, addr)
    .txParams({ 
      gasPrice: 1, 
      variableOutputs: 1 
    })
    .call()
    console.log("RESPONSE:", resp);
    } 
  catch (e) {
    console.log(e);
    return false
  }
  return true
}

export async function FuelRetreiveMyToken(fuel:Fuel) {
  const account = await fuel?.currentAccount()
  const LockedWallet = await fuel?.getWallet(account)
  const c = await LockedWallet.getCoins(currentAddresses.FUEL_USDT_CONTRACT_ADDR)
  
  const contract = NFTContractAbi__factory.connect(currentAddresses.FUEL_NFT_CONTRACT_ADDR, LockedWallet);
  
  const a = LockedWallet.address
  const address = a.toHexString()
  for(var i = 0 ; i<= 100; i++){
      try{
          const b  = await contract.functions.get_token_owner(i).get();
          console.log(b.value)
          if(b.value.value == address) {
            console.log("[Token Found] Token ID", i)
            return i
          }
        }
      catch (e) {
        console.log(e);
      }
  }
}
import { Convictzee } from "@/components";
import getChain, { currentAddresses, getAddresses } from "@/constants";
import { NFTContractAbi__factory, USDTContractAbi__factory } from "@/contracts";
import { Asset } from "@/types";
import { Fuel } from "@fuel-wallet/sdk";
import { bn, CoinQuantityLike, Wallet } from "fuels";
import Polygon_NFT_ABI from "@/abi/Polygon_NFT_ABI.json";
import Polygon_USDC_ABI from "@/abi/Polygon_USDC_ABI.json";
import { ethers, providers, utils } from 'ethers';

export async function polygonMinting(){
    let etherium = (window as any).ethereum;
    const provider = new ethers.providers.Web3Provider(etherium)
    console.log(etherium.selectedAddress)

    const Approvesigner = provider.getSigner();
    const USDCcontract = new ethers.Contract(currentAddresses.ETH_USDC_CONTRACT_ADDR, Polygon_USDC_ABI.abi, Approvesigner);
  
    try {
      let txn = await USDCcontract.approve(currentAddresses.ETH_NFT_CONTRACT_ADDR, 10000000000);
      console.log(`[Logging] Approve Loading - ${txn.hash}`)
      await txn.wait()
      console.log(`[Logging] Approve Success - ${txn.hash}`)
    }
    catch (e) { 
      console.log(e); 
      return false
    }	
  
    const Mintsigner = provider.getSigner();
    const Stablincontract = new ethers.Contract(currentAddresses.ETH_NFT_CONTRACT_ADDR, Polygon_NFT_ABI.abi, Mintsigner);
    try {
        let txn = await Stablincontract.mint(currentAddresses.ETH_USDC_CONTRACT_ADDR, 3);
        console.log(`[Logging] Minting Loading - ${txn.hash}`)
        await txn.wait()
        console.log(`[Logging] Minting Success - ${txn.hash}`)
    }
    catch (e) { 
      console.log(e); 
      return false
    }	

    return true
}
export async function fuelMinting(fuel : Fuel, asset : Asset){
/*
    try {
      await fuel.addAsset(asset)
    } catch (e) {
      console.log(e)
      return
    } 
*/
    const account = await fuel?.currentAccount()

    const LockedWallet = await fuel?.getWallet(account)
    console.log('[Logging] Get Mock Token')


    const usdt_contract = USDTContractAbi__factory.connect(currentAddresses.FUEL_USDT_CONTRACT_ADDR, LockedWallet);
    const amount = bn.parseUnits("10000")
    /*
    try {
        const tx = await usdt_contract.functions
        .mint()
        .txParams({ gasPrice: 1, variableOutputs: 1 })
        .call();
        console.log(tx)
      } catch (e) {
        console.log(e);
        return false
      }
    */
    const coin : CoinQuantityLike = {
        amount : amount,
        assetId : currentAddresses.FUEL_USDT_TOKEN_ADDR,
      }

    console.log('[Logging] Mint Sloth NFT')
    const contract = NFTContractAbi__factory.connect(currentAddresses.FUEL_NFT_CONTRACT_ADDR, LockedWallet);

    try {
      const tx = await contract.functions
      .mint(amount)
      .callParams({
        forward: coin
      })
      .txParams({ 
        gasPrice: 1, 
       variableOutputs: 1,
      })
      .call();
    } 
    catch (e) {
      console.log(e);
      return false
    }
    return true
}
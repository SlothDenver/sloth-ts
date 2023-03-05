import { Convictzee } from "@/components";
import { currentAddresses } from "@/constants";
import { Fuel } from "@fuel-wallet/sdk";
import { Address } from "fuels";



export async function fuelTransferWithToken(fuel : Fuel, amount : number | undefined, recver : string | undefined ){
    if(amount == undefined || recver == undefined ) return

    const account = await fuel?.currentAccount()
    const LockedWallet = await fuel?.getWallet(account)
    const toAddress = Address.fromString(recver);
    try {
        const resp = await LockedWallet.transfer(toAddress, amount, currentAddresses.FUEL_USDT_TOKEN_ADDR);
        console.log(resp)
    } catch (e){
        console.log(e)
    }
}


export async function fuelTransferWithOutToken(fuel : Fuel, convictzee : Convictzee){

}
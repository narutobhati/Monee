
import { getServerSession } from "next-auth";
import { AddMoney } from "../../../components/AddMoney";
import { Balance } from "../../../components/Balance";
import { Onramp } from "../../../components/Onramp";
import db from "@repo/db/client"
import { authOptions } from "../../lib/auth";

import { AlertCircle } from "lucide-react"
import LoginError from "../../../components/LoginError";
import { WalletTxn } from "../../../components/WalletTxn";

async function getBalance() {
    const sesssion=await getServerSession(authOptions)
    const Balance= await db.balance.findFirst({
        where:{
            userId:Number(sesssion?.user?.id)
        }
    })
    return{
        amount: Balance?.amount || 0,
        locked:  Balance?.locked  || 0,
    }
}
async function onramptransaction() {
    const session=await getServerSession(authOptions)
    const transactions= await db.onRampTransaction.findMany({
        where:{
            userId:Number(session?.user?.id)
        }
    })
    return transactions.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))

}

export default async function(){
    const  user=await getServerSession(authOptions);
    if(!user){
        
        return (
            <LoginError></LoginError>  
        )
        
    }
    const balance=await  getBalance();
    const transactions=await onramptransaction(); 
    const t = transactions.reverse().slice(0, 8);
    return (
        <div className="w-full mx-4">
            <div className="my-5 ml-2   text-4xl font-bold  ">
                Wallet
            </div>
            <div className="grid grid-cols-1  lg:grid-cols-5 gap-1 ">
  <div className="md:col-span-3">
    <AddMoney />
  </div>
  <div className="md:col-span-2">
    <Balance amount={balance.amount} locked={balance.locked} />
   {/* @ts-ignore */}
    <WalletTxn transactions={t} title="Recent Transactions"/>
  </div>
</div>
        </div>
    )
}
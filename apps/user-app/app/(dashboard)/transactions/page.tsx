import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { AlertCircle } from "lucide-react";
import LoginError from "../../../components/LoginError";
import db from "@repo/db/client"
import { Onramp } from "../../../components/Onramp";
import {  P2P_sent } from "../../../components/p2p_sent";
import { P2P_recieved } from "../../../components/p2p_recieved";

async function onramptransaction() {
    const session=await getServerSession(authOptions)
    const transactions= await  db.onRampTransaction.findMany({
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
async function p2p_recieved() {
    const session=await getServerSession(authOptions)
    const peer2= await db.p2pTransfer.findMany({
        where:{
            //FromUser: Number(session.user.id),
            ToUser: Number(session.user.id)
        }
    })
    return peer2.map(t => ({
        timestamp: t.timestamp,
        amount:t.amount,
        FromUser:t.FromUser,
        ToUser:t.ToUser,
        FromName:t.FromName

    }))
    
}
async function p2p_sent() {
    const session=await getServerSession(authOptions)
    const peer2= await db.p2pTransfer.findMany({
        where:{
            FromUser: Number(session.user.id),
            //ToUser: Number(session.user.id)
        }
    })
    return peer2.map(t => ({
        timestamp: t.timestamp,
        amount:t.amount,
        FromUser:t.FromUser,
        ToUser:t.ToUser,
        ToName:t.ToName

    }))
    
}
export default async function(){
    const  user=await getServerSession(authOptions);
    if(!user){
        return (
            <LoginError></LoginError>
          )
    }
    const transactions=await  onramptransaction();
    const t2= transactions.filter(t=> t.status==="Success")
    const t=t2.reverse();
    const p2p_Re=await  p2p_recieved();
    const p2p_R=p2p_Re.reverse();
    const p2p_Se=await p2p_sent();
    const p2p_S=p2p_Se.reverse();
    return(
        <div className="w-full mx-4">
             <div className="my-5 ml-2   text-4xl font-bold  ">
                Transactions
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-2">
                <div className="lg:col-span-2">
                    <P2P_sent p2p={p2p_S} title="Sent"></P2P_sent>
                </div>
                <div className="lg:col-span-2">
                    <P2P_recieved p2p={p2p_R} title="Recived" ></P2P_recieved>

                </div>
                <div className="lg:col-span-1">

                {/* @ts-ignore */}
                <Onramp transactions={t} title="Wallet Recharge"></Onramp>
        </div>
                </div>
            </div>


            
    )
}
import { Card } from "@repo/ui/card";
import { ArrowDownIcon, ArrowUpIcon, UserIcon } from "lucide-react"
export function P2P_recieved( {p2p,title}:{p2p:{
    timestamp: Date,
    amount: number,
    FromUser: number,
    ToUser: number,
    FromName:any

}[],title:string} ){
    if(!p2p.length){
        return (
            <Card title={title}>
                <div className="text-center h-auto flex justify-center item-center pt-5">
                        No recent transactions
                </div>
            </Card>
        )
    }

    return (
        <Card title={title}>
            <div className="h-auto mt-2">
                {p2p.map(p=>
                <div className="flex justify-between my-1">
                    <div >
                        <div className="flex gap-1 text-sm ">
                            <div >
                             Recived from   
                            </div>
                            <div className="font-semibold">
                            {p.FromName? p.FromName[0].toUpperCase()+p.FromName.slice(1).toLowerCase()  : "User"}
                            </div>
                        </div>
                        
                        <div className="text-slate-600 text-xs">
                            {p.timestamp.toDateString()}
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        + Rs {p.amount / 100}
                    </div>
                </div>
                )}
            </div>
        </Card>
    )
}
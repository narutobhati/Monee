import { Card } from "@repo/ui/card"

enum OnRampStatus {
    Success,
    Failure,
    Processing
  }
export function Onramp({transactions,title}:{transactions:{
    time: Date,
    amount: number,
    status: OnRampStatus,
    provider: string
}[],title:string}){
    if(!transactions.length){
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
                {transactions.map(t=>
                <div className="flex justify-between my-1">
                    <div >
                        <div className="text-sm">
                            Received INR
                        </div>
                        <div className="text-slate-600 text-xs">
                            {t.time.toDateString()}
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        + Rs {t.amount / 100}
                    </div>
                </div>
                )}
            </div>
        </Card>
    )
}
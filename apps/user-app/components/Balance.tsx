import { Card } from "@repo/ui/card";

export function Balance({amount,locked}:{amount:number, locked:number}){
    return(
        //<div className="w-96">

        <Card title="Balance" >
            <div className="">

            <div className="flex justify-between border-b m-5 ">
                <div>
                    Unlocked Balance
                </div>
                <div>
                    {amount/100} INR
                </div>
            </div>
            <div className="flex justify-between border-b m-5">
                <div>
                    Locked Balance
                </div>
                <div>
                    {locked/100} INR
                </div>
            </div >
            <div className="flex justify-between border-b m-5">
                <div>
                    Total Balance
                </div>
                <div>
                    {(amount+locked)/100} INR
                </div>
            </div>
            </div>
        </Card>
       // </div>
    )
}
import { Card } from "@repo/ui/card";

export function TransferLimit(){
    return(
        <Card title="Transfer Limit" >
           <div>
           <ul className="space-y-2">
                <li className="flex justify-between">
                <span>Daily Limit:</span>
                <span>₹ 1,00,000</span>
                </li>
                <li className="flex justify-between">
                <span>Monthly Limit:</span>
                <span>₹ 50,00,000</span>

                </li>
                <li className="flex justify-between">
                <span>Per Transaction:</span>
                <span>₹ 30,000</span>
                </li>
            </ul>    
            </div> 
        </Card>
    )
}
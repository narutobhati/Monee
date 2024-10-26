import { SendCard } from "../../../components/SendCard";
import { TransferLimit } from "../../../components/TransferLimit";
import { authOptions } from "../../lib/auth";
import { getServerSession } from "next-auth";
import LoginError from "../../../components/LoginError";


export default async function () {
    const session = await getServerSession(authOptions);

    if (!session) {
        return <LoginError />;
    }


    return (
        <div className="w-full mx-4">
            <div className="my-5 ml-2 text-4xl font-bold">
                P2P Transfer
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                <div className="md:col-span-2">
                  
                    <SendCard  />
                </div>
                <div className="md:col-span-1">
                    <TransferLimit />
                </div>
            </div>
        </div>
    );
}

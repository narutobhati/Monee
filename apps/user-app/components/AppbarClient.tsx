"use client"
import { Appbar } from "@repo/ui/appbar";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


export function AppbarClient(){
    const router=useRouter();
    const session =useSession();
    return (
        <div >
            {/* @ts-ignore */}
            <Appbar onSignin={signIn} onSignout={async()=>{
            signOut({
                callbackUrl: '/', // Redirect to homepage after logout
              });
        }}
        user={session.data?.user}
        />
        </div>
        
    )
}
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { redirect } from "next/navigation";
import SignInPage from "../../../components/Signin";

export default async function(){
    const session = await getServerSession(authOptions);
    if (session?.user) {
      redirect('/dashboard')
    } 
    return(
      //@ts-ignore
       <SignInPage> </SignInPage>
    )
}
import LandingPage from "../../../components/Landing";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import LoginError from "../../../components/LoginError";
export default async function(){
    const  user=await getServerSession(authOptions);
   
    if(!user){
        return (
            <LoginError></LoginError>
          )
    }
    return (
        <div className="w-full mx-4 ">
            <LandingPage name={user.user.name} ></LandingPage>
        </div>
    )
}
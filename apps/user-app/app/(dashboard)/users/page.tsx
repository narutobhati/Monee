import { Users } from "../../../components/Users";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import LoginError from "../../../components/LoginError"
import prisma from "@repo/db/client";

async function getUsers() {
    try {
        const users = await prisma.user.findMany(); 
       
        return users;
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
}



export default async function(){
    const  user=await getServerSession(authOptions);
    if(!user){
        return (
            <LoginError></LoginError>
          )
    }
    const users=await getUsers();
    const u=users.filter(x=> {

        return x.id != (user.userId);
    }
       )
       
    return <div className="w-full mx-4 my-2">
        <Users  users={u}></Users>
    </div>
}
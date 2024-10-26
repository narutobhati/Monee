"use server"
import bcrypt from "bcrypt"
import db from "@repo/db/client"
export async function Register({name,email,phone,password}:{name:string,email:string,phone:string,password:string}){
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await db.user.findFirst({
        where: {
            number: phone
        }
    });
    if(existingUser){
        
            return({
                msg:"User already exist",
                status:false
            })
        
    }
        try {
                    const user = await db.user.create({
                        data: {
                            number: phone,
                            password: hashedPassword,
                            email:email,
                            name:name
                        }
                    });
                    const balance=await db.balance.create({
                        data:{
                            userId:user.id,
                            amount:0,
                            locked:0
                        }
                    })
                    return({
                        msg:"User Created ",
                        status:true
                    })
                } catch(e) {
                    console.log("signup error")
                    console.error(e);
                    return({
                        msg:"Error while Creating your Account",
                        status:true
                    })
                }   
    }
   

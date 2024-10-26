"use client"
import { usePathname, useRouter } from "next/navigation";
import path from "path";

export  function Sidebaritem({href,icon,title}:{href:string, icon: any , title:string}){
    const navigate=useRouter();
    const pathname=usePathname();
    const selected= pathname===href;
    return (
        <div className={`flex ${selected? "bg-slate-200" : ""} mb-5 mx-6 rounded hover:bg-slate-200 cursor-pointer py-4`} onClick={ ()=> navigate.push(href)}>
            <div className="pl-7 ">
                {icon} 
            </div>
            <div className="pl-4 font-bold">
                {title}
            </div>
        </div>
    )
}
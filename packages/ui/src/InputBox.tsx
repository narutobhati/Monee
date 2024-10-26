import { text } from "stream/consumers";

export function InputBox({onChange,placeholder,label,value}:{onChange:any,placeholder:string,label:string,value:string}){
    return(
        <div className="mx-4 my-3 ">
           <label className="pl-1 font-semibold">
                {label}
            </label> 
            <input  onChange={(e)=>onChange(e.target.value)} placeholder={placeholder} value={value} className="w-full p-2 rounded my-2  border  bg-gray-50"/>
        </div>
    )
}
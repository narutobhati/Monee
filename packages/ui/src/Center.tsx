export function Center({children}:{children: React.ReactNode}){
    return(
        <div className="flex justify-center h-full ">
            <div className="flex justify-center">
                {children}
            </div>
        </div>
    )
}
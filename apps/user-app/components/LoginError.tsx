import { AlertCircle } from "lucide-react"


export default function LoginError(){
    return (
        <div className="w-full mx-4">            
        <div className="flex flex-col items-center justify-center min-h-screen bg-background">
          <div className="text-center space-y-6 p-8 max-w-md">
            <AlertCircle className="mx-auto h-16 w-16 text-destructive" />
            <h1 className="text-3xl font-bold tracking-tighter">User Not Found</h1>
            <p className="text-muted-foreground">
              We couldn't find your user account. Please log in to access this page.
            </p>
         
          </div>
        </div>
      </div>  
      )
       
}
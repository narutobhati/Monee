
import { Button } from "./button";

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    // TODO: can u figure out what the type should be here?
    onSignin: any,
    onSignout: any
    onClick:any
}

export const Appbar = ({
    user,
    onSignin,
    onSignout,
    
}: AppbarProps) => {
    // return <div className="flex justify-between border-b px-4">
    //     <div className="text-lg flex flex-col justify-center">
    //         PayTM
    //     </div>
    //     <div className="flex flex-col justify-center pt-2">
    //         <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
    //     </div>
    // </div>
    
    return(
        <nav className="bg-white shadow-md p-4 top-0 z-5">
        <div className="top-0 z-5 container mx-auto w-full flex justify-between items-center px-6">
          {/* Logo and Name */}
          <div className="flex items-center space-x-2 cursor-pointer" >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM9 7.5A.75.75 0 0 0 9 9h1.5c.98 0 1.813.626 2.122 1.5H9A.75.75 0 0 0 9 12h3.622a2.251 2.251 0 0 1-2.122 1.5H9a.75.75 0 0 0-.53 1.28l3 3a.75.75 0 1 0 1.06-1.06L10.8 14.988A3.752 3.752 0 0 0 14.175 12H15a.75.75 0 0 0 0-1.5h-.825A3.733 3.733 0 0 0 13.5 9H15a.75.75 0 0 0 0-1.5H9Z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-xl font-bold">Monee</span>
          </div>
      
          {/* Login and Sign-up */}
          <div className="flex items-center space-x-4">
            <Button onClick={user ? onSignout : onSignin}>
              {user ? "Logout" : "Login"}
            </Button>
          </div>
        </div>
      </nav>
      
  );
}
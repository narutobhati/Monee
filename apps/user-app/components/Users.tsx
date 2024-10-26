"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";

export function Users({ users }: any) {
    const handleSendMoney = (userNumber: string) => {
        localStorage.setItem("transferNumber", userNumber); 
        window.location.href = "/p2ptransfer"; 
    };
    

    return (
        <Card title="Users">
            <div>
                {users.length === 0 ? (
                    <p>No users found.</p>
                ) : (
                    <div className="mt-4">
                        {users.map((user: any) => (
                            <div key={user.id} className="flex items-center mb-4">
                                <div className="w-10 h-10 bg-gray-700 text-white flex justify-center items-center rounded-full">
                                    {user.name[0].toUpperCase()}
                                </div>
                                
                               
                                <span className="ml-4 text-lg">{user.name[0].toUpperCase()+ user.name.slice(1).toLowerCase()} ({user.number}) </span>
                                <div className="ml-auto">
                                    <Button onClick={() => handleSendMoney(user.number)}>
                                        Send Money
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Card>
    );
}

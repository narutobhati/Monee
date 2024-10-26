"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { InputBox } from "@repo/ui/inputbox";
import { useState, useEffect } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";
import { ThreeDots } from 'react-loader-spinner'; // Import the loader
import { ToastContainer, toast } from 'react-toastify'; // Import toast components
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

export function SendCard() {
    const [number, setNumber] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false); 

    useEffect(() => {
        const storedNumber = localStorage.getItem("transferNumber");
        if (storedNumber) {
            setNumber(storedNumber);
            localStorage.removeItem("transferNumber");
        }
    }, []);

    const handleSend = async () => {
        setIsLoading(true); // Set loading state to true
        try {
            const result = await p2pTransfer(number, amount * 100);

            if (result.success) {
                toast.success(result.message, {
                    position: "top-right",
                    autoClose: 3000,
                });
                // Clear the local storage on successful payment
                localStorage.removeItem("transferNumber");
            } else {
                toast.error(result.message, {
                    position: "top-right",
                    autoClose: 3000,
                    style: { textDecoration: "underline", color: "red" }, 
                });
            }
        } catch (error) {
            console.error("Error during transfer:", error);
            toast.error("An unexpected error occurred. Please try again.", {
                position: "top-right",
                autoClose: 3000,
                style: { textDecoration: "underline", color: "red" },
            });
        } finally {
            setIsLoading(false); 
        }
    };

    return (
        <div className="max-h-96">
            <ToastContainer />
            <Card title="Send">
                <div className="min-w-72 pt-2">
                    <InputBox
                        placeholder={"Number"}
                        label="Number"
                        value={number}
                        onChange={(value: string) => {
                            setNumber(value);
                        }}
                    />
                    {/* @ts-ignore */}
                    <InputBox
                        placeholder={"Amount"}
                        label="Amount"
                        onChange={(value: number) => {
                            setAmount(value);
                        }}
                       
                    />
                    <div className="pt-4 flex justify-center">
                        <Button onClick={handleSend}>
                            {isLoading ? (
                                <ThreeDots color="#ffffff" height={20} width={20} /> 
                            ) : (
                                "Send"
                            )}
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}

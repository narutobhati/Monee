"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { InputBox } from "@repo/ui/inputbox";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { createOnRamp } from "../app/lib/actions/createOnRamp";
import { ThreeDots } from 'react-loader-spinner'; // Import the loader

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "http://localhost:3002/hdfc",
  },
  {
    name: "Axis Bank",
    redirectUrl: "http://localhost:3002/axis",
  },
];

export function AddMoney() {
  const [selectedurl, setSelectedUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name);
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleAddMoney = async () => {
    setIsLoading(true); // Set loading state to true
    const req = await createOnRamp(provider, amount * 100);
    setIsLoading(false); // Reset loading state

    if (req?.token && selectedurl) {
      // Construct the URL with the necessary query parameters
      const paymentUrl = `${selectedurl}?userId=${req.userId}&token=${req.token}&amount=${req.amount}&provider=${req.provider}`;
      window.open(paymentUrl, "_blank");
      alert("Please refresh the page once done with the payment");
    } else {
      alert("Error processing transaction.");
    }
  };

  return (
    <Card title={"Add Money"}>
      <div className="my-4">
        {/* @ts-ignore */}
        <InputBox
          label="Amount"
          placeholder="₹ 100"
          onChange={(e: number) => {
            setAmount(e);
          }}
        />
        <div className="mx-4 font-semibold">Bank</div>
        <div className="mx-4">
          <Select
            onSelect={(value) => {
              setSelectedUrl(SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl || "");
              setProvider(SUPPORTED_BANKS.find((x) => x.name === value)?.name || "");
            }}
            options={SUPPORTED_BANKS.map((x) => ({
              key: x.name,
              value: x.name,
            }))}
          />
        </div>
        <div className="flex justify-center mt-4">
          <Button onClick={handleAddMoney} > 
            {isLoading ? (
              <ThreeDots color="#ffffff" height={20} width={20} /> // Show loader when loading
            ) : (
              "Add Money"
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}

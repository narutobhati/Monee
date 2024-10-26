"use client"
import { useState } from "react";
import axios from "axios";

export default function OTPVerification() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [message, setMessage] = useState("");

  // Function to handle sending OTP
  const sendOTP = async () => {
    if (!phoneNumber.startsWith("+")) {
      setMessage("Please enter the phone number with the country code (e.g., +1 for the US).");
      return;
    }
  
    try {
      const response = await axios.post("/api/verify/send-otp", {
        phoneNumber,
      });
  
      if (response.status === 200) {
        setIsOTPSent(true);
        setMessage("OTP sent successfully!");
      } else {
        setMessage(response.data.error || "Failed to send OTP");
      }
    } catch (error:any) {
      setMessage(error.response?.data?.error || "Error sending OTP");
    }
  };
  
  // Function to handle verifying OTP
  const verifyOTP = async () => {
    try {
      const response = await axios.post("/api/verify/verify-otp", {
        phoneNumber,
        otp,
      });

      if (response.status === 200) {
        setMessage("OTP verified successfully!");
      } else {
        setMessage(response.data.error || "Invalid OTP");
      }
    } catch (error:any) {
      setMessage(error.response?.data?.error || "Error verifying OTP");
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4 border rounded shadow">
      <h2 className="text-lg font-bold mb-4">OTP Verification</h2>

      {!isOTPSent ? (
        <div>
          <input
            type="text"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
          <button
            onClick={sendOTP}
            className="w-full p-2 bg-blue-500 text-white rounded"
          >
            Send OTP
          </button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Enter the OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
          <button
            onClick={verifyOTP}
            className="w-full p-2 bg-green-500 text-white rounded"
          >
            Verify OTP
          </button>
        </div>
      )}

      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
}

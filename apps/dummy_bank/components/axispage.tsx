"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect, Suspense } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThreeDots } from "react-loader-spinner"; 
import Image from "next/image";
import Axis_logo from "../app/Axis_logo.png"
const AxisBankNetBankingPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(4);
  const searchinput = useSearchParams();
  const amount = Number(searchinput.get("amount"));

  const notify = (message: any, type = "info") => {
    if (type === "success") {
      toast.success(message);
    } else if (type === "error") {
      toast.error(message);
    } else {
      toast(message);
    }
  };

  const sendOTP = async () => {
    if (!phoneNumber.startsWith("+")) {
      notify("Please enter the phone number with the country code (e.g., +1 for the US).", "error");
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.post("/api/verify/send-otp", { phoneNumber });
      setIsLoading(false);
      if (response.status === 200) {
        setIsOTPSent(true);
        notify("OTP sent successfully!", "success");
      } else {
        notify("Failed to send OTP.", "error");
      }
    } catch (error) {
      setIsLoading(false);
      notify("Error sending OTP.", "error");
    }
  };

  const verifyOTP = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/verify/verify-otp", { phoneNumber, otp });
      setIsLoading(false);
      if (response.status === 200) {
        setIsOTPVerified(true);
        notify("OTP verified successfully!", "success");
      } else {
        notify("Invalid OTP.", "error");
      }
    } catch (error) {
      setIsLoading(false);
      notify("Error verifying OTP.", "error");
    }
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      const result = await axios.post("http://localhost:3003/hdfcwebhook", {
        userId: searchinput.get("userId"),
        amount: amount,
        token: searchinput.get("token"),
      });

      if (result.data.message === "Captured") {
        setIsConfirmed(true);
        const countdownInterval = setInterval(() => {
          setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        setTimeout(() => {
          clearInterval(countdownInterval);
          window.close();
        }, 4000);
        notify("Payment successful!", "success");
      } else {
        notify("Payment failed!", "error");
      }
    } catch (error) {
      notify("Error during payment processing.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOTPVerified) {
      handleConfirm(); 
    }
  }, [isOTPVerified]);

  return (
  

    <div className="min-h-screen flex flex-col justify-between bg-[#f2f2f2]">
      {/* Header */}
      <header className="bg-white shadow-md p-4">
        <div className="max-w-5xl mx-16 flex justify-between items-center">
         <Image src={Axis_logo} alt="axis logo"></Image>
          <h1 className="text-lg font-semibold text-gray-800">Welcome to Axis Bank NetBanking</h1>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center">
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
        <div className="max-w-lg w-full bg-white p-10 rounded-lg shadow-lg border border-gray-200">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-[#d32f2f]">Login to Axis NetBanking</h2>
            <p className="text-sm text-gray-500">Secure your transactions with OTP</p>
          </div>

          {!isConfirmed ? (
            <>
              {/* Phone Number Input */}
              <div className="mb-6">
                <label className="block text-sm text-gray-600 mb-2" htmlFor="phoneNumber">
                  Phone Number / Customer ID
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#d32f2f] text-sm"
                  placeholder="Enter your Phone Number or Customer ID"
                />
                <button
                  onClick={sendOTP}
                  className="w-full bg-[#d32f2f] text-white px-4 py-2 mt-3 rounded-lg hover:bg-[#b71c1c] transition-colors flex justify-center"
                  disabled={isLoading}
                >
                  {isLoading ? <ThreeDots color="#ffffff" height={20} width={20} /> : "Continue"}
                </button>
              </div>

              {isOTPSent && (
                <div className="mb-6">
                  <label className="block text-sm text-gray-600 mb-2" htmlFor="otp">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#d32f2f] text-sm"
                    placeholder="Enter the OTP"
                  />
                  <button
                    onClick={verifyOTP}
                    className="w-full bg-green-600 text-white px-4 py-2 mt-3 rounded-lg hover:bg-green-700 transition-colors flex justify-center"
                    disabled={isLoading}
                  >
                    {isLoading ? <ThreeDots color="#ffffff" height={20} width={20} /> : "Verify OTP"}
                  </button>
                </div>
              )}

              {/* Payment Amount */}
              <div className="mb-6">
                <label className="block text-sm text-gray-600">Payment Amount</label>
                <div className="bg-gray-200 p-3 rounded-lg text-center text-lg text-[#d32f2f] font-semibold">
                  ₹ {amount / 100}
                </div>
              </div>

              <p className="text-sm text-gray-600 mt-4">
                Don’t have an Axis Bank account? <a href="#" className="text-[#d32f2f] underline">Register Now</a>
              </p>
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-lg font-semibold text-green-600 mb-4">Payment Successful!</h2>
              <p className="text-gray-600">Thank you for your payment.</p>
              <p className="text-gray-600">Closing in {countdown} seconds...</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#d32f2f] text-white py-4">
        <div className="max-w-5xl mx-auto text-center">
          <p>© Copyright Axis Bank Ltd. | <a href="#" className="underline">Terms and Conditions</a> | <a href="#" className="underline">Privacy Policy</a></p>
        </div>
      </footer>
    </div>
  
  );
};

export default AxisBankNetBankingPage;

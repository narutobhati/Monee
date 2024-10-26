"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignInPage() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Loader state
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Start loading
    const res = await signIn('credentials', {
      phone,
      password,
      redirect: false,
    });

    setLoading(false); // Stop loading

    if (res?.status === 200) {
      router.push('/dashboard'); 
    } else {
      toast.error('Failed to sign in. Try again.'); // Show toast error
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side with graphic info */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-slate-600 to-slate-800 text-white p-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Your Digital Wallet</h2>
          <p className="mb-6 text-2xl">Manage your finances securely</p>
          <div className="space-y-6">
            <div className="flex items-center justify-center space-x-3">
              <span className="bg-white text-slate-800 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </span>
              <span>Multiple Currencies</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <span className="bg-white text-slate-800 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
              </span>
              <span>Secure Transactions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side with form */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-8">
        <div className="w-full max-w-md">
          <h1 className="text-center text-2xl font-bold mb-6">Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label>Phone Number:</label>
            <input
              type="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border p-2 rounded w-full mb-4"
              required
            />
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded w-full mb-4"
              required
            />
            <button
              type="submit"
              className="bg-black text-white p-2 rounded w-full"
              disabled={loading} // Disable button when loading
            >
              {loading ? "Signing in..." : "Sign In"} {/* Show loader text */}
            </button>
          </form>
          <p className="mt-4 text-center">
            Don't have an account? <a href="/auth/signup" className="text-blue-500">Sign Up</a>
          </p>
        </div>
      </div>

     
      <ToastContainer />
    </div>
  );
}

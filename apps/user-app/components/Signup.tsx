"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Register } from '../app/lib/actions/signup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (phone.length !== 10) {
      toast.error('Phone number must be exactly 10 digits.');
      return;
    }

    const res = await Register({ name, email, phone, password });

    if (res.status) {
      router.push('/auth/signin');
    } else {
      toast.error('Failed to sign up. Try again.');
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Toast Container */}
      <ToastContainer />
      
      {/* Left Side Section */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-slate-600 to-slate-800 text-white p-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Your Digital Wallet</h2>
          <p className="mb-6 text-2xl">Manage your finances securely</p>
          <div className="space-y-6">
            <div className="flex items-center justify-center space-x-3">
              <span className="bg-white text-slate-800 p-2 rounded-full">
                {/* Your Icon */}
              </span>
              <span>Multiple Currencies</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <span className="bg-white text-slate-800 p-2 rounded-full">
                {/* Your Icon */}
              </span>
              <span>Secure Transactions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side Section */}
      <div className="flex items-center justify-center w-full md:w-1/2 bg-white p-8">
        <div className="max-w-md w-full">
          <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">Create Your Account</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 p-2 rounded-lg w-full"
                placeholder="John Doe"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 p-2 rounded-lg w-full"
                placeholder="john@example.com"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
              <input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border border-gray-300 p-2 rounded-lg w-full"
                placeholder="123-456-7890"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 p-2 rounded-lg w-full"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition duration-300">
              Sign Up
            </button>
          </form>
          <div className="text-center mt-4">
            <p className="text-gray-600">Already have an account? <a href="/auth/signin" className="text-blue-600 font-semibold">Log in</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react';

interface LandingPageProps {
  name: string;
}

const LandingPage: React.FC<LandingPageProps> = ({ name }) => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isFeaturesVisible, setIsFeaturesVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const headerTimer = setTimeout(() => {
      setIsHeaderVisible(true);
    }, 100); 

    const featuresTimer = setTimeout(() => {
      setIsFeaturesVisible(true);
    }, 300); 

    return () => {
      clearTimeout(headerTimer); 
      clearTimeout(featuresTimer); 
    };
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen mt-2">
      <header className={`bg-black text-white py-20 text-center transition-opacity duration-1000 ${isHeaderVisible ? 'opacity-100' : 'opacity-0'}`}>
        <h1 className="text-4xl font-bold mb-4">
          Welcome, {name ? name : 'User'}!
        </h1>
        <p className="text-lg mb-8">Secure, fast, and convenient. Your digital wallet for the modern world.</p>
        <div className="space-x-4">
          <button className="bg-white text-black px-6 py-3 rounded hover:bg-gray-300">Get Started</button>
          <button className="bg-gray-700 text-white px-6 py-3 rounded hover:bg-gray-600">Learn More</button>
        </div>
      </header>

      <section className={`py-16 bg-white transition-opacity duration-1000 ${isFeaturesVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold">Our Features</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center px-8 md:px-24">
          <div className="bg-gray-100 p-6 rounded-lg">
            <div className="text-3xl mb-4">📱</div>
            <h3 className="text-xl font-semibold mb-2">Mobile-First</h3>
            <p className="text-gray-600">Access your wallet anytime, anywhere with your mobile app.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg">
            <div className="text-3xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold mb-2">Secure</h3>
            <p className="text-gray-600">Bank-level encryption keeps your money and data safe.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Instant Transfers</h3>
            <p className="text-gray-600">Send and receive money in seconds, not days.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg">
            <div className="text-3xl mb-4">💳</div>
            <h3 className="text-xl font-semibold mb-2">Virtual Cards</h3>
            <p className="text-gray-600">Create virtual cards for safer online shopping.</p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Ready to Get Started?</h2>
        <p className="text-gray-600 mb-8">
          Join thousands of satisfied users who have made the switch to our e-wallet.
        </p>
        <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800" onClick={() => {
          router.push('/wallet');
        }}>
          Add Money To Your Wallet
        </button>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-8 text-center">
        <p>&copy; 2024 Monee Inc. All rights reserved.</p>
        <p>
          <a href="/terms" className="hover:underline">Terms of Service</a> | <a href="/privacy" className="hover:underline">Privacy</a>
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;

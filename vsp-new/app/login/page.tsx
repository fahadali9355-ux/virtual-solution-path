"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Lock, AlertCircle, Loader2 } from 'lucide-react'; // Loader icon add kiya
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // --- NEW: Loading State ---
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true); // Button ko loading mode mein daal do

    // Thora sa artificial delay taake animation smooth lage (Optional)
    await new Promise(resolve => setTimeout(resolve, 1000));

    const storedUser = localStorage.getItem("vsp_user");

    if (!storedUser) {
      setError("No account found. Please Sign Up first.");
      setIsLoading(false); // Loading band karo agar error hai
      return;
    }

    const userData = JSON.parse(storedUser);
    const cleanEmail = email.trim();
    const cleanPassword = password.trim();
    const storedEmail = userData.email.trim();
    const storedPassword = userData.password ? userData.password.trim() : "";

    if (cleanEmail === storedEmail && cleanPassword === storedPassword) {
      // SUCCESS: Dashboard par bhejo
      router.push('/dashboard');
      // Note: Yahan setIsLoading(false) nahi karenge kyunki hum page change kar rahe hain
    } else {
      setError("Invalid email or password.");
      setIsLoading(false); // Ghalat password par wapis button enable karo
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full h-64 bg-[#082F49]"></div>
      <div className="absolute top-10 right-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative z-10 border border-slate-100"
      >
        <Link href="/" className="absolute top-6 left-6 text-slate-400 hover:text-[#0284C7] transition-colors">
          <ArrowLeft size={20} />
        </Link>

        <div className="text-center mb-8 mt-4">
          <div className="flex justify-center mb-4">
            <img src="/images/img1.png" alt="VSP Logo" className="w-16 h-16 object-contain" />
          </div>
          <h2 className="text-2xl font-bold text-[#082F49]">Welcome Back</h2>
          <p className="text-slate-500 text-sm mt-2">Please sign in to your VSP account</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-4 bg-red-50 text-red-600 text-sm p-3 rounded-lg flex items-center gap-2 border border-red-100"
          >
            <AlertCircle size={16} />
            {error}
          </motion.div>
        )}

        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
              <input 
                type="email" 
                placeholder="student@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 font-medium text-sm rounded-lg focus:ring-[#0284C7] focus:border-[#0284C7] block pl-10 p-3 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-900 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
              <input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-300 text-slate-900 font-medium text-sm rounded-lg focus:ring-[#0284C7] focus:border-[#0284C7] block pl-10 p-3 outline-none transition-all"
              />
            </div>
          </div>

          {/* --- UPDATED BUTTON --- */}
          <button 
            type="submit" 
            disabled={isLoading} // Button disable jab loading ho
            className={`w-full text-white font-bold rounded-lg text-sm px-5 py-3.5 shadow-lg transform transition-all 
              ${isLoading 
                ? 'bg-slate-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-[#0284C7] to-[#0EA5E9] hover:from-[#0369A1] hover:to-[#0284C7] hover:-translate-y-0.5 shadow-blue-500/30'
              } flex items-center justify-center gap-2`}
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-slate-500 font-medium">
          Don't have an account? <Link href="/signup" className="text-[#0284C7] font-bold hover:underline">Sign up</Link>
        </div>
      </motion.div>
    </div>
  );
}
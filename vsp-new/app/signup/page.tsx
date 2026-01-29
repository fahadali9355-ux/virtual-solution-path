"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Lock, User, Phone } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: ''
  });

  // --- FIXED FUNCTION ---
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault(); // <--- YE SABSE ZAROORI HAI (Page Refresh Rokta Hai)

    // Check fields
    if (!formData.fullName || !formData.email || !formData.password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      // 1. Data Object Create karein
      const userData = {
        name: formData.fullName.trim(),
        email: formData.email.trim(),
        password: formData.password.trim()
      };

      // 2. LocalStorage mein Save karein
      localStorage.setItem("vsp_user", JSON.stringify(userData));

      // 3. Confirmation Alert (Taake pata chale save hua)
      alert("Account Created Successfully! Now Login.");

      // 4. Login Page par bhejein
      router.push('/login');
      
    } catch (error) {
      alert("Error saving data. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-64 bg-[#082F49]"></div>
      <div className="absolute top-10 left-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative z-10 border border-slate-100"
      >
        <Link href="/" className="absolute top-6 left-6 text-slate-400 hover:text-[#0284C7] transition-colors"><ArrowLeft size={20} /></Link>

        <div className="text-center mb-8 mt-4">
          <div className="flex justify-center mb-4"><img src="/images/img1.png" alt="VSP Logo" className="w-16 h-16 object-contain" /></div>
          <h2 className="text-2xl font-bold text-[#082F49]">Create Account</h2>
          <p className="text-slate-600 text-sm mt-2 font-medium">Join Virtual Solution Path today</p>
        </div>

        {/* Form Tag par onSubmit lagaya hai */}
        <form className="space-y-4" onSubmit={handleSignup}>
          <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-xs font-bold text-slate-900 mb-1">Full Name</label>
                <div className="relative">
                <User className="absolute left-3 top-2.5 text-slate-500" size={16} />
                <input type="text" placeholder="John Doe" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="w-full bg-slate-50 border border-slate-300 text-slate-900 font-medium text-sm rounded-lg p-2.5 pl-9 outline-none focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7]" />
                </div>
            </div>
            <div>
                <label className="block text-xs font-bold text-slate-900 mb-1">Phone</label>
                <div className="relative">
                <Phone className="absolute left-3 top-2.5 text-slate-500" size={16} />
                <input type="text" placeholder="+92 300..." value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-slate-50 border border-slate-300 text-slate-900 font-medium text-sm rounded-lg p-2.5 pl-9 outline-none focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7]" />
                </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-900 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 text-slate-500" size={16} />
              <input type="email" placeholder="student@example.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-slate-50 border border-slate-300 text-slate-900 font-medium text-sm rounded-lg p-2.5 pl-9 outline-none focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7]" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-900 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 text-slate-500" size={16} />
              <input type="password" placeholder="Create a strong password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full bg-slate-50 border border-slate-300 text-slate-900 font-medium text-sm rounded-lg p-2.5 pl-9 outline-none focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7]" />
            </div>
          </div>

          {/* Button Type changed to SUBMIT */}
          <button type="submit" className="w-full text-white bg-[#0284C7] hover:bg-[#0369A1] font-bold rounded-lg text-sm px-5 py-3.5 shadow-lg mt-2 transition-all transform hover:-translate-y-0.5">
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600 font-medium">
          Already have an account? <Link href="/login" className="text-[#0284C7] font-bold hover:underline">Log in</Link>
        </div>
      </motion.div>
    </div>
  );
}
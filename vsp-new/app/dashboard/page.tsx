"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, Clock, Award } from 'lucide-react';

export default function DashboardHome() {
  const [userName, setUserName] = useState("Student");

  // Fetch name from storage
  useEffect(() => {
    const storedUser = localStorage.getItem("vsp_user");
    if (storedUser) {
      const { name } = JSON.parse(storedUser);
      // Get first name only for the welcome message
      setUserName(name.split(" ")[0]);
    }
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      
      {/* DYNAMIC WELCOME HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#082F49]">Welcome back, {userName}! 👋</h1>
        <p className="text-slate-500 mt-1">You have made great progress this week. Keep it up!</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { label: "Courses in Progress", value: "3", icon: PlayCircle, color: "bg-blue-500" },
          { label: "Hours Learned", value: "12.5", icon: Clock, color: "bg-cyan-500" },
          { label: "Certificates Won", value: "1", icon: Award, color: "bg-purple-500" }
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4"
          >
            <div className={`w-12 h-12 rounded-xl ${stat.color} text-white flex items-center justify-center shadow-lg shadow-blue-500/20`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold text-[#082F49]">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Resume Learning Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#082F49]">Continue Learning</h2>
          <button className="text-[#0284C7] text-sm font-semibold hover:underline">View All</button>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col md:flex-row gap-6 items-center"
        >
          {/* Course Thumbnail */}
          <div className="w-full md:w-64 h-40 rounded-xl overflow-hidden relative shrink-0 group">
            <img 
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1472&auto=format&fit=crop" 
              alt="Web Dev" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <PlayCircle size={40} className="text-white drop-shadow-lg" />
            </div>
          </div>

          {/* Course Info */}
          <div className="flex-1 w-full">
            <div className="flex justify-between items-start mb-2">
              <span className="bg-blue-100 text-[#0284C7] text-xs font-bold px-3 py-1 rounded-full">Web Development</span>
              <span className="text-slate-400 text-sm flex items-center gap-1"><Clock size={14}/> 2h 15m left</span>
            </div>
            <h3 className="text-lg font-bold text-[#082F49] mb-2">Full Stack Web Development Bootcamp</h3>
            <p className="text-slate-500 text-sm mb-4">Lesson 5: Understanding React Hooks & State</p>
            
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-2">
              <div className="bg-[#0284C7] h-full w-[65%] rounded-full"></div>
            </div>
            <div className="text-right text-xs font-bold text-[#0284C7]">65% Completed</div>
          </div>

          <button className="w-full md:w-auto bg-[#082F49] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#0284C7] transition-all shadow-lg shadow-blue-900/10">
            Resume
          </button>
        </motion.div>
      </section>

    </div>
  );
}
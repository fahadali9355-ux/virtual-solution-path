"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, PlayCircle, CheckCircle, Clock, MoreVertical } from 'lucide-react';

const MY_COURSES = [
  { 
    id: 1,
    title: "Full Stack Web Development", 
    instructor: "Sarah Johnson",
    progress: 65,
    totalLessons: 42,
    completedLessons: 27,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1472&auto=format&fit=crop",
    status: "Active",
    lastAccessed: "2 hours ago"
  },
  { 
    id: 2,
    title: "Digital Marketing Masterclass", 
    instructor: "Mark Benson",
    progress: 10,
    totalLessons: 30,
    completedLessons: 3,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop",
    status: "Active",
    lastAccessed: "1 day ago"
  },
  { 
    id: 3,
    title: "Graphic Design Fundamentals", 
    instructor: "Emily Carter",
    progress: 100,
    totalLessons: 25,
    completedLessons: 25,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop",
    status: "Completed",
    lastAccessed: "1 week ago"
  }
];

export default function MyCoursesPage() {
  const [filter, setFilter] = useState("All");

  const filteredCourses = MY_COURSES.filter(course => {
    if (filter === "All") return true;
    return course.status === filter;
  });

  return (
    <div className="max-w-6xl mx-auto">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
           <h1 className="text-2xl font-bold text-[#082F49]">My Courses</h1>
           <p className="text-slate-500 text-sm">Manage and resume your learning journey.</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
           {/* Search Bar */}
           <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search courses..." 
                className="w-full bg-white border border-slate-200 pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7]"
              />
           </div>
           
           {/* Filter Button */}
           <button className="bg-white border border-slate-200 p-2 rounded-lg text-slate-600 hover:bg-slate-50">
             <Filter size={20} />
           </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-6 border-b border-slate-200 mb-8">
        {['All', 'Active', 'Completed'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`pb-3 text-sm font-medium transition-all relative ${
              filter === tab ? 'text-[#0284C7]' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab}
            {filter === tab && (
              <motion.div 
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0284C7]"
              />
            )}
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <motion.div 
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            layout
            className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden group hover:shadow-md transition-shadow"
          >
            {/* Image Area */}
            <div className="h-40 bg-slate-200 relative">
               <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <button className="bg-white/20 backdrop-blur-md border border-white/50 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-white hover:text-[#082F49] transition-all">
                    <PlayCircle size={16} /> Continue
                 </button>
               </div>
            </div>

            {/* Content Area */}
            <div className="p-5">
               <div className="flex justify-between items-start mb-2">
                 <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                   course.status === "Completed" ? "bg-green-100 text-green-700" : "bg-blue-50 text-blue-700"
                 }`}>
                   {course.status}
                 </span>
                 <button className="text-slate-400 hover:text-slate-600"><MoreVertical size={16}/></button>
               </div>

               <h3 className="font-bold text-[#082F49] mb-1 line-clamp-1" title={course.title}>{course.title}</h3>
               <p className="text-xs text-slate-500 mb-4">Instructor: {course.instructor}</p>

               {/* Progress Bar */}
               <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1.5 font-medium">
                    <span className="text-slate-600">{course.progress}% Complete</span>
                    <span className="text-slate-400">{course.completedLessons}/{course.totalLessons} Lessons</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${course.status === 'Completed' ? 'bg-green-500' : 'bg-[#0284C7]'}`} 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
               </div>

               <div className="pt-4 border-t border-slate-50 flex justify-between items-center text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> Last: {course.lastAccessed}
                  </span>
                  {course.status === "Completed" && (
                    <span className="flex items-center gap-1 text-green-600 font-bold">
                       <CheckCircle size={14} /> Certified
                    </span>
                  )}
               </div>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}
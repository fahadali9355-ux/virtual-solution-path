"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, BookOpen, Award, Settings, LogOut, Menu, User } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  
  // State for User Data
  const [user, setUser] = useState({ name: "Student Name", email: "student@vsp.com" });

  // Load user from LocalStorage when page loads
  useEffect(() => {
    const storedUser = localStorage.getItem("vsp_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    // Clear data and redirect
    localStorage.removeItem("vsp_user");
    router.push("/login");
  };

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: BookOpen, label: "My Courses", href: "/dashboard/courses" },
    { icon: Award, label: "Certificates", href: "/dashboard/certificates" },
    { icon: User, label: "Profile", href: "/dashboard/profile" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      
      {/* Mobile Overlay */}
      {isSidebarOpen && ( <div className="fixed inset-0 bg-slate-900/50 z-40 md:hidden" onClick={() => setIsSidebarOpen(false)} /> )}

      {/* SIDEBAR */}
      <aside className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-[#082F49] text-white transition-transform duration-300 ease-in-out flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        
        {/* Logo */}
        <div className="h-20 flex items-center gap-3 px-6 border-b border-white/10">
          <img src="/images/img1.png" alt="VSP Logo" className="w-8 h-8 object-contain brightness-0 invert" />
          <span className="font-bold text-xl tracking-tight">VSP.</span>
        </div>

        {/* Menu */}
        <nav className="flex-1 py-6 px-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive ? 'bg-[#0284C7] text-white shadow-md' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
                <item.icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* DYNAMIC USER PROFILE SECTION */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-4 px-2">
            {/* Initial Letter Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 border-2 border-white/20 flex items-center justify-center font-bold text-white uppercase">
              {user.name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-white truncate w-32">{user.name}</p>
              <p className="text-xs text-slate-400 truncate w-32">{user.email}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg text-sm font-medium transition-colors">
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:hidden">
          <div className="flex items-center gap-2 font-bold text-[#082F49]">
            <img src="/images/img1.png" alt="Logo" className="w-8 h-8" />
            <span>VSP</span>
          </div>
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-slate-600"><Menu size={24} /></button>
        </header>
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
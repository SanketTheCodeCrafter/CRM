import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#13131f] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 px-4 py-6 md:p-8 space-y-6 max-w-[1600px] mx-auto w-full overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

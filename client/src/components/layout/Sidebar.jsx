import React from 'react';
import { NavLink } from 'react-router-dom';
import { BarChart3, Users, Settings, LifeBuoy } from 'lucide-react';

export default function Sidebar() {
  const menuItems = [
    { icon: Users, label: 'Leads', path: '/' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 min-h-[calc(100vh-4rem)] transition duration-200">
      <nav className="flex-1 space-y-1.5 px-4 py-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition duration-150 ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white text-slate-500 dark:text-slate-400'
                }`
              }
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-slate-100 dark:border-slate-800/60">
        <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition duration-150">
          <LifeBuoy className="h-5 w-5" />
          <span>Support & Help</span>
        </button>
      </div>
    </aside>
  );
}

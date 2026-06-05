import React from 'react';
import { Plus, Users } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useLeads } from '../../context/LeadContext';

export default function Navbar() {
  const { dispatch } = useLeads();

  const handleAddLeadClick = () => {
    dispatch({ type: 'OPEN_DRAWER', payload: null });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800/80 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md transition duration-200">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 dark:bg-indigo-500 shadow-md shadow-indigo-500/20 text-white">
            <Users className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            LeadFlow<span className="text-indigo-600 dark:text-indigo-400">.</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          <button
            onClick={handleAddLeadClick}
            className="flex items-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-4 py-2.5 text-sm font-semibold shadow-md hover:shadow-indigo-500/25 transition duration-150"
          >
            <Plus className="h-4.5 w-4.5" />
            <span>Add Lead</span>
          </button>
        </div>
      </div>
    </header>
  );
}

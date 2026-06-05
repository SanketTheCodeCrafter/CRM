import React from 'react';
import { Search, FolderOpen, Plus } from 'lucide-react';
import { useLeads } from '../../context/LeadContext';

export default function EmptyState({ isFilterActive }) {
  const { dispatch } = useLeads();

  const handleCreateClick = () => {
    dispatch({ type: 'OPEN_DRAWER', payload: null });
  };

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white dark:bg-slate-900 border border-t-0 border-slate-200 dark:border-slate-800 rounded-b-xl min-h-[300px]">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 mb-4">
        {isFilterActive ? <Search className="h-6 w-6" /> : <FolderOpen className="h-6 w-6" />}
      </div>
      
      <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1">
        {isFilterActive ? 'No matching leads found' : 'No leads in database'}
      </h3>
      
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-6">
        {isFilterActive
          ? 'Try adjusting your search terms or status filters to locate the records you are looking for.'
          : 'Start building your sales pipeline by adding your very first lead or customer details.'}
      </p>

      {!isFilterActive && (
        <button
          onClick={handleCreateClick}
          className="flex items-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-4 py-2.5 text-sm font-semibold shadow-md hover:shadow-indigo-500/25 transition duration-150"
        >
          <Plus className="h-4.5 w-4.5" />
          <span>Add Your First Lead</span>
        </button>
      )}
    </div>
  );
}

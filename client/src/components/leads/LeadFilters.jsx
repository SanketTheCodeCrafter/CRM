import React, { useState, useEffect } from 'react';
import { Search, LayoutGrid, List, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { useLeads } from '../../context/LeadContext';
import { useDebounce } from '../../hooks/useDebounce';
import { STATUS_OPTIONS } from '../../utils/constants';

export default function LeadFilters() {
  const { state, dispatch } = useLeads();
  const { filters, view } = state;
  const [searchTerm, setSearchTerm] = useState(filters.search);

  // Debounce search value by 400ms
  const debouncedSearch = useDebounce(searchTerm, 400);

  useEffect(() => {
    dispatch({ type: 'SET_FILTER', payload: { search: debouncedSearch } });
  }, [debouncedSearch, dispatch]);

  const handleStatusChange = (e) => {
    dispatch({ type: 'SET_FILTER', payload: { status: e.target.value } });
  };

  const handleSortByChange = (e) => {
    dispatch({ type: 'SET_FILTER', payload: { sortBy: e.target.value } });
  };

  const toggleSortOrder = () => {
    const nextOrder = filters.sortOrder === 'asc' ? 'desc' : 'asc';
    dispatch({ type: 'SET_FILTER', payload: { sortOrder: nextOrder } });
  };

  const setViewMode = (mode) => {
    dispatch({ type: 'SET_VIEW', payload: mode });
  };

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 p-4 rounded-xl shadow-sm">
      {/* Search Bar */}
      <div className="relative flex-1 max-w-md">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-4.5 w-4.5 text-slate-400 dark:text-slate-500" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name, email, or company..."
          className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 py-2.5 pl-10 pr-4 text-sm text-slate-950 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 hover:border-slate-300 dark:hover:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none transition duration-150"
        />
      </div>

      {/* Filters & Sorting */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Status Filter */}
        <div className="flex items-center gap-1.5">
          <label htmlFor="status-filter" className="sr-only">Status</label>
          <select
            id="status-filter"
            value={filters.status}
            onChange={handleStatusChange}
            className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 focus:border-indigo-500 focus:outline-none transition duration-150"
          >
            <option value="">All Statuses</option>
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By Field */}
        <div className="flex items-center gap-1.5">
          <select
            value={filters.sortBy}
            onChange={handleSortByChange}
            className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 focus:border-indigo-500 focus:outline-none transition duration-150"
          >
            <option value="createdAt">Date Created</option>
            <option value="name">Name</option>
            <option value="company">Company</option>
          </select>

          {/* Sort Order Toggle */}
          <button
            onClick={toggleSortOrder}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition duration-150"
            title={filters.sortOrder === 'asc' ? 'Sort Ascending' : 'Sort Descending'}
          >
            <ArrowUpDown className={`h-4.5 w-4.5 transition duration-200 ${filters.sortOrder === 'desc' ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <div className="h-6 w-px bg-slate-200 dark:bg-slate-800"></div>

        {/* View Toggle */}
        <div className="flex items-center rounded-lg border border-slate-200 dark:border-slate-800 p-0.5 bg-slate-50 dark:bg-slate-950/40">
          <button
            onClick={() => setViewMode('table')}
            className={`flex h-8 w-8 items-center justify-center rounded-md transition duration-150 ${
              view === 'table'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
            }`}
            title="Table View"
          >
            <List className="h-4.5 w-4.5" />
          </button>
          <button
            onClick={() => setViewMode('kanban')}
            className={`flex h-8 w-8 items-center justify-center rounded-md transition duration-150 ${
              view === 'kanban'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
            }`}
            title="Kanban Board"
          >
            <LayoutGrid className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLeads } from '../../context/LeadContext';

export default function Pagination() {
  const { state, dispatch } = useLeads();
  const { pagination, loading } = state;
  const { page, limit, total, totalPages } = pagination;

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
      dispatch({ type: 'SET_PAGE', payload: newPage });
    }
  };

  if (total === 0) return null;

  const startIdx = (page - 1) * limit + 1;
  const endIdx = Math.min(page * limit, total);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let start = Math.max(1, page - 2);
      let end = Math.min(totalPages, page + 2);
      
      if (start === 1) {
        end = maxVisiblePages;
      } else if (end === totalPages) {
        start = totalPages - maxVisiblePages + 1;
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 px-4 py-4 sm:px-6 rounded-b-xl">
      {/* Mobile view */}
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1 || loading}
          className="relative inline-flex items-center rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150"
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages || loading}
          className="relative ml-3 inline-flex items-center rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150"
        >
          Next
        </button>
      </div>

      {/* Desktop view */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Showing <span className="font-semibold text-slate-900 dark:text-white">{startIdx}</span> to{' '}
            <span className="font-semibold text-slate-900 dark:text-white">{endIdx}</span> of{' '}
            <span className="font-semibold text-slate-900 dark:text-white">{total}</span> leads
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1 || loading}
              className="relative inline-flex items-center rounded-l-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-2 py-2 text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/60 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* Page Buttons */}
            {getPageNumbers().map((p) => (
              <button
                key={p}
                onClick={() => handlePageChange(p)}
                disabled={loading}
                aria-current={p === page ? 'page' : undefined}
                className={`relative inline-flex items-center border px-4 py-2 text-sm font-semibold transition duration-150 ${
                  p === page
                    ? 'z-10 bg-indigo-600 border-indigo-600 text-white dark:bg-indigo-500 dark:border-indigo-500'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                {p}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages || loading}
              className="relative inline-flex items-center rounded-r-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-2 py-2 text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/60 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150"
            >
              <span className="sr-only">Next</span>
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}

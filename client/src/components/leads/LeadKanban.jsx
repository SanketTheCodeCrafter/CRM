import React from 'react';
import LeadCard from './LeadCard';
import { useLeads } from '../../context/LeadContext';
import { STATUS_OPTIONS, STATUS_STYLES } from '../../utils/constants';

export default function LeadKanban({ onStatusChange }) {
  const { state } = useLeads();
  const { leads, loading } = state;

  // Group leads by status
  const leadsByStatus = STATUS_OPTIONS.reduce((acc, status) => {
    acc[status] = leads.filter((lead) => lead.status === status);
    return acc;
  }, {});

  const getHeaderColor = (status) => {
    switch (status) {
      case 'New':
        return 'border-t-2 border-blue-500 bg-blue-50/30 dark:bg-blue-950/10';
      case 'Contacted':
        return 'border-t-2 border-amber-500 bg-amber-50/30 dark:bg-amber-950/10';
      case 'Qualified':
        return 'border-t-2 border-purple-500 bg-purple-50/30 dark:bg-purple-950/10';
      case 'Converted':
        return 'border-t-2 border-emerald-500 bg-emerald-50/30 dark:bg-emerald-950/10';
      case 'Lost':
        return 'border-t-2 border-rose-500 bg-rose-50/30 dark:bg-rose-950/10';
      default:
        return 'border-t-2 border-slate-500';
    }
  };

  const getBadgeColor = (status) => {
    switch (status) {
      case 'New':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300';
      case 'Contacted':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300';
      case 'Qualified':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300';
      case 'Converted':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300';
      case 'Lost':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4 items-start min-h-[600px]">
      {STATUS_OPTIONS.map((status) => {
        const columnLeads = leadsByStatus[status] || [];
        const count = columnLeads.length;

        return (
          <div
            key={status}
            className={`flex flex-col rounded-xl border border-slate-200 dark:border-slate-800/80 bg-slate-50/45 dark:bg-slate-900/40 p-3 min-w-[220px] max-h-[650px] overflow-y-auto ${getHeaderColor(
              status
            )}`}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4 px-1.5">
              <span className="font-bold text-sm text-slate-800 dark:text-slate-250">
                {status}
              </span>
              <span className={`text-xs font-bold rounded-full px-2 py-0.5 ${getBadgeColor(status)}`}>
                {count}
              </span>
            </div>

            {/* Column Body / Cards List */}
            <div className="flex flex-col gap-3 flex-1">
              {loading && leads.length === 0 ? (
                // Pulse skeletons per column
                [...Array(2)].map((_, i) => (
                  <div
                    key={i}
                    className="h-32 rounded-xl border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900 p-4 animate-pulse flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-850 rounded mb-2"></div>
                      <div className="h-3 w-1/2 bg-slate-150 dark:bg-slate-850 rounded"></div>
                    </div>
                    <div className="space-y-1.5 mt-2">
                      <div className="h-3 w-full bg-slate-150 dark:bg-slate-850 rounded"></div>
                      <div className="h-3 w-4/5 bg-slate-150 dark:bg-slate-850 rounded"></div>
                    </div>
                  </div>
                ))
              ) : count > 0 ? (
                columnLeads.map((lead) => (
                  <LeadCard
                    key={lead._id}
                    lead={lead}
                    onStatusChange={onStatusChange}
                  />
                ))
              ) : (
                // Dashed empty column container
                <div className="flex flex-col items-center justify-center border border-dashed border-slate-300 dark:border-slate-800 rounded-xl p-6 text-center text-xs text-slate-400 dark:text-slate-500 py-10">
                  No leads in {status}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

import React from 'react';
import LeadTableRow from './LeadTableRow';
import EmptyState from '../ui/EmptyState';
import { useLeads } from '../../context/LeadContext';

export default function LeadTable({ onStatusChange }) {
  const { state } = useLeads();
  const { leads, loading, filters } = state;

  const isFilterActive = filters.search || filters.status;

  if (loading && leads.length === 0) {
    // Skeletons
    return (
      <div className="overflow-x-auto border border-slate-200 dark:border-slate-800/80 rounded-xl bg-white dark:bg-slate-900 shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
          <thead className="bg-slate-50 dark:bg-slate-950/40 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Name & Email</th>
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Created Date</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-slate-900">
            {[...Array(5)].map((_, i) => (
              <tr key={i} className="animate-pulse">
                <td className="px-6 py-5">
                  <div className="h-4 w-28 bg-slate-200 dark:bg-slate-800 rounded mb-1.5"></div>
                  <div className="h-3 w-36 bg-slate-150 dark:bg-slate-850 rounded"></div>
                </td>
                <td className="px-6 py-5">
                  <div className="h-4 w-20 bg-slate-150 dark:bg-slate-850 rounded"></div>
                </td>
                <td className="px-6 py-5">
                  <div className="h-3 w-28 bg-slate-150 dark:bg-slate-850 rounded font-mono"></div>
                </td>
                <td className="px-6 py-5">
                  <div className="h-6 w-16 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
                </td>
                <td className="px-6 py-5">
                  <div className="h-3 w-16 bg-slate-150 dark:bg-slate-850 rounded"></div>
                </td>
                <td className="px-6 py-5">
                  <div className="h-8 w-12 bg-slate-200 dark:bg-slate-800 rounded ml-auto"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="border border-slate-200 dark:border-slate-800/80 rounded-xl shadow-sm bg-white dark:bg-slate-900">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
          <thead className="bg-slate-50 dark:bg-slate-950/40 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Name & Email</th>
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Created Date</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
        </table>
        <EmptyState isFilterActive={isFilterActive} />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-slate-200 dark:border-slate-800/80 rounded-t-xl bg-white dark:bg-slate-900 shadow-sm">
      <table className="min-w-full divide-y divide-slate-250 dark:divide-slate-800">
        <thead className="bg-slate-50 dark:bg-slate-950/40 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
          <tr>
            <th className="px-6 py-4">Name & Email</th>
            <th className="px-6 py-4">Company</th>
            <th className="px-6 py-4">Phone</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Created Date</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-slate-900">
          {leads.map((lead) => (
            <LeadTableRow
              key={lead._id}
              lead={lead}
              onStatusChange={onStatusChange}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

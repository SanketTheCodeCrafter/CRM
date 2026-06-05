import React from 'react';
import { Users, Sparkles, PhoneCall, CheckCircle, TrendingUp } from 'lucide-react';
import { useLeads } from '../../context/LeadContext';

export default function StatsCards() {
  const { state } = useLeads();
  const { stats, loading } = state;

  const cardConfig = [
    {
      title: 'Total Leads',
      value: stats.total,
      icon: Users,
      color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
      label: 'Overall database size',
    },
    {
      title: 'New Leads',
      value: stats.new,
      icon: Sparkles,
      color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
      label: 'Awaiting first contact',
    },
    {
      title: 'Contacted',
      value: stats.contacted,
      icon: PhoneCall,
      color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
      label: 'Initial outreach made',
    },
    {
      title: 'Qualified',
      value: stats.qualified,
      icon: TrendingUp,
      color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
      label: 'Sales-ready opportunities',
    },
    {
      title: 'Converted',
      value: stats.converted,
      icon: CheckCircle,
      color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
      label: 'Won deals & partnerships',
    },
  ];

  if (loading && stats.total === 0) {
    // Stat skeletons
    return (
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-28 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 animate-pulse flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded"></div>
              <div className="h-8 w-8 rounded-lg bg-slate-200 dark:bg-slate-800"></div>
            </div>
            <div className="h-7 w-12 bg-slate-200 dark:bg-slate-800 rounded mt-2"></div>
          </div>
        ))}
      </div>
    );
  }

  // Calculate Win/Loss details for conversion rate info
  const conversionRate = stats.total > 0 ? Math.round((stats.converted / stats.total) * 100) : 0;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {cardConfig.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-5 shadow-sm dark:shadow-black/10 hover:shadow-md transition duration-200 flex flex-col justify-between relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {card.title}
                </span>
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${card.color}`}>
                  <Icon className="h-4.5 w-4.5" />
                </div>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {card.value}
                </span>
                {card.title === 'Converted' && stats.total > 0 && (
                  <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-1.5 py-0.5 rounded-md border border-emerald-150 dark:border-emerald-900/30">
                    {conversionRate}% rate
                  </span>
                )}
              </div>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-2 truncate">
                {card.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

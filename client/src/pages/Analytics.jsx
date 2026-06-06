import React, { useState, useEffect } from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  AreaChart, Area,
} from 'recharts';
import {
  TrendingUp, TrendingDown, Users, Target, Award,
  ArrowUpRight, Activity, Clock,
} from 'lucide-react';
import { fetchStatsApi, fetchLeadsApi } from '../api/leadsApi';
import { toast } from 'react-hot-toast';

const STATUS_COLORS = {
  New: '#3b82f6',
  Contacted: '#f59e0b',
  Qualified: '#8b5cf6',
  Converted: '#10b981',
  Lost: '#ef4444',
};

export default function Analytics() {
  const [stats, setStats] = useState(null);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      setLoading(true);
      try {
        const [statsRes, leadsRes] = await Promise.all([
          fetchStatsApi(),
          fetchLeadsApi({ page: 1, limit: 100, sortBy: 'createdAt', sortOrder: 'desc' }),
        ]);
        if (statsRes.success) setStats(statsRes.data);
        if (leadsRes.success) setLeads(leadsRes.data);
      } catch (error) {
        console.error('[Analytics Error]', error);
        toast.error('Failed to load analytics data.');
      } finally {
        setLoading(false);
      }
    };
    loadAnalytics();
  }, []);

  if (loading || !stats) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Analytics Overview</h2>
          <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">Loading insights from your lead pipeline...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-80 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  // Computed metrics
  const conversionRate = stats.total > 0 ? ((stats.converted / stats.total) * 100).toFixed(1) : 0;
  const lossRate = stats.total > 0 ? ((stats.lost / stats.total) * 100).toFixed(1) : 0;
  const activeLeads = stats.total - stats.converted - stats.lost;
  const pipelineHealth = stats.total > 0 ? (((stats.qualified + stats.contacted) / stats.total) * 100).toFixed(0) : 0;

  // Pie Chart Data
  const pieData = [
    { name: 'New', value: stats.new, color: STATUS_COLORS.New },
    { name: 'Contacted', value: stats.contacted, color: STATUS_COLORS.Contacted },
    { name: 'Qualified', value: stats.qualified, color: STATUS_COLORS.Qualified },
    { name: 'Converted', value: stats.converted, color: STATUS_COLORS.Converted },
    { name: 'Lost', value: stats.lost, color: STATUS_COLORS.Lost },
  ].filter(item => item.value > 0);

  // Bar Chart Data
  const barData = [
    { name: 'New', count: stats.new, fill: STATUS_COLORS.New },
    { name: 'Contacted', count: stats.contacted, fill: STATUS_COLORS.Contacted },
    { name: 'Qualified', count: stats.qualified, fill: STATUS_COLORS.Qualified },
    { name: 'Converted', count: stats.converted, fill: STATUS_COLORS.Converted },
    { name: 'Lost', count: stats.lost, fill: STATUS_COLORS.Lost },
  ];

  // Company Distribution
  const companyMap = {};
  leads.forEach(lead => {
    companyMap[lead.company] = (companyMap[lead.company] || 0) + 1;
  });
  const companyData = Object.entries(companyMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([name, count]) => ({ name, count }));

  // Recent Activity (last 7 leads)
  const recentLeads = leads.slice(0, 7);

  // Funnel Data
  const funnelData = [
    { stage: 'Total', value: stats.total },
    { stage: 'Contacted', value: stats.contacted + stats.qualified + stats.converted },
    { stage: 'Qualified', value: stats.qualified + stats.converted },
    { stage: 'Converted', value: stats.converted },
  ];

  const kpiCards = [
    {
      title: 'Conversion Rate',
      value: `${conversionRate}%`,
      subtitle: `${stats.converted} of ${stats.total} leads`,
      icon: TrendingUp,
      color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30',
    },
    {
      title: 'Active Pipeline',
      value: activeLeads,
      subtitle: 'Leads in progress',
      icon: Activity,
      color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30',
    },
    {
      title: 'Pipeline Health',
      value: `${pipelineHealth}%`,
      subtitle: 'Contacted + Qualified',
      icon: Target,
      color: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/30',
    },
    {
      title: 'Loss Rate',
      value: `${lossRate}%`,
      subtitle: `${stats.lost} leads lost`,
      icon: TrendingDown,
      color: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30',
    },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 shadow-lg">
          <p className="text-xs font-semibold text-slate-900 dark:text-white">{payload[0].payload.name || payload[0].payload.stage}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{payload[0].value} leads</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
          Analytics Overview
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-500">
          Detailed insights into your lead pipeline performance and conversion metrics.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-5 shadow-sm hover:shadow-md transition duration-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {card.title}
                </span>
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${card.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {card.value}
              </div>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">{card.subtitle}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution Pie */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Status Distribution</h3>
          {pieData.length > 0 ? (
            <div className="flex items-center gap-6">
              <ResponsiveContainer width="50%" height={200}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-col gap-2.5">
                {pieData.map((entry, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: entry.color }}></div>
                    <span className="text-slate-600 dark:text-slate-300 font-medium">{entry.name}</span>
                    <span className="text-slate-400 dark:text-slate-500 font-semibold ml-auto">{entry.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-10 text-xs text-slate-400">No data available</div>
          )}
        </div>

        {/* Pipeline Funnel / Bar Chart */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Pipeline by Status</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:opacity-20" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {barData.map((entry, index) => (
                  <Cell key={`bar-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Funnel */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Sales Funnel</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={funnelData}>
              <defs>
                <linearGradient id="funnelGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:opacity-20" />
              <XAxis dataKey="stage" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2} fill="url(#funnelGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Leads by Company */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Leads by Company</h3>
          {companyData.length > 0 ? (
            <div className="space-y-3">
              {companyData.map((company, i) => {
                const maxCount = companyData[0].count;
                const widthPercent = (company.count / maxCount) * 100;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-xs text-slate-600 dark:text-slate-300 font-medium w-32 truncate" title={company.name}>
                      {company.name}
                    </span>
                    <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 dark:bg-indigo-400 rounded-full transition-all duration-500"
                        style={{ width: `${widthPercent}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 w-6 text-right">{company.count}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-10 text-xs text-slate-400">No data available</div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Recent Activity</h3>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase flex items-center gap-1">
            <Clock className="h-3 w-3" /> Last {recentLeads.length} entries
          </span>
        </div>
        <div className="space-y-3">
          {recentLeads.map((lead, i) => (
            <div key={lead._id} className="flex items-center gap-3 py-2 border-b border-slate-50 dark:border-slate-800/50 last:border-b-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold shrink-0">
                {lead.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">{lead.name}</p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate">{lead.company} · {lead.email}</p>
              </div>
              <span
                className="text-[10px] font-bold rounded-full px-2 py-0.5 border shrink-0"
                style={{
                  color: STATUS_COLORS[lead.status],
                  borderColor: STATUS_COLORS[lead.status] + '40',
                  backgroundColor: STATUS_COLORS[lead.status] + '10',
                }}
              >
                {lead.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

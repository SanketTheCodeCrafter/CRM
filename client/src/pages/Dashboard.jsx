import React, { useEffect, useCallback } from 'react';
import { useLeads } from '../context/LeadContext';
import StatsCards from '../components/dashboard/StatsCards';
import LeadFilters from '../components/leads/LeadFilters';
import LeadTable from '../components/leads/LeadTable';
import LeadKanban from '../components/leads/LeadKanban';
import Pagination from '../components/common/Pagination';
import LeadDrawer from '../components/leads/LeadDrawer';
import DeleteModal from '../components/leads/DeleteModal';
import { fetchLeadsApi, fetchStatsApi, updateLeadApi } from '../api/leadsApi';
import { toast } from 'react-hot-toast';

export default function Dashboard() {
  const { state, dispatch } = useLeads();
  const { filters, pagination, view } = state;

  // Reusable function to fetch leads & statistics in parallel
  const loadData = useCallback(async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      // Fetch stats and leads lists
      const [leadsResponse, statsResponse] = await Promise.all([
        fetchLeadsApi({
          page: pagination.page,
          limit: pagination.limit,
          search: filters.search,
          status: filters.status,
          sortBy: filters.sortBy,
          sortOrder: filters.sortOrder,
        }),
        fetchStatsApi(),
      ]);

      if (leadsResponse.success) {
        dispatch({
          type: 'FETCH_LEADS_SUCCESS',
          payload: {
            leads: leadsResponse.data,
            pagination: leadsResponse.pagination,
          },
        });
      }

      if (statsResponse.success) {
        dispatch({
          type: 'FETCH_STATS_SUCCESS',
          payload: statsResponse.data,
        });
      }
    } catch (error) {
      console.error('[Dashboard Fetch Error]', error);
      dispatch({ type: 'FETCH_ERROR' });
      toast.error('Failed to load CRM data. Please refresh.');
    }
  }, [
    pagination.page,
    pagination.limit,
    filters.search,
    filters.status,
    filters.sortBy,
    filters.sortOrder,
    dispatch,
  ]);

  // Trigger load on filter or page change
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Handler for quick status change (inline dropdown in row or kanban cards)
  const handleQuickStatusChange = async (leadId, newStatus) => {
    try {
      const response = await updateLeadApi(leadId, { status: newStatus });
      if (response.success) {
        toast.success(`Lead status updated to ${newStatus}`);
        loadData(); // Re-fetch to sync pagination lists and stats cards
      }
    } catch (error) {
      console.error('[Quick Status Change Error]', error);
      toast.error('Failed to update status. Please try again.');
    }
  };

  return (
    <>
      {/* Header text */}
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
          Leads Pipeline
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-500">
          Manage and track customer interactions, deal progress, and conversion milestones.
        </p>
      </div>

      {/* Statistics widgets */}
      <StatsCards />

      {/* Search, Filter, Sort and View toggles */}
      <LeadFilters />

      {/* Main Pipeline Display Area */}
      <div className="mt-6">
        {view === 'table' ? (
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800/80">
            <LeadTable onStatusChange={handleQuickStatusChange} />
            <Pagination />
          </div>
        ) : (
          <LeadKanban onStatusChange={handleQuickStatusChange} />
        )}
      </div>

      {/* Slide-out Add/Edit Lead Drawer */}
      <LeadDrawer onRefresh={loadData} />

      {/* Centered Delete Confirmation Dialog */}
      <DeleteModal onRefresh={loadData} />
    </>
  );
}


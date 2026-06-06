import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useSettings } from './SettingsContext';

const LeadContext = createContext();

const createInitialState = (leadsPerPage = 10, defaultView = 'table') => ({
  leads: [],
  stats: {
    total: 0,
    new: 0,
    contacted: 0,
    qualified: 0,
    converted: 0,
    lost: 0,
  },
  pagination: {
    page: 1,
    limit: leadsPerPage,
    total: 0,
    totalPages: 1,
  },
  filters: {
    search: '',
    status: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  },
  view: defaultView, // 'table' | 'kanban'
  loading: false,
  drawerOpen: false,
  selectedLead: null, // Lead being edited, or null for creating a new lead
  deleteModalOpen: false,
  leadToDelete: null,
});

const leadReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true };
    case 'FETCH_LEADS_SUCCESS':
      return {
        ...state,
        leads: action.payload.leads,
        pagination: action.payload.pagination,
        loading: false,
      };
    case 'FETCH_STATS_SUCCESS':
      return {
        ...state,
        stats: action.payload,
      };
    case 'FETCH_ERROR':
      return { ...state, loading: false };
    case 'SET_FILTER':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
        pagination: { ...state.pagination, page: 1 }, // Reset to page 1 on filter change
      };
    case 'SET_PAGE':
      return {
        ...state,
        pagination: { ...state.pagination, page: action.payload },
      };
    case 'SET_LIMIT':
      return {
        ...state,
        pagination: { ...state.pagination, limit: action.payload, page: 1 },
      };
    case 'SET_VIEW':
      return {
        ...state,
        view: action.payload,
      };
    case 'OPEN_DRAWER':
      return {
        ...state,
        drawerOpen: true,
        selectedLead: action.payload || null,
      };
    case 'CLOSE_DRAWER':
      return {
        ...state,
        drawerOpen: false,
        selectedLead: null,
      };
    case 'OPEN_DELETE_MODAL':
      return {
        ...state,
        deleteModalOpen: true,
        leadToDelete: action.payload,
      };
    case 'CLOSE_DELETE_MODAL':
      return {
        ...state,
        deleteModalOpen: false,
        leadToDelete: null,
      };
    default:
      return state;
  }
};

export const LeadProvider = ({ children }) => {
  const { settings } = useSettings();
  const [state, dispatch] = useReducer(
    leadReducer,
    createInitialState(settings.leadsPerPage, settings.defaultView)
  );

  // Sync leadsPerPage from settings whenever it changes
  useEffect(() => {
    if (state.pagination.limit !== settings.leadsPerPage) {
      dispatch({ type: 'SET_LIMIT', payload: settings.leadsPerPage });
    }
  }, [settings.leadsPerPage]);

  // Sync defaultView from settings whenever it changes
  useEffect(() => {
    if (state.view !== settings.defaultView) {
      dispatch({ type: 'SET_VIEW', payload: settings.defaultView });
    }
  }, [settings.defaultView]);

  return (
    <LeadContext.Provider value={{ state, dispatch }}>
      {children}
    </LeadContext.Provider>
  );
};

export const useLeads = () => {
  const context = useContext(LeadContext);
  if (!context) {
    throw new Error('useLeads must be used within a LeadProvider');
  }
  return context;
};

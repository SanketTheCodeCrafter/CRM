import React, { createContext, useContext, useReducer } from 'react';

const LeadContext = createContext();

const initialState = {
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
    limit: 10,
    total: 0,
    totalPages: 1,
  },
  filters: {
    search: '',
    status: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  },
  view: 'table', // 'table' | 'kanban'
  loading: false,
  drawerOpen: false,
  selectedLead: null, // Lead being edited, or null for creating a new lead
  deleteModalOpen: false,
  leadToDelete: null,
};

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
  const [state, dispatch] = useReducer(leadReducer, initialState);

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

import React from 'react';
import { Pencil, Trash2, Mail, Phone, Building, ArrowRightLeft } from 'lucide-react';
import { useLeads } from '../../context/LeadContext';
import { STATUS_STYLES, STATUS_OPTIONS } from '../../utils/constants';

export default function LeadCard({ lead, onStatusChange }) {
  const { dispatch } = useLeads();
  const { name, email, phone, company, status, notes } = lead;

  const handleEditClick = () => {
    dispatch({ type: 'OPEN_DRAWER', payload: lead });
  };

  const handleDeleteClick = () => {
    dispatch({ type: 'OPEN_DELETE_MODAL', payload: lead });
  };

  const statusStyle = STATUS_STYLES[status] || STATUS_STYLES.New;

  return (
    <div className="group relative rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm hover:shadow-md dark:shadow-black/10 hover:border-slate-300 dark:hover:border-slate-700/80 transition duration-150 flex flex-col gap-3">
      {/* Header Info */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col">
          <h4 className="font-bold text-sm text-slate-900 dark:text-white tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
            {name}
          </h4>
          <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-1">
            <Building className="h-3.5 w-3.5 opacity-80" />
            {company}
          </span>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <button
            onClick={handleEditClick}
            className="p-1 rounded text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition"
            title="Edit Lead"
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={handleDeleteClick}
            className="p-1 rounded text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition"
            title="Delete Lead"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Contact info */}
      <div className="space-y-1 text-slate-500 dark:text-slate-400 text-xs">
        <a
          href={`mailto:${email}`}
          className="flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
        >
          <Mail className="h-3.5 w-3.5 opacity-75" />
          <span className="truncate">{email}</span>
        </a>
        <a
          href={`tel:${phone}`}
          className="flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 transition font-mono"
        >
          <Phone className="h-3.5 w-3.5 opacity-75" />
          <span>{phone}</span>
        </a>
      </div>

      {/* Notes preview if present */}
      {notes && (
        <div className="bg-slate-50 dark:bg-slate-950/40 p-2 rounded-lg border border-slate-100 dark:border-slate-850/60 text-[11px] text-slate-600 dark:text-slate-450 italic line-clamp-2">
          {notes}
        </div>
      )}

      {/* Status switch action */}
      <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/60 pt-3 mt-1">
        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase flex items-center gap-1">
          <ArrowRightLeft className="h-3 w-3" /> Move:
        </span>
        <label htmlFor={`kanban-status-${lead._id}`} className="sr-only">Move Status</label>
        <select
          id={`kanban-status-${lead._id}`}
          value={status}
          onChange={(e) => onStatusChange(lead._id, e.target.value)}
          className={`text-[10px] font-extrabold rounded-full px-2 py-0.5 border focus:outline-none cursor-pointer transition ${statusStyle.bg} ${statusStyle.hover}`}
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt} value={opt} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-150">
              {opt}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

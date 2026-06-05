import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { useLeads } from '../../context/LeadContext';
import { STATUS_STYLES, STATUS_OPTIONS } from '../../utils/constants';
import { formatDate } from '../../utils/formatters';

export default function LeadTableRow({ lead, onStatusChange }) {
  const { dispatch } = useLeads();
  const { name, email, phone, company, status, createdAt } = lead;

  const handleEditClick = () => {
    dispatch({ type: 'OPEN_DRAWER', payload: lead });
  };

  const handleDeleteClick = () => {
    dispatch({ type: 'OPEN_DELETE_MODAL', payload: lead });
  };

  const statusStyle = STATUS_STYLES[status] || STATUS_STYLES.New;

  return (
    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 border-b border-slate-100 dark:border-slate-800/60 transition duration-150">
      {/* Name & Email */}
      <td className="whitespace-nowrap px-6 py-4">
        <div className="flex flex-col">
          <span className="font-semibold text-slate-900 dark:text-white text-sm">
            {name}
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500">
            {email}
          </span>
        </div>
      </td>

      {/* Company */}
      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700 dark:text-slate-300 font-medium">
        {company}
      </td>

      {/* Phone */}
      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500 dark:text-slate-400 font-mono">
        {phone}
      </td>

      {/* Status (with inline quick change) */}
      <td className="whitespace-nowrap px-6 py-4">
        <div className="flex items-center">
          <label htmlFor={`status-select-${lead._id}`} className="sr-only">Status</label>
          <select
            id={`status-select-${lead._id}`}
            value={status}
            onChange={(e) => onStatusChange(lead._id, e.target.value)}
            className={`text-xs font-semibold rounded-full px-2.5 py-1 border focus:outline-none transition cursor-pointer ${statusStyle.bg} ${statusStyle.hover}`}
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt} value={opt} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-150">
                {opt}
              </option>
            ))}
          </select>
        </div>
      </td>

      {/* Created Date */}
      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
        {formatDate(createdAt)}
      </td>

      {/* Actions */}
      <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
        <div className="flex items-center justify-end gap-2">
          {/* Edit Button */}
          <button
            onClick={handleEditClick}
            className="p-1.5 rounded-md text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/35 transition"
            title="Edit Lead"
          >
            <Pencil className="h-4.5 w-4.5" />
          </button>

          {/* Delete Button */}
          <button
            onClick={handleDeleteClick}
            className="p-1.5 rounded-md text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/35 transition"
            title="Delete Lead"
          >
            <Trash2 className="h-4.5 w-4.5" />
          </button>
        </div>
      </td>
    </tr>
  );
}

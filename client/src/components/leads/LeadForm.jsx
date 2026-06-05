import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { leadSchema } from '../../schemas/leadSchema';
import { STATUS_OPTIONS } from '../../utils/constants';

export default function LeadForm({ initialData, onSubmit, isSubmitting }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      status: 'New',
      notes: '',
    },
  });

  // Reset values when initialData changes (e.g. switching between new and edit)
  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        company: initialData.company || '',
        status: initialData.status || 'New',
        notes: initialData.notes || '',
      });
    } else {
      reset({
        name: '',
        email: '',
        phone: '',
        company: '',
        status: 'New',
        notes: '',
      });
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name-input" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          Full Name <span className="text-rose-500">*</span>
        </label>
        <input
          id="name-input"
          type="text"
          placeholder="e.g. John Doe"
          {...register('name')}
          className={`rounded-lg border bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition ${
            errors.name
              ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20'
              : 'border-slate-200 dark:border-slate-800 focus:border-indigo-500 dark:focus:border-indigo-500'
          }`}
        />
        {errors.name && (
          <span className="text-[11px] font-medium text-rose-600 dark:text-rose-450">
            {errors.name.message}
          </span>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email-input" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          Email Address <span className="text-rose-500">*</span>
        </label>
        <input
          id="email-input"
          type="email"
          placeholder="e.g. john@company.com"
          {...register('email')}
          className={`rounded-lg border bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition ${
            errors.email
              ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20'
              : 'border-slate-200 dark:border-slate-800 focus:border-indigo-500 dark:focus:border-indigo-500'
          }`}
        />
        {errors.email && (
          <span className="text-[11px] font-medium text-rose-600 dark:text-rose-450">
            {errors.email.message}
          </span>
        )}
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="phone-input" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          Phone Number <span className="text-rose-500">*</span>
        </label>
        <input
          id="phone-input"
          type="text"
          placeholder="e.g. +1 (555) 000-0000"
          {...register('phone')}
          className={`rounded-lg border bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition ${
            errors.phone
              ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20'
              : 'border-slate-200 dark:border-slate-800 focus:border-indigo-500 dark:focus:border-indigo-500'
          }`}
        />
        {errors.phone && (
          <span className="text-[11px] font-medium text-rose-600 dark:text-rose-450">
            {errors.phone.message}
          </span>
        )}
      </div>

      {/* Company */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="company-input" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          Company Name <span className="text-rose-500">*</span>
        </label>
        <input
          id="company-input"
          type="text"
          placeholder="e.g. Acme Industries"
          {...register('company')}
          className={`rounded-lg border bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition ${
            errors.company
              ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20'
              : 'border-slate-200 dark:border-slate-800 focus:border-indigo-500 dark:focus:border-indigo-500'
          }`}
        />
        {errors.company && (
          <span className="text-[11px] font-medium text-rose-600 dark:text-rose-450">
            {errors.company.message}
          </span>
        )}
      </div>

      {/* Status */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="status-select" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          Lead Status
        </label>
        <select
          id="status-select"
          {...register('status')}
          className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition"
        >
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        {errors.status && (
          <span className="text-[11px] font-medium text-rose-600 dark:text-rose-450">
            {errors.status.message}
          </span>
        )}
      </div>

      {/* Notes */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="notes-textarea" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          Notes / Comments
        </label>
        <textarea
          id="notes-textarea"
          rows={4}
          placeholder="Enter lead details, requests, or interactions..."
          {...register('notes')}
          className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition"
        />
        {errors.notes && (
          <span className="text-[11px] font-medium text-rose-600 dark:text-rose-450">
            {errors.notes.message}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="border-t border-slate-100 dark:border-slate-800 pt-4 flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-4 py-3 text-sm font-semibold shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition duration-150"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Saving Changes...</span>
            </>
          ) : (
            <span>Save Lead</span>
          )}
        </button>
      </div>
    </form>
  );
}

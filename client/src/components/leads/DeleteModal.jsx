import React, { useState } from 'react';
import { Loader2, AlertTriangle } from 'lucide-react';
import Modal from '../ui/Modal';
import { useLeads } from '../../context/LeadContext';
import { deleteLeadApi } from '../../api/leadsApi';
import { toast } from 'react-hot-toast';

export default function DeleteModal({ onRefresh }) {
  const { state, dispatch } = useLeads();
  const { deleteModalOpen, leadToDelete } = state;
  const [isDeleting, setIsDeleting] = useState(false);

  const handleClose = () => {
    dispatch({ type: 'CLOSE_DELETE_MODAL' });
  };

  const handleConfirmDelete = async () => {
    if (!leadToDelete) return;
    setIsDeleting(true);
    try {
      await deleteLeadApi(leadToDelete._id);
      toast.success('Lead deleted successfully');
      dispatch({ type: 'CLOSE_DELETE_MODAL' });
      onRefresh();
    } catch (error) {
      console.error('[Delete Lead Error]', error);
      toast.error('Failed to delete lead. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal isOpen={deleteModalOpen} onClose={handleClose} title="Delete Lead">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-50 dark:bg-rose-950/45 text-rose-600 dark:text-rose-450">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            Confirm Lead Removal
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
            Are you sure you want to delete <span className="font-semibold text-slate-800 dark:text-slate-200">"{leadToDelete?.name}"</span>? 
            This will permanently remove their records from your dashboard and pipeline. This action cannot be undone.
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6 border-t border-slate-100 dark:border-slate-800 pt-4">
        <button
          onClick={handleClose}
          disabled={isDeleting}
          className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 px-4 py-2.5 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800/60 transition disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirmDelete}
          disabled={isDeleting}
          className="flex items-center gap-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white px-4 py-2.5 text-xs font-semibold shadow-md hover:shadow-rose-500/20 transition disabled:opacity-50"
        >
          {isDeleting ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              <span>Deleting...</span>
            </>
          ) : (
            <span>Delete Lead</span>
          )}
        </button>
      </div>
    </Modal>
  );
}

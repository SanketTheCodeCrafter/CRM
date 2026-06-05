import React, { useState } from 'react';
import Drawer from '../ui/Drawer';
import LeadForm from './LeadForm';
import { useLeads } from '../../context/LeadContext';
import { createLeadApi, updateLeadApi } from '../../api/leadsApi';
import { toast } from 'react-hot-toast';

export default function LeadDrawer({ onRefresh }) {
  const { state, dispatch } = useLeads();
  const { drawerOpen, selectedLead } = state;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => {
    dispatch({ type: 'CLOSE_DRAWER' });
  };

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (selectedLead) {
        // Edit mode
        await updateLeadApi(selectedLead._id, formData);
        toast.success('Lead updated successfully!');
      } else {
        // Create mode
        await createLeadApi(formData);
        toast.success('Lead created successfully!');
      }
      dispatch({ type: 'CLOSE_DRAWER' });
      onRefresh(); // Trigger refresh on parent page
    } catch (error) {
      console.error('[Drawer Submit Error]', error);
      const errMsg = error.response?.data?.message || 'Failed to save lead. Please try again.';
      
      // If there are validation errors, log/show them
      if (error.response?.data?.data && Array.isArray(error.response.data.data)) {
        toast.error(error.response.data.data[0]);
      } else {
        toast.error(errMsg);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const title = selectedLead ? 'Edit Lead Details' : 'Add New Lead';

  return (
    <Drawer isOpen={drawerOpen} onClose={handleClose} title={title}>
      <LeadForm
        initialData={selectedLead}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </Drawer>
  );
}

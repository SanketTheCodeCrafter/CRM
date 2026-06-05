const express = require('express');
const router = express.Router();
const {
  getLeads,
  getLeadStats,
  createLead,
  updateLead,
  deleteLead,
} = require('../controllers/leadController');
const { validateCreateLead, validateUpdateLead } = require('../middleware/validateRequest');

// Leads routes mapping
router.route('/')
  .get(getLeads)
  .post(validateCreateLead, createLead);

router.route('/stats')
  .get(getLeadStats);

router.route('/:id')
  .put(validateUpdateLead, updateLead)
  .delete(deleteLead);

module.exports = router;

const express = require('express');
const router = express.Router();
const {
  getLeads,
  getLeadStats,
  createLead,
  updateLead,
  deleteLead,
} = require('../controllers/leadController');
const { validateLead } = require('../middleware/validateRequest');

// Leads routes mapping
router.route('/')
  .get(getLeads)
  .post(validateLead, createLead);

router.route('/stats')
  .get(getLeadStats);

router.route('/:id')
  .put(validateLead, updateLead)
  .delete(deleteLead);

module.exports = router;

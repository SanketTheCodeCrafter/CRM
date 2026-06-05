const apiResponse = require('../utils/apiResponse');

/**
 * Validates request payload for creating/updating leads.
 */
const validateLead = (req, res, next) => {
  const { name, email, phone, company, status } = req.body;
  const errors = [];

  // Check required fields
  if (!name || name.trim() === '') errors.push('Name is required');
  if (!email || email.trim() === '') errors.push('Email is required');
  if (!phone || phone.trim() === '') errors.push('Phone number is required');
  if (!company || company.trim() === '') errors.push('Company name is required');

  // Simple email regex validation
  if (email && email.trim() !== '') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      errors.push('Please provide a valid email address');
    }
  }

  // Status enum check
  if (status) {
    const validStatuses = ['New', 'Contacted', 'Qualified', 'Converted', 'Lost'];
    if (!validStatuses.includes(status)) {
      errors.push(`Status must be one of: ${validStatuses.join(', ')}`);
    }
  }

  if (errors.length > 0) {
    return res.status(400).json(apiResponse(false, errors, 'Validation failed'));
  }

  next();
};

module.exports = {
  validateLead,
};

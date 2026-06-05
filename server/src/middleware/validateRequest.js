const apiResponse = require('../utils/apiResponse');

/**
 * Validates request payload for creating leads.
 * All core fields are strictly required.
 */
const validateCreateLead = (req, res, next) => {
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

/**
 * Validates request payload for updating leads.
 * Fields are optional, but if they are provided, they must pass validation rules.
 */
const validateUpdateLead = (req, res, next) => {
  const { name, email, phone, company, status } = req.body;
  const errors = [];

  // If name is provided, it cannot be empty
  if (name !== undefined && name.trim() === '') {
    errors.push('Name cannot be empty');
  }

  // If email is provided, it cannot be empty and must be valid
  if (email !== undefined) {
    if (email.trim() === '') {
      errors.push('Email cannot be empty');
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        errors.push('Please provide a valid email address');
      }
    }
  }

  // If phone is provided, it cannot be empty
  if (phone !== undefined && phone.trim() === '') {
    errors.push('Phone number cannot be empty');
  }

  // If company is provided, it cannot be empty
  if (company !== undefined && company.trim() === '') {
    errors.push('Company name cannot be empty');
  }

  // If status is provided, it must be a valid option
  if (status !== undefined) {
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
  validateCreateLead,
  validateUpdateLead,
};

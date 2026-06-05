const apiResponse = require('../utils/apiResponse');

const errorHandler = (err, req, res, next) => {
  console.error('[Error Middleware]', err);

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let errors = null;

  // Mongoose duplicate key error (e.g. email already exists)
  if (err.code === 11000) {
    statusCode = 400;
    const keyName = Object.keys(err.keyValue)[0];
    message = `A lead with this ${keyName} already exists.`;
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error';
    errors = Object.values(err.errors).map(val => val.message);
  }

  // Mongoose cast error (invalid Object ID)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Resource not found with id of ${err.value}`;
  }

  const response = apiResponse(false, errors, message);
  res.status(statusCode).json(response);
};

module.exports = errorHandler;

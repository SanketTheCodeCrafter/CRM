/**
 * Formats a consistent API response.
 * 
 * @param {boolean} success - Indicates if the request was successful
 * @param {any} data - Response payload
 * @param {string} message - Optional message
 * @param {object} pagination - Optional pagination details
 */
const apiResponse = (success, data = null, message = '', pagination = null) => {
  const response = { success };
  
  if (message) {
    response.message = message;
  }
  
  if (data !== null) {
    response.data = data;
  }
  
  if (pagination !== null) {
    response.pagination = pagination;
  }
  
  return response;
};

module.exports = apiResponse;

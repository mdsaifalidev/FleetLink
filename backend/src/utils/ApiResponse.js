/**
 * Represents a standard API response.
 *
 * @class
 * @param {number} statusCode - The HTTP status code of the response.
 * @param {*} data - The response data payload.
 * @param {string} [message="Success"] - Optional message describing the response.
 * @property {boolean} success - Indicates if the response is successful (status code < 400).
 */
class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode
    this.data = data
    this.message = message
    this.success = statusCode < 400
  }
}

export default ApiResponse

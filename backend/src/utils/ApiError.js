/**
 * Custom error class for API errors, extending the built-in Error object.
 * Stores status code, error messages, additional error details, and stack trace information.
 *
 * @class
 * @param {number} statusCode - HTTP status code of the error.
 * @param {string} [message="Something went wrong"] - Description of the error.
 * @param {Array} [errors=[]] - List of additional error details.
 * @param {string} [stack=""] - Custom stack trace, if provided.
 */
class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message)
    this.statusCode = statusCode
    this.data = null
    this.message = message
    this.success = false
    this.errors = errors

    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

export default ApiError

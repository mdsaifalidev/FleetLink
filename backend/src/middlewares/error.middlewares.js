import mongoose from "mongoose"
import ApiError from "../utils/ApiError.js"
import asyncHandler from "../utils/asyncHandler.js"

/**
 * Error handling middleware to standardize API error responses.
 *
 * @param {Error} err - The error to handle.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The Express next middleware function.
 *
 * @returns {Object} The formatted error response.
 */
const errorHandler = (err, req, res, next) => {
  let error = err

  console.log(err)

  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error ? 400 : 500

    const message = error.message || "Something went wrong"
    error = new ApiError(statusCode, message, error?.errors || [], err.stack)
  }

  const response = {
    ...error,
    message: error.message,
    ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}),
  }

  console.log(error.message)

  return res.status(error.statusCode).json(response)
}

export default errorHandler

/**
 * Wraps an asynchronous route handler and forwards errors to the next middleware.
 *
 * @param {Function} requestHandler - The async function to handle the route.
 * @returns {Function} Express-compatible middleware function.
 */
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
    }
}

export default asyncHandler
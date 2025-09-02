import Booking from "../models/booking.models.js";

/**
 * Calculates the ride duration in hours based on the absolute numeric difference
 * between two pincodes, modulo 24. Useful for estimating travel or delivery time.
 *
 * @param {string|number} fromPincode - The starting pincode.
 * @param {string|number} toPincode - The destination pincode.
 * @returns {number} Ride duration in hours.
 */
const calculateRideDuration = (fromPincode, toPincode) => {
  return Math.abs(parseInt(toPincode) - parseInt(fromPincode)) % 24;
};

/**
 * Checks if there is any existing booking for the given vehicle that overlaps with the specified time range.
 *
 * @param {string} vehicleId - The ID of the vehicle to check for overlapping bookings.
 * @param {Date} startTime - The start time of the desired booking.
 * @param {Date} endTime - The end time of the desired booking.
 * @param {string|null} [excludeBookingId=null] - An optional booking ID to exclude from the check.
 * @returns {Promise<boolean>} True if an overlapping booking exists, otherwise false.
 */
const hasBookingOverlap = async (vehicleId, startTime, endTime, excludeBookingId = null) => {
  const query = {
    vehicleId: vehicleId,
    $or: [
      { startTime: { $lt: endTime, $gte: startTime } },
      { endTime: { $gt: startTime, $lte: endTime } },
      { startTime: { $lte: startTime }, endTime: { $gte: endTime } }
    ]
  };
  
  if (excludeBookingId) {
    query._id = { $ne: excludeBookingId };
  }
  
  const overlappingBooking = await Booking.findOne(query);
  return overlappingBooking !== null;
};

export { calculateRideDuration, hasBookingOverlap };
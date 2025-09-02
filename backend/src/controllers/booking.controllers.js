import Booking from "../models/booking.models.js"
import Vehicle from "../models/vehicle.models.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"
import { calculateRideDuration, hasBookingOverlap } from "../utils/helper.js"

const bookAVehicle = asyncHandler(async (req, res) => {
  const { vehicleId, fromPincode, toPincode, startTime, customerId } = req.body

  // Verify vehicle exists
  const vehicle = await Vehicle.findById(vehicleId)
  if (!vehicle) {
    return res.status(404).json({ error: "Vehicle not found" })
  }

  // Calculate ride duration and end time
  const estimatedRideDurationHours = calculateRideDuration(
    fromPincode,
    toPincode
  )
  const startDateTime = new Date(startTime)
  const endDateTime = new Date(
    startDateTime.getTime() + estimatedRideDurationHours * 60 * 60 * 1000
  )

  // Re-verify availability to prevent race conditions
  const hasOverlap = await hasBookingOverlap(
    vehicleId,
    startDateTime,
    endDateTime
  )
  if (hasOverlap) {
    throw new ApiError(
      409,
      "Vehicle is no longer available for the selected time slot"
    )
  }

  // Create booking
  const newBooking = await Booking.create({
    vehicleId,
    fromPincode,
    toPincode,
    startTime: startDateTime,
    endTime: endDateTime,
    customerId,
    estimatedRideDurationHours,
  })

  await newBooking.populate("vehicleId")

  return res
    .status(201)
    .json(new ApiResponse(201, newBooking, "Booking created successfully"))
})

const getAllBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find().populate("vehicleId")

  return res
    .status(200)
    .json(new ApiResponse(200, "Bookings fetched successfully", bookings))
})

const cancelABooking = asyncHandler(async (req, res) => {
  const { id } = req.params

  const booking = await Booking.findByIdAndDelete(id)
  if (!booking) {
    throw new ApiError(404, "Booking not found")
  }

  return res
    .status(200)
    .json(new ApiResponse(200, booking, "Booking cancelled successfully"))
})

export { bookAVehicle, getAllBookings, cancelABooking }

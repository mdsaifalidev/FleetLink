import Vehicle from "../models/vehicle.models.js"
import ApiResponse from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"
import { calculateRideDuration, hasBookingOverlap } from "../utils/helper.js"

const addANewVehicle = asyncHandler(async (req, res) => {
  const { name, capacityKg, tyres } = req.body

  const newVehicle = await Vehicle.create({
    name,
    capacityKg: Number(capacityKg),
    tyres: Number(tyres),
  })

  return res
    .status(201)
    .json(new ApiResponse(201, newVehicle, "Vehicle created successfully"))
})

const getAvailableVehicles = asyncHandler(async (req, res) => {
  const { capacityRequired, fromPincode, toPincode, startTime } = req.query

  // Calculate estimated ride duration
  const estimatedRideDurationHours = calculateRideDuration(
    fromPincode,
    toPincode
  )
  const startDateTime = new Date(startTime)
  const endDateTime = new Date(
    startDateTime.getTime() + estimatedRideDurationHours * 60 * 60 * 1000
  )

  // Find vehicles with sufficient capacity
  const suitableVehicles = await Vehicle.find({
    capacityKg: { $gte: Number(capacityRequired) },
  })

  // Filter out vehicles with overlapping bookings
  const availableVehicles = []
  for (const vehicle of suitableVehicles) {
    const hasOverlap = await hasBookingOverlap(
      vehicle._id,
      startDateTime,
      endDateTime
    )
    if (!hasOverlap) {
      availableVehicles.push({
        ...vehicle.toObject(),
        estimatedRideDurationHours,
      })
    }
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        availableVehicles,
        "Available vehicles fetched successfully"
      )
    )
})

export { addANewVehicle, getAvailableVehicles }

import { body, param } from "express-validator"

const validateBookVehicle = () => {
  return [
    body("vehicleId")
      .notEmpty()
      .withMessage("Vehicle ID is required")
      .isMongoId()
      .withMessage("Invalid vehicle ID"),

    body("fromPincode")
      .notEmpty()
      .withMessage("From pincode is required")
      .isPostalCode("IN")
      .withMessage("Invalid Indian pincode"),

    body("toPincode")
      .notEmpty()
      .withMessage("To pincode is required")
      .isPostalCode("IN")
      .withMessage("Invalid Indian pincode"),

    body("startTime")
      .notEmpty()
      .withMessage("Start time is required")
      .isISO8601()
      .withMessage("Start time must be a valid ISO8601 date"),

    body("customerId")
      .notEmpty()
      .withMessage("Customer ID is required"),
  ]
}

const validateCancelBooking = () => {
  return [
    param("id")
      .notEmpty()
      .withMessage("Booking ID is required")
      .isMongoId()
      .withMessage("Invalid booking ID"),
  ]
}

export { validateBookVehicle, validateCancelBooking }

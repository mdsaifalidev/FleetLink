// validators/vehicle.validators.js
import { body, query } from "express-validator"

const validateAddVehicle = () => {
  return [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Vehicle name is required")
      .isLength({ max: 100 })
      .withMessage("Vehicle name must be under 100 characters"),

    body("capacityKg")
      .notEmpty()
      .withMessage("Capacity (Kg) is required")
      .isNumeric()
      .withMessage("Capacity must be a number")
      .custom((value) => value > 0)
      .withMessage("Capacity must be greater than 0"),

    body("tyres")
      .notEmpty()
      .withMessage("Tyres count is required")
      .isInt({ min: 0 })
      .withMessage("Tyres count must be a positive integer"),
  ]
}

const validateGetAvailableVehicles = () => {
  return [
    query("capacityRequired")
      .notEmpty()
      .withMessage("Capacity required is missing")
      .isNumeric()
      .withMessage("Capacity required must be a number"),

    query("fromPincode")
      .notEmpty()
      .withMessage("From pincode is required")
      .isPostalCode("IN")
      .withMessage("Invalid Indian pincode"),

    query("toPincode")
      .notEmpty()
      .withMessage("To pincode is required")
      .isPostalCode("IN")
      .withMessage("Invalid Indian pincode"),

    query("startTime")
      .notEmpty()
      .withMessage("Start time is required")
      .isISO8601()
      .withMessage("Start time must be a valid ISO8601 date"),
  ]
}

export { validateAddVehicle, validateGetAvailableVehicles }

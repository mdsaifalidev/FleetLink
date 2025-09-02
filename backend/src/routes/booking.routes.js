import { Router } from "express"
import {
  bookAVehicle,
  getAllBookings,
  cancelABooking,
} from "../controllers/booking.controllers.js"
import {
  validateBookVehicle,
  validateCancelBooking,
} from "../validators/booking.validators.js"
import validate from "../middlewares/validate.middlewares.js"

const router = Router()

router.post("/", validateBookVehicle(), validate, bookAVehicle)
router.get("/", getAllBookings)
router.delete("/:id", validateCancelBooking(), validate, cancelABooking)

export default router

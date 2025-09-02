import { Router } from "express"
import {
  addANewVehicle,
  getAvailableVehicles,
} from "../controllers/vehicle.controllers.js"
import {
  validateAddVehicle,
  validateGetAvailableVehicles,
} from "../validators/vehicle.validations.js"
import validate from "../middlewares/validate.middlewares.js"

const router = Router()

router.post("/", validateAddVehicle(), validate, addANewVehicle)
router.get(
  "/available",
  validateGetAvailableVehicles(),
  validate,
  getAvailableVehicles
)

export default router

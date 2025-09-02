import express from "express"
import cors from "cors"
import errorHandler from "./middlewares/error.middlewares.js"

const app = express()

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
)
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))

// Routes
import healthcheckRoutes from "./routes/healthcheck.routes.js"
import vehicleRoutes from "./routes/vehicle.routes.js"
import bookingRoutes from "./routes/booking.routes.js"

app.use("/api/v1/healthcheck", healthcheckRoutes)
app.use("/api/v1/vehicles", vehicleRoutes)
app.use("/api/v1/bookings", bookingRoutes)

// Error Middleware
app.use(errorHandler)

export default app

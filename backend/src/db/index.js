import mongoose from "mongoose"

/**
 * Asynchronously connects to a MongoDB database using the connection URI
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("MongoDB connected successfully")
  } catch (error) {
    console.error("MongoDB connection failed:", error.message)
    process.exit(1)
  }
}

export default connectDB

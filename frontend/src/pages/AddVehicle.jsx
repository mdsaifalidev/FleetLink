import { useState } from "react"
import axiosInstance from "../axiosInstance"

function AddVehicle() {
  const [name, setName] = useState("")
  const [capacityKg, setCapacityKg] = useState(0)
  const [tyres, setTyres] = useState(0)
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    try {
      const response = await axiosInstance.post("/vehicles", {
        name,
        capacityKg,
        tyres,
      })

      setName("")
      setCapacityKg(0)
      setTyres(0)
      setMessage(response?.data?.message)
    } catch (error) {
      const errors = error?.response?.data?.errors

      if (Array.isArray(errors) && errors.length > 0) {
        // Get the first error message, regardless of the key
        const firstErrorObj = errors[0]
        const firstKey = Object.keys(firstErrorObj)[0]
        const firstMessage = firstErrorObj[firstKey]

        setMessage(firstMessage || "Validation error occurred.")
      } else {
        setMessage("Error adding vehicle. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Add New Vehicle
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col font-semibold">
          Vehicle Name:
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="e.g., Truck XYZ"
            className="p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </label>
        <label className="flex flex-col font-semibold">
          Capacity (KG):
          <input
            type="number"
            value={capacityKg}
            onChange={(e) => setCapacityKg(e.target.value)}
            required
            placeholder="e.g., 1000"
            className="p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </label>
        <label className="flex flex-col font-semibold">
          Number of Tyres:
          <input
            type="number"
            value={tyres}
            onChange={(e) => setTyres(e.target.value)}
            required
            placeholder="e.g., 6"
            className="p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className={`p-2 text-white font-bold rounded ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Adding..." : "Add Vehicle"}
        </button>
      </form>
      {message && (
        <p
          className={`text-center p-3 rounded mt-4 ${
            message.includes("success")
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  )
}

export default AddVehicle

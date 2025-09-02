import { useState } from "react"
import axiosInstance from "../axiosInstance"

function SearchBook() {
  const [capacityRequired, setCapacityRequired] = useState("")
  const [fromPincode, setFromPincode] = useState("")
  const [toPincode, setToPincode] = useState("")
  const [startTime, setStartTime] = useState("")
  const [vehicles, setVehicles] = useState([])
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    setVehicles([])
    try {
      const isoStartTime = startTime ? `${startTime}:00Z` : ""
      const url = `${
        import.meta.env.VITE_API_URL
      }/vehicles/available?capacityRequired=${capacityRequired}&fromPincode=${fromPincode}&toPincode=${toPincode}&startTime=${encodeURIComponent(
        isoStartTime
      )}`
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setVehicles(data.data)
      } else {
        setMessage("Error searching for vehicles. Please try again.")
      }
    } catch (err) {
      setMessage("Error: " + err.message)
    }

    try {
      const isoStartTime = startTime ? `${startTime}:00Z` : ""
      const url = `/vehicles/available?capacityRequired=${capacityRequired}&fromPincode=${fromPincode}&toPincode=${toPincode}&startTime=${encodeURIComponent(
        isoStartTime
      )}`
      const response = await axiosInstance.get(url)

      setVehicles(response.data.data)
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

  const handleBook = async (vehicleId, vehicleName) => {
    const customerId = "hardcoded-customer-id"
    setMessage("")

    try {
      const isoStartTime = startTime ? `${startTime}:00Z` : ""
      await axiosInstance.post("/bookings", {
        vehicleId,
        fromPincode,
        toPincode,
        startTime: isoStartTime,
        customerId,
      })

      setMessage(`Booked ${vehicleName} successfully!`)
      setTimeout(() => {
        handleSearch({ preventDefault: () => {} })
      }, 1000)
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
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Search Available Vehicles
      </h2>
      <form
        onSubmit={handleSearch}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5"
      >
        <label className="flex flex-col font-semibold">
          Capacity Required (KG):
          <input
            type="number"
            value={capacityRequired}
            onChange={(e) => setCapacityRequired(e.target.value)}
            required
            placeholder="e.g., 500"
            className="p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label className="flex flex-col font-semibold">
          From Pincode:
          <input
            value={fromPincode}
            onChange={(e) => setFromPincode(e.target.value)}
            required
            placeholder="e.g., 123456"
            className="p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label className="flex flex-col font-semibold">
          To Pincode:
          <input
            value={toPincode}
            onChange={(e) => setToPincode(e.target.value)}
            required
            placeholder="e.g., 654321"
            className="p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label className="flex flex-col font-semibold">
          Start Date & Time:
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className={`md:col-span-2 p-2 text-white font-bold rounded ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Searching..." : "Search Availability"}
        </button>
      </form>
      {message && (
        <p
          className={`text-center p-3 rounded mb-4 ${
            message.includes("success")
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message}
        </p>
      )}
      {loading && (
        <div className="text-center italic text-gray-600">Loading...</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle._id}
            className="bg-gray-50 p-4 border border-gray-200 rounded-lg shadow-sm"
          >
            <h3 className="text-lg font-semibold text-blue-600 mb-2">
              {vehicle.name}
            </h3>
            <p>
              <strong>Capacity:</strong> {vehicle.capacityKg} KG
            </p>
            <p>
              <strong>Tyres:</strong> {vehicle.tyres}
            </p>
            <p>
              <strong>Estimated Ride Duration:</strong>{" "}
              {vehicle.estimatedRideDurationHours} hours
            </p>
            <button
              onClick={() => handleBook(vehicle._id, vehicle.name)}
              className="w-full p-2 bg-yellow-400 text-gray-900 font-bold rounded mt-4 hover:bg-yellow-500"
            >
              Book Now
            </button>
          </div>
        ))}
        {vehicles.length === 0 && !loading && (
          <p className="text-center col-span-full">
            No vehicles available for your criteria.
          </p>
        )}
      </div>
    </div>
  )
}

export default SearchBook

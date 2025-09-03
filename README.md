# FleetLink - Logistics Vehicle Booking System

FleetLink is a comprehensive full-stack application for managing and booking logistics vehicles for B2B clients. The system provides robust backend APIs and an intuitive frontend interface for vehicle fleet management.

## 🏗 Architecture

- **Frontend**: React.js with Tailwind CSS
- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Testing**: Jest with comprehensive unit tests
- **Containerization**: Docker with Docker Compose

## 🚀 Features

### Backend APIs
- **POST /api/vehicles**: Add new vehicles to the fleet
- **GET /api/vehicles/available**: Search for available vehicles based on capacity, route, and time
- **POST /api/bookings**: Create vehicle bookings with conflict prevention
- **GET /api/bookings**: View all bookings (bonus feature)
- **DELETE /api/bookings/:id**: Cancel bookings (bonus feature)

### Frontend Interface
- **Add Vehicle Page**: Form to add new vehicles with validation
- **Search & Book Page**: Search available vehicles and create bookings
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Feedback**: Loading states, success/error messages

### Core Features
- ✅ **Availability Checking**: Prevents double-bookings with time overlap detection
- ✅ **Capacity Filtering**: Only shows vehicles with sufficient capacity
- ✅ **Route-based Duration**: Simplified pincode-based ride duration calculation
- ✅ **Race Condition Prevention**: Re-verification before booking creation
- ✅ **Comprehensive Testing**: Unit tests for critical backend logic
- ✅ **Data Validation**: Input validation on both frontend and backend

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (v7.0 or higher)
- Docker & Docker Compose (for containerized setup)

### Option 1: Local Development

#### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your MongoDB connection string
# MONGODB_URI=mongodb://localhost:27017/fleetlink
# PORT=5000

# Start MongoDB (if running locally)
mongod

# Run backend server
npm run dev

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

#### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start

# Open browser to http://localhost:5173
```

### Option 2: Docker Compose (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd fleetlink

# Build and start all services
docker-compose up --build

# Stop services
docker-compose down
```

Services will be available at:
- Frontend: http://localhost:4000
- Backend API: http://localhost:8080
- MongoDB: localhost:27017

## 🧪 Testing

### Backend Tests
The backend includes comprehensive unit tests covering:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

**Test Coverage:**
- ✅ Vehicle creation with validation
- ✅ Availability search with capacity filtering
- ✅ Booking overlap detection
- ✅ Booking creation with conflict prevention
- ✅ Edge cases and error handling
- ✅ Helper function validation

### Test Results Example
```
PASS ./server.test.js
✓ POST /api/vehicles should create a new vehicle with valid data
✓ should return 400 for missing required fields
✓ should return available vehicles with correct capacity
✓ should not return vehicles with overlapping bookings
✓ should create a booking for available vehicle
✓ should return 409 for conflicting booking
✓ calculateRideDuration should work correctly
✓ hasBookingOverlap should detect overlaps
```

## 🔧 API Documentation

### Vehicle Management

#### Add Vehicle
```http
POST /api/vehicles
Content-Type: application/json

{
  "name": "Heavy Duty Truck",
  "capacityKg": 2000,
  "tyres": 8
}
```

#### Search Available Vehicles
```http
GET /api/vehicles/available?capacityRequired=500&fromPincode=110001&toPincode=110005&startTime=2023-10-27T10:00:00Z
```

### Booking Management

#### Create Booking
```http
POST /api/bookings
Content-Type: application/json

{
  "vehicleId": "vehicle_id_here",
  "fromPincode": "110001",
  "toPincode": "110005",
  "startTime": "2023-10-27T10:00:00Z",
  "customerId": "customer123"
}
```

## 🧮 Core Logic

### Ride Duration Calculation
The system uses a simplified formula for demonstration:
```javascript
estimatedRideDurationHours = Math.abs(parseInt(toPincode) - parseInt(fromPincode)) % 24
```

**Note**: This is a placeholder logic. In production, you would integrate with mapping services like Google Maps API or HERE API for accurate duration calculation.

### Booking Overlap Detection
The system prevents double-bookings by checking for time overlaps:
- Checks if any existing booking overlaps with the requested time window
- Re-verifies availability just before creating a booking to prevent race conditions
- Uses MongoDB queries to efficiently find overlapping bookings

### Time Window Logic
```javascript
// Example overlap detection
startTime: 10:00 AM, endTime: 12:00 PM (existing booking)
newStart: 11:00 AM, newEnd: 1:00 PM (new request)
// Result: OVERLAP DETECTED - booking rejected
```

## 🏆 Bonus Features Implemented

✅ **Docker Configuration**: Complete containerization with docker-compose.yml
✅ **Booking Management**: View and cancel bookings functionality  
✅ **Enhanced UX**: Loading indicators, better error handling, responsive design
✅ **Production Ready**: health checks, security headers

## 🛠 Technology Stack

### Backend
- **Express.js**: Web framework
- **Mongoose**: MongoDB object modeling
- **Express-Validator**: Request validation
- **CORS**: Cross-origin resource sharing
- **Jest**: Testing framework
- **Supertest**: HTTP testing

### Frontend
- **React 18**: UI framework
- **Lucide React**: Icon library
- **Tailwind CSS**: Utility-first CSS framework
- **Fetch API**: HTTP client

### DevOps
- **Docker**: Containerization
- **Docker Compose**: Multi-container orchestration
- **MongoDB**: NoSQL database

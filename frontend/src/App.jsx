import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddVehicle from './pages/AddVehicle';
import SearchBook from './pages/SearchBook';

function App() {
  return (
    <Router>
      <div className="max-w-7xl mx-auto p-5 bg-gray-100 min-h-screen">
        <header className="bg-blue-600 text-white p-5 text-center rounded-t-lg">
          <h1 className="text-3xl font-bold">FleetLink</h1>
          <nav className="mt-3">
            <Link to="/add-vehicle" className="text-white font-semibold mx-4 hover:underline">Add Vehicle</Link>
            <span>|</span>
            <Link to="/search-book" className="text-white font-semibold mx-4 hover:underline">Search & Book</Link>
          </nav>
        </header>
        <main className="bg-white p-8 rounded-b-lg shadow-lg">
          <Routes>
            <Route path="/add-vehicle" element={<AddVehicle />} />
            <Route path="/search-book" element={<SearchBook />} />
            <Route path="/" element={<SearchBook />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
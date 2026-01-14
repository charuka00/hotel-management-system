import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import Pages
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import RoomDetails from './pages/RoomDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';
import UserProfile from './pages/UserProfile';

// Placeholder Component (Optional, mostly used during dev)
const Placeholder = ({ title }) => (
  <div className="min-h-screen flex items-center justify-center bg-secondary text-3xl font-bold text-primary">
    {title} Page Coming Soon
  </div>
);

function App() {
  return (
    <BrowserRouter>
      {/* Fixed Navbar (stays at top) */}
      <Navbar />
      
      {/* WRAPPER DIV: 
         - pt-24 pushes content down so it's not hidden behind the Navbar.
         - min-h-screen ensures the background color covers the whole page.
      */}
      <div className="pt-24 min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/room/:id" element={<RoomDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </div>
      
    </BrowserRouter>
  );
}

export default App;
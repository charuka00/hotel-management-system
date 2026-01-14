import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Forces navbar to update when route changes

  // Check Auth Status (Access LocalStorage)
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login'); // Redirect to login page
  };

  return (
    // UPDATED: Added 'fixed top-0 left-0 w-full z-50' to make it stick
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary">
          Hotel<span className="text-gray-700">Manager</span>
        </Link>

        {/* Desktop Menu - Always Visible Links */}
        <div className="hidden md:flex space-x-8 text-gray-600 font-medium">
          <Link to="/" className="hover:text-primary transition">Home</Link>
          <Link to="/rooms" className="hover:text-primary transition">Rooms</Link>
          
          {/* Conditional Link: Admin Dashboard */}
          {token && role === 'admin' && (
            <Link to="/admin-dashboard" className="text-primary font-bold hover:underline">
              Dashboard
            </Link>
          )}

          {/* Conditional Link: User Profile */}
          {token && role === 'user' && (
            <Link to="/profile" className="text-primary font-bold hover:underline">
              My Profile
            </Link>
          )}
        </div>

        {/* Auth Buttons Section */}
        <div className="flex space-x-4">
          
          {/* IF NOT LOGGED IN: Show Login & Register */}
          {!token ? (
            <>
              <Link to="/login" className="text-gray-600 hover:text-primary font-medium px-4 py-2">
                Login
              </Link>
              <Link to="/register" className="bg-primary text-white px-5 py-2 rounded-full hover:bg-blue-700 transition shadow-lg shadow-blue-500/30">
                Register
              </Link>
            </>
          ) : (
            // IF LOGGED IN: Show Logout Button
            <button 
              onClick={handleLogout} 
              className="border border-red-500 text-red-500 px-5 py-2 rounded-full hover:bg-red-50 transition font-medium"
            >
              Logout
            </button>
          )}
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
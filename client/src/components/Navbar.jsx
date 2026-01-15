import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); 

  // Check Auth Status
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login'); 
  };

  return (
    // Navbar Container
    <nav className="fixed top-0 left-0 w-full bg-primary shadow-lg z-50 transition-all duration-300">
      
      {/* UPDATED LINE BELOW: 
         - Removed 'container' (which restricts width).
         - Added 'max-w-[95%] mx-auto' to let it spread wider, moving logo left.
      */}
      <div className="max-w-[95%] mx-auto px-4 md:px-6 py-7 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-white tracking-wide">
          Ocean <span className="text-blue-300">Pearl Resort</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-white font-medium">
          <Link to="/" className="hover:text-blue-300 transition">Home</Link>
          <Link to="/rooms" className="hover:text-blue-300 transition">Rooms</Link>
          
          {/* Admin Dashboard Link */}
          {token && role === 'admin' && (
            <Link to="/admin-dashboard" className="text-blue-300 font-bold hover:text-white border-b-2 border-blue-300 pb-1">
              Dashboard
            </Link>
          )}

          {/* User Profile Link */}
          {token && role === 'user' && (
            <Link to="/profile" className="text-blue-300 font-bold hover:text-white">
              My Profile
            </Link>
          )}
        </div>

        {/* Auth Buttons */}
        <div className="flex space-x-4">
          
          {!token ? (
            <>
              {/* Login */}
              <Link to="/login" className="text-white hover:text-blue-300 font-medium px-4 py-2 transition">
                Login
              </Link>
              
              {/* Register */}
              <Link to="/register" className="bg-white text-primary font-bold px-5 py-2 rounded-full hover:bg-gray-100 transition shadow-lg">
                Register
              </Link>
            </>
          ) : (
            // Logout
            <button 
              onClick={handleLogout} 
              className="border border-red-400 text-red-400 px-5 py-2 rounded-full hover:bg-red-500 hover:text-white transition font-medium"
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
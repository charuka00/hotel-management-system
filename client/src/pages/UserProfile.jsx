import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock Bookings Data (We will replace this with real DB data later)
  const [myBookings] = useState([
    { id: 1, room: "Deluxe Ocean View", dates: "12 Oct - 15 Oct", status: "Confirmed", price: "$360" },
    { id: 2, room: "Standard Single", dates: "05 Nov - 07 Nov", status: "Pending", price: "$160" },
  ]);

  // 1. Fetch User Data on Page Load
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login'); // Kick out if no token
        return;
      }

      try {
        const config = {
          headers: {
            'x-auth-token': token // Send token to backend
          }
        };
        
        // Call the new backend route we just made
        const res = await axios.get('http://localhost:5001/api/auth/me', config);
        setUser(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile", err);
        localStorage.removeItem('token'); // Invalid token? Clear it.
        navigate('/login');
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  if (loading) return <div className="text-center mt-20">Loading profile...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
            <p className="text-gray-600">Welcome back, <span className="font-semibold text-blue-600">{user.name}</span>!</p>
          </div>
          <button 
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Left Column: User Details Card */}
          <div className="bg-white rounded-lg shadow-md p-6 h-fit">
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Account Details</h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-500">Full Name</label>
                <p className="font-medium text-gray-800">{user.name}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Email Address</label>
                <p className="font-medium text-gray-800">{user.email}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Account Type</label>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full uppercase font-bold">
                  {user.role}
                </span>
              </div>
            </div>
            <button className="w-full mt-6 border border-blue-600 text-blue-600 py-2 rounded hover:bg-blue-50 transition">
              Edit Profile
            </button>
          </div>

          {/* Right Column: Booking History */}
          <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">My Bookings</h2>
            
            {myBookings.length > 0 ? (
              <div className="space-y-4">
                {myBookings.map((booking) => (
                  <div key={booking.id} className="flex justify-between items-center p-4 border rounded-lg hover:shadow-sm transition bg-gray-50">
                    <div>
                      <h3 className="font-bold text-gray-800">{booking.room}</h3>
                      <p className="text-sm text-gray-500">{booking.dates}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-800">{booking.price}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">You haven't made any bookings yet.</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserProfile;
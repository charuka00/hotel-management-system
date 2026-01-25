import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [myBookings, setMyBookings] = useState([]); 
  const [loading, setLoading] = useState(true);

  // Helper to format dates
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const config = {
          headers: { 'x-auth-token': token }
        };
        
        // --- 1. Fetch User Data ---
        const userRes = await axios.get('http://localhost:5001/api/auth/me', config);
        setUser(userRes.data);

        // --- 2. Fetch User's Bookings ---
        const email = userRes.data.email;
        const bookingsRes = await axios.get(`http://localhost:5001/api/bookings/user/${email}`);
        
        setMyBookings(bookingsRes.data); 
        setLoading(false);

      } catch (err) {
        console.error("Error fetching data", err);
        if (err.response && err.response.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-12 w-12 bg-gray-300 rounded-full mb-4"></div>
        <div className="h-4 w-32 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
  
  if (!user) return null; 

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 relative overflow-hidden">
      
      {/* --- BACKGROUND DESIGN ELEMENTS --- */}
      {/* Mesh Gradient 1 */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-50 via-indigo-50 to-transparent -z-10"></div>
      
      {/* Abstract Circle 1 */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob -z-10"></div>
      
      {/* Abstract Circle 2 */}
      <div className="absolute top-40 -left-20 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 -z-10"></div>


      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        
        {/* --- 1. Header Card --- */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/50 overflow-visible relative"> 
          
          {/* Gradient Banner */}
          <div className="h-40 bg-gradient-to-r from-blue-600 to-indigo-600 relative rounded-t-3xl overflow-hidden">
             {/* Subtle pattern overlay on banner */}
             <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

            <button 
              onClick={handleLogout}
              className="absolute top-6 right-6 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 border border-white/10 shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </button>
          </div>
          
          {/* Profile Info */}
          <div className="relative z-10 px-8 pb-8 -mt-16 flex flex-col md:flex-row items-end gap-6">
            
            {/* Profile Image Box */}
            <div className="h-32 w-32 rounded-2xl bg-white p-2 shadow-2xl flex-shrink-0 transform transition hover:scale-105 duration-300">
              <div className="h-full w-full bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl flex items-center justify-center text-4xl font-bold text-blue-600 uppercase shadow-inner">
                {user.name.charAt(0)}
              </div>
            </div>
            
            {/* Text Info */}
            <div className="flex-1 mb-2">
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{user.name}</h1>
              <p className="text-gray-500 font-medium flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                {user.email}
              </p>
            </div>

            {/* Account Badge */}
            <div className="mb-4">
              <span className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-bold bg-white/50 backdrop-blur-sm text-gray-700 uppercase tracking-wide border border-gray-200 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                {user.role} Account
              </span>
            </div>
          </div>
        </div>

        {/* --- 2. Stats Row --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Bookings */}
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-white/50 hover:shadow-md transition duration-300 flex items-center justify-between group">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider group-hover:text-blue-500 transition-colors">Total Bookings</p>
              <p className="text-3xl font-extrabold text-gray-900 mt-1">{myBookings.length}</p>
            </div>
            <div className="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
               </svg>
            </div>
          </div>

          {/* Account Status */}
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-white/50 hover:shadow-md transition duration-300 flex items-center justify-between group">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider group-hover:text-green-500 transition-colors">Account Status</p>
              <p className="text-xl font-bold text-green-600 mt-1">Active</p>
            </div>
            <div className="h-12 w-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
            </div>
          </div>

          {/* Member Since */}
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-white/50 hover:shadow-md transition duration-300 flex items-center justify-between group">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider group-hover:text-purple-500 transition-colors">Member Since</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {user.date ? new Date(user.date).getFullYear() : new Date().getFullYear()}
              </p>
            </div>
            <div className="h-12 w-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
            </div>
          </div>
        </div>

        {/* --- 3. Bookings Section --- */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                Your Bookings
                <span className="bg-blue-100 text-blue-600 text-xs py-1 px-2 rounded-full">{myBookings.length}</span>
              </h2>
              <p className="text-gray-500 text-sm mt-1">Track and manage all your reservations</p>
            </div>
            <button 
              onClick={() => navigate('/rooms')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-blue-600/20 transition hover:shadow-blue-600/40 hover:-translate-y-0.5 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              New Booking
            </button>
          </div>

          <div className="space-y-4">
            {myBookings.length > 0 ? (
              myBookings.map((booking) => (
                <div key={booking._id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-100 transition duration-300 flex flex-col md:flex-row gap-6 group">
                  
                  {/* Image */}
                  <div className="w-full md:w-48 h-32 flex-shrink-0 overflow-hidden rounded-xl">
                    {booking.img ? (
                      <img src={booking.img} alt={booking.roomName} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500" />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{booking.roomName}</h3>
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-3">
                      Ref: <span className="font-mono text-gray-500">{booking._id.substring(booking._id.length - 8)}</span>
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600 bg-gray-50/80 w-fit px-3 py-1.5 rounded-lg border border-gray-100">
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(booking.checkIn)}
                      </div>
                      <span className="text-gray-300">&rarr;</span>
                      <div className="flex items-center gap-2">
                        {formatDate(booking.checkOut)}
                      </div>
                    </div>
                  </div>

                  {/* Status & Price */}
                  <div className="flex flex-row md:flex-col justify-between items-center md:items-end md:justify-center border-t md:border-t-0 border-gray-100 pt-4 md:pt-0 pl-0 md:pl-6 md:border-l border-gray-100 min-w-[140px]">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm ${
                      booking.status === 'Confirmed' ? 'bg-green-100 text-green-700 border border-green-200' : 
                      booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' : 
                      'bg-red-100 text-red-700 border border-red-200'
                    }`}>
                      {booking.status}
                    </span>
                    <div className="text-right mt-0 md:mt-2">
                      <p className="text-xs text-gray-400 mb-0.5">Total Price</p>
                      <p className="text-xl font-bold text-blue-900">${booking.totalPrice}</p>
                    </div>
                  </div>

                </div>
              ))
            ) : (
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-10 text-center shadow-sm border border-gray-100 border-dashed">
                <div className="mx-auto h-16 w-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-blue-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">No bookings found</h3>
                <p className="text-gray-500 text-sm mt-1">You haven't made any reservations yet.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserProfile;
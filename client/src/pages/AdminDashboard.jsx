import { useState } from 'react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('rooms'); // Controls which section is visible

  // Mock Data for Rooms
  const [rooms, setRooms] = useState([
    { _id: 1, name: "Deluxe Ocean View", type: "Double", price: 120, bookings: 3, status: "Available" },
    { _id: 2, name: "Standard Single", type: "Single", price: 80, bookings: 0, status: "Available" },
    { _id: 3, name: "Presidential Suite", type: "Suite", price: 350, bookings: 1, status: "Maintenance" },
  ]);

  // Mock Data for Bookings
  const [bookings] = useState([
    { _id: 101, guest: "John Doe", room: "Deluxe Ocean View", date: "2023-10-12", status: "Confirmed", email: "john@example.com" },
    { _id: 102, guest: "Sarah Smith", room: "Presidential Suite", date: "2023-11-05", status: "Pending", email: "sarah@example.com" },
    { _id: 103, guest: "Mike Ross", room: "Standard Single", date: "2023-12-01", status: "Confirmed", email: "mike@example.com" },
  ]);

  // Function to handle deleting a room
  const handleDeleteRoom = (id) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      setRooms(rooms.filter(room => room._id !== id));
    }
  };

  // Helper to calculate stats (Purely visual based on current state)
  const totalRevenue = rooms.reduce((acc, room) => acc + (room.price * room.bookings), 0);
  const pendingBookings = bookings.filter(b => b.status === 'Pending').length;

  return (
    <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">
      
      {/* --- Sidebar Navigation --- */}
      <aside className="w-72 bg-slate-900 text-white flex flex-col shadow-2xl z-20 hidden md:flex">
        {/* Brand */}
        <div className="h-20 flex items-center px-8 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-wide">HOTEL ADMIN</span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Main Menu</p>
          
          <button 
            onClick={() => setActiveTab('rooms')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              activeTab === 'rooms' 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
              : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="font-medium">Manage Rooms</span>
            {activeTab === 'rooms' && <span className="ml-auto bg-blue-500 text-xs py-0.5 px-2 rounded-md">{rooms.length}</span>}
          </button>

          <button 
            onClick={() => setActiveTab('bookings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              activeTab === 'bookings' 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
              : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-medium">Bookings</span>
            {pendingBookings > 0 && (
              <span className="ml-auto bg-amber-500 text-white text-xs py-0.5 px-2 rounded-md">{pendingBookings} New</span>
            )}
          </button>
        </nav>

        {/* User Profile Snippet */}
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800/50">
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center font-bold">
              AD
            </div>
            <div>
              <p className="text-sm font-semibold">Admin User</p>
              <p className="text-xs text-slate-400">Manager</p>
            </div>
          </div>
        </div>
      </aside>

      {/* --- Main Content Area --- */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {activeTab === 'rooms' ? 'Room Inventory' : 'Reservations Overview'}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Here is what's happening with your {activeTab} today.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {activeTab === 'rooms' && (
              <button className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg transition shadow-lg shadow-slate-900/20 flex items-center gap-2 text-sm font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Room
              </button>
            )}
          </div>
        </header>

        <div className="p-8 space-y-8">

          {/* --- KPI Cards (Stats) --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Est. Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${totalRevenue}</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-green-50 rounded-xl text-green-600">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Rooms</p>
                <p className="text-2xl font-bold text-gray-900">{rooms.length}</p>
              </div>
            </div>
          </div>

          {/* --- Content: Rooms Tab --- */}
          {activeTab === 'rooms' && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">All Rooms</h3>
                <div className="text-sm text-gray-500">Showing {rooms.length} rooms</div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Room Details</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Price / Night</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {rooms.map((room) => (
                      <tr key={room._id} className="hover:bg-blue-50/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            </div>
                            <span className="font-semibold text-gray-700">{room.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {room.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900">${room.price}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right space-x-3">
                          <button className="text-sm font-medium text-blue-600 hover:text-blue-800 transition">Edit</button>
                          <button 
                            onClick={() => handleDeleteRoom(room._id)}
                            className="text-sm font-medium text-red-500 hover:text-red-700 transition bg-red-50 px-3 py-1 rounded-lg hover:bg-red-100"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {rooms.length === 0 && <div className="p-12 text-center text-gray-500 bg-gray-50">No rooms found in inventory.</div>}
            </div>
          )}

          {/* --- Content: Bookings Tab --- */}
          {activeTab === 'bookings' && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
               <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Recent Reservations</h3>
                <div className="flex gap-2">
                   <button className="text-xs font-medium text-gray-500 hover:text-gray-900 bg-white border border-gray-200 px-3 py-1 rounded-md">Filter</button>
                   <button className="text-xs font-medium text-gray-500 hover:text-gray-900 bg-white border border-gray-200 px-3 py-1 rounded-md">Export</button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Guest Info</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Room Assigned</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Check-in Date</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {bookings.map((booking) => (
                      <tr key={booking._id} className="hover:bg-blue-50/30 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{booking.guest}</p>
                            <p className="text-xs text-gray-500">ID: #{booking._id}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{booking.room}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 font-mono">{booking.date}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${
                            booking.status === 'Confirmed' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-gray-400 hover:text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
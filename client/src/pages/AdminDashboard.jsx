import { useState } from 'react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('rooms'); // Controls which section is visible

  // Mock Data for Rooms
  const [rooms, setRooms] = useState([
    { _id: 1, name: "Deluxe Ocean View", type: "Double", price: 120, bookings: 3 },
    { _id: 2, name: "Standard Single", type: "Single", price: 80, bookings: 0 },
    { _id: 3, name: "Presidential Suite", type: "Suite", price: 350, bookings: 1 },
  ]);

  // Mock Data for Bookings
  const [bookings] = useState([
    { _id: 101, guest: "John Doe", room: "Deluxe Ocean View", date: "2023-10-12", status: "Confirmed" },
    { _id: 102, guest: "Sarah Smith", room: "Presidential Suite", date: "2023-11-05", status: "Pending" },
  ]);

  // Function to handle deleting a room (Visual only for now)
  const handleDeleteRoom = (id) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      setRooms(rooms.filter(room => room._id !== id));
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* --- Sidebar Navigation --- */}
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-primary">Admin Panel</h2>
        </div>
        <nav className="mt-6">
          <button 
            onClick={() => setActiveTab('rooms')}
            className={`w-full text-left px-6 py-3 hover:bg-gray-50 transition ${activeTab === 'rooms' ? 'border-l-4 border-primary text-primary font-bold bg-blue-50' : 'text-gray-600'}`}
          >
            Manage Rooms
          </button>
          <button 
            onClick={() => setActiveTab('bookings')}
            className={`w-full text-left px-6 py-3 hover:bg-gray-50 transition ${activeTab === 'bookings' ? 'border-l-4 border-primary text-primary font-bold bg-blue-50' : 'text-gray-600'}`}
          >
            Bookings
          </button>
        </nav>
      </aside>

      {/* --- Main Content Area --- */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            {activeTab === 'rooms' ? 'Room Management' : 'Booking Management'}
          </h1>
          {activeTab === 'rooms' && (
            <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow">
              + Add New Room
            </button>
          )}
        </div>

        {/* --- Content: Rooms Tab --- */}
        {activeTab === 'rooms' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6">Room Name</th>
                  <th className="py-3 px-6">Type</th>
                  <th className="py-3 px-6">Price</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {rooms.map((room) => (
                  <tr key={room._id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 font-medium">{room.name}</td>
                    <td className="py-3 px-6">{room.type}</td>
                    <td className="py-3 px-6">${room.price}</td>
                    <td className="py-3 px-6 text-center">
                      <button className="text-blue-500 hover:text-blue-700 mr-4">Edit</button>
                      <button 
                        onClick={() => handleDeleteRoom(room._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {rooms.length === 0 && <p className="p-6 text-center text-gray-500">No rooms found.</p>}
          </div>
        )}

        {/* --- Content: Bookings Tab --- */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6">Guest Name</th>
                  <th className="py-3 px-6">Room</th>
                  <th className="py-3 px-6">Date</th>
                  <th className="py-3 px-6">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {bookings.map((booking) => (
                  <tr key={booking._id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 font-medium">{booking.guest}</td>
                    <td className="py-3 px-6">{booking.room}</td>
                    <td className="py-3 px-6">{booking.date}</td>
                    <td className="py-3 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
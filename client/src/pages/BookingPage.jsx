import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import back01 from '../assets/back01.jpg'; // Ensure this path is correct

const BookingPage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  // Form State
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  // Mock Data (Should match your Rooms.jsx data structure)
  const rooms = [
    { _id: 1, name: "Deluxe Ocean View", price: 120, image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800" },
    { _id: 2, name: "Standard Single", price: 80, image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800" },
    { _id: 3, name: "Presidential Suite", price: 350, image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800" },
    { _id: 4, name: "Family Room", price: 180, image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800" },
  ];

  // Find the specific room based on ID from URL
  const room = rooms.find(r => r._id === parseInt(id)) || rooms[0];

  // Calculate Price Effect
  useEffect(() => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diffTime = end - start;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

      if (diffDays > 0) {
        setTotalPrice(diffDays * room.price);
      } else {
        setTotalPrice(0);
      }
    }
  }, [checkIn, checkOut, room.price]);

  // --- UPDATED SUBMIT FUNCTION ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (totalPrice <= 0) {
      alert("Please select valid dates.");
      return;
    }

    try {
      // 1. Send Booking Data to Backend (Save as Pending)
      const response = await fetch('http://localhost:5001/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomName: room.name,
          img: room.image,
          guestName: guestName,
          guestEmail: guestEmail,
          checkIn: checkIn,
          checkOut: checkOut,
          totalPrice: totalPrice
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // 2. Navigate to Payment Page (Pass the new Booking ID)
        navigate('/payment', { 
          state: { 
            bookingId: data._id, // This ID is crucial for the payment step
            totalPrice: totalPrice 
          } 
        });
      } else {
        alert("Failed to save booking: " + (data.message || data.error));
      }

    } catch (error) {
      console.error("Error saving booking:", error);
      alert("Server error. Please ensure your backend is running.");
    }
  };

  return (
    // Main Wrapper with relative positioning
    <div className="relative min-h-screen font-sans">
      
      {/* --- BACKGROUND IMAGE SECTION --- */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${back01})` }} 
      >
        {/* Navy Overlay */}
        <div className="absolute inset-0 bg-blue-950/30"></div>
      </div>

      {/* --- CONTENT SECTION --- */}
      {/* Added 'relative z-10' so content sits on top of background */}
      <div className="relative z-10 container mx-auto px-6 py-12 flex items-center justify-center min-h-screen">
        
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          
          {/* Left Column: Room Summary */}
          <div className="bg-white p-6 rounded-lg shadow-2xl h-fit">
            <img src={room.image} alt={room.name} className="w-full h-48 object-cover rounded-md mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">{room.name}</h2>
            <p className="text-gray-600 mt-2">Price per night: <span className="font-bold text-blue-900">${room.price}</span></p>
            
            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-700">Total Price:</span>
                <span className="text-3xl font-bold text-blue-900">${totalPrice}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Booking Form */}
          <div className="bg-white p-8 rounded-lg shadow-2xl">
            <h3 className="text-2xl font-bold text-blue-900 mb-6">Confirm Booking</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div>
                <label className="block text-gray-700 font-bold mb-1">Check-In</label>
                <input 
                  type="date" 
                  required
                  className="w-full p-3 border rounded focus:outline-blue-900"
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Check-Out</label>
                <input 
                  type="date" 
                  required
                  min={checkIn}
                  className="w-full p-3 border rounded focus:outline-blue-900"
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="Your Name"
                  className="w-full p-3 border rounded focus:outline-blue-900"
                  onChange={(e) => setGuestName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Email</label>
                <input 
                  type="email" 
                  required
                  placeholder="your@email.com"
                  className="w-full p-3 border rounded focus:outline-blue-900"
                  onChange={(e) => setGuestEmail(e.target.value)}
                />
              </div>

              <button type="submit" className="w-full bg-blue-900 text-white font-bold py-3 rounded hover:bg-blue-800 transition mt-4 shadow-lg">
                Pay Now & Book
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BookingPage;
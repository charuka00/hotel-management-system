import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import pay from '../assets/pay.jpg'; // Using your requested background image

const PaymentPage = () => {
  const { state } = useLocation(); // Retrieve data passed from BookingPage
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // If someone tries to open /payment directly without booking data, redirect home
  if (!state) {
    navigate('/');
    return null;
  }

  // We now receive bookingId and totalPrice from the database response in BookingPage
  const { bookingId, totalPrice } = state;

  const handlePayment = async () => {
    setLoading(true);

    try {
      // --- REAL API CALL TO BACKEND ---
      // This updates the status from 'Pending' to 'Confirmed' and triggers the email
      const response = await fetch(`http://localhost:5001/api/bookings/confirm/${bookingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        alert("Payment Successful! A confirmation email has been sent.");
        navigate('/'); // Redirect to Home
      } else {
        alert("Payment failed: " + (data.message || "Unknown error"));
      }

    } catch (error) {
      console.error("Payment Error:", error);
      alert("Server connection failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen font-sans">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ backgroundImage: `url(${pay})` }}
      >
        <div className="absolute inset-0 bg-blue-950/30"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12 flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-2xl max-w-lg w-full">
          <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">Secure Payment</h2>
          
          {/* Order Summary */}
          <div className="bg-gray-50 p-4 rounded mb-6 border border-gray-200">
            <h3 className="font-bold text-gray-700 mb-2">Order Summary</h3>
            
            {/* Displaying Booking Reference instead of Room Name since we pulled ID from DB */}
            <p className="text-gray-600 text-sm">Booking Ref: <span className="font-mono font-semibold">{bookingId}</span></p>
            
            <div className="border-t border-gray-300 mt-2 pt-2 flex justify-between">
              <span className="font-bold text-gray-800">Total to Pay:</span>
              <span className="font-bold text-blue-900 text-xl">${totalPrice}</span>
            </div>
          </div>

          {/* Fake Payment Form */}
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 font-bold mb-1">Card Number</label>
              <input type="text" placeholder="0000 0000 0000 0000" className="w-full p-3 border rounded focus:outline-blue-900" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-bold mb-1">Expiry</label>
                <input type="text" placeholder="MM/YY" className="w-full p-3 border rounded focus:outline-blue-900" />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-1">CVC</label>
                <input type="text" placeholder="123" className="w-full p-3 border rounded focus:outline-blue-900" />
              </div>
            </div>

            <button 
              type="button" 
              onClick={handlePayment}
              disabled={loading}
              className={`w-full text-white font-bold py-3 rounded transition mt-4 shadow-lg ${loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
            >
              {loading ? 'Processing Payment...' : `Pay $${totalPrice}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
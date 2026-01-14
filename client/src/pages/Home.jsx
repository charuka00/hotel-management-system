import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo01 from '../assets/logo01.jpg'; // <--- 1. Import the local image here

const Home = () => {
  // State for the search bar (Visual only for now)
  const [searchParams, setSearchParams] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 1
  });

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* --- HERO SECTION --- */}
      <div className="relative h-[600px] flex items-center justify-center">
        
        {/* 2. Background Image - Uses the imported 'logo01' */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: `url(${logo01})`, // Use the variable with backticks ` `
          }}
        >
          {/* 3. Transparent Overlay (The "Gray/Navy Box") 
             - bg-blue-950/40: This adds the transparent navy tint over your image.
          */}
          <div className="absolute inset-0 bg-blue-950/40"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 mt-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Your spring break plans start here
          </h1>
          <p className="text-xl md:text-2xl mb-8 drop-shadow-md">
            Save up to 20% when you book in advance.
          </p>
          
          <Link to="/rooms" className="bg-white text-blue-900 font-bold py-3 px-8 rounded hover:bg-gray-100 transition shadow-lg">
            Find a Stay
          </Link>
        </div>

        {/* Floating Search Bar (Hilton Style) */}
        <div className="absolute -bottom-16 left-0 right-0 z-20 px-4">
          <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl p-6 grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
            
            {/* Location */}
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-1">Where to?</label>
              <input 
                type="text" 
                placeholder="City, state, or hotel" 
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-900"
              />
            </div>

            {/* Dates */}
            <div className="md:col-span-1">
              <label className="block text-sm font-bold text-gray-700 mb-1">Check-in</label>
              <input type="date" className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-900" />
            </div>
            <div className="md:col-span-1">
              <label className="block text-sm font-bold text-gray-700 mb-1">Check-out</label>
              <input type="date" className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-900" />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-1">
              <button className="w-full bg-blue-900 text-white font-bold py-3.5 rounded hover:bg-blue-800 transition">
                Search
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* --- SPACER for Search Bar --- */}
      <div className="h-24"></div>

      {/* --- SAVE MORE, DO MORE (Grid Section) --- */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-blue-950 mb-8 text-center md:text-left">
          Save more, do more
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="group cursor-pointer">
            <div className="overflow-hidden rounded-lg mb-4 h-64">
              <img 
                src="https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600&auto=format&fit=crop" 
                alt="Pool" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
              />
            </div>
            <h3 className="text-xl font-bold text-blue-900">Save more on wellness</h3>
            <p className="text-gray-600 mt-2">Book your next spa retreat and enjoy exclusive member benefits at our premier locations.</p>
          </div>

          {/* Card 2 */}
          <div className="group cursor-pointer">
            <div className="overflow-hidden rounded-lg mb-4 h-64">
              <img 
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop" 
                alt="Resort" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
              />
            </div>
            <h3 className="text-xl font-bold text-blue-900">Multiply your points</h3>
            <p className="text-gray-600 mt-2">Earn 2X points on every stay when you register for our spring promotion.</p>
          </div>

          {/* Card 3 */}
          <div className="group cursor-pointer">
            <div className="overflow-hidden rounded-lg mb-4 h-64">
              <img 
                src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&auto=format&fit=crop" 
                alt="Bedroom" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
              />
            </div>
            <h3 className="text-xl font-bold text-blue-900">Free nights await</h3>
            <p className="text-gray-600 mt-2">Stay 3 nights and get the 4th night free at participating beach resorts.</p>
          </div>

        </div>
      </section>

      {/* --- PROMO BANNER --- */}
      <section className="bg-blue-950 py-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h2 className="text-3xl font-bold text-white mb-2">Hotel Honors just got more rewarding</h2>
            <p className="text-blue-100">Join for free and start earning points towards free nights.</p>
          </div>
          <Link to="/register" className="bg-white text-blue-900 font-bold py-3 px-8 rounded hover:bg-gray-100 transition">
            Join for Free
          </Link>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xl font-bold mb-4">HotelManager</h4>
            <p className="text-gray-400 text-sm">Experience luxury and comfort in the heart of the city. Your perfect stay awaits.</p>
          </div>
          <div>
            <h5 className="font-bold mb-4 text-gray-200">About Us</h5>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white">Our Story</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Sustainability</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-4 text-gray-200">Support</h5>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white">Customer Service</a></li>
              <li><a href="#" className="hover:text-white">FAQs</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-4 text-gray-200">Follow Us</h5>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white text-xl"><i className="fab fa-facebook"></i> FB</a>
              <a href="#" className="text-gray-400 hover:text-white text-xl"><i className="fab fa-instagram"></i> IG</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-10 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
          &copy; 2024 HotelManager System. All rights reserved.
        </div>
      </footer>

    </div>
  );
};

export default Home;
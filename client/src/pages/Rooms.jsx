import { useState } from 'react';
import RoomCard from '../components/RoomCard';

const Rooms = () => {
  // Temporary Mock Data
  const [rooms] = useState([
    { _id: 1, name: "Deluxe Ocean View", type: "Double", price: 120, image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800" },
    { _id: 2, name: "Standard Single", type: "Single", price: 80, image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800" },
    { _id: 3, name: "Presidential Suite", type: "Suite", price: 350, image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800" },
    { _id: 4, name: "Family Room", type: "Family", price: 180, image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800" },
  ]);

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Our Rooms</h2>
        <p className="text-gray-600 mt-2">Find the perfect space for your stay</p>
      </div>

      {/* Grid Layout for Rooms */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {rooms.map((room) => (
          <RoomCard key={room._id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default Rooms;
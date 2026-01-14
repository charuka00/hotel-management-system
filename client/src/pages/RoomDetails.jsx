import { useParams, Link } from 'react-router-dom';

const RoomDetails = () => {
  const { id } = useParams(); // Gets the ID from the URL (e.g., /room/1)

  // Mock Data (We will fetch this from the backend later)
  // In a real app, we would search the database for the room with this ID
  const room = {
    _id: id,
    name: "Deluxe Ocean View",
    type: "Double",
    price: 120,
    description: "Experience luxury and comfort in this spacious room with a breathtaking view of the ocean. Perfect for couples or small families looking for a relaxing getaway. Includes a private balcony and premium toiletries.",
    amenities: ["Free Wi-Fi", "King Size Bed", "Ocean View", "Private Balcony", "Smart TV", "Mini Bar"],
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800" 
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Large Image */}
        <div className="h-96 w-full">
          <img 
            src={room.image} 
            alt={room.name} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">{room.name}</h1>
              <span className="bg-blue-100 text-primary text-sm font-semibold px-3 py-1 rounded-full">
                {room.type} Room
              </span>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <span className="text-3xl font-bold text-primary">${room.price}</span>
              <span className="text-gray-500 text-lg"> / night</span>
            </div>
          </div>

          <p className="text-gray-600 mt-6 leading-relaxed text-lg">
            {room.description}
          </p>

          {/* Amenities List */}
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {room.amenities.map((item, index) => (
                <div key={index} className="flex items-center text-gray-600">
                  <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-10 flex gap-4">
            <button className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg">
              Book Now
            </button>
            <Link to="/rooms" className="px-8 py-3 border border-gray-300 rounded-lg font-bold text-gray-600 hover:bg-gray-50 transition">
              Back to Rooms
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
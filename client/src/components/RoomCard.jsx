import { Link } from 'react-router-dom';

const RoomCard = ({ room }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image Section */}
      <img 
        src={room.image || "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"} 
        alt={room.name} 
        className="w-full h-48 object-cover"
      />
      
      {/* Content Section */}
      <div className="p-6">
        <div className="flex justify-between items-baseline mb-2">
          <h3 className="text-xl font-bold text-gray-800">{room.name}</h3>
          <span className="bg-blue-100 text-primary text-xs font-semibold px-2 py-1 rounded">
            {room.type}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {room.description || "Experience luxury and comfort in this spacious room with a city view."}
        </p>

        <div className="flex justify-between items-center mt-4">
          <div>
            <span className="text-2xl font-bold text-primary">${room.price}</span>
            <span className="text-gray-500 text-sm"> / night</span>
          </div>
          <Link 
            to={`/room/${room._id}`} 
            className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
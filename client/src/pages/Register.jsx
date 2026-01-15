import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import beachImg from '../assets/beach01.webp'; // <--- 1. Import the image

const Register = () => {
  const navigate = useNavigate(); 

  // 1. State to hold form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { name, email, password } = formData;

  // 2. Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      // Connect to Backend (Port 5001)
      const res = await axios.post('http://localhost:5001/api/auth/register', {
        name,
        email,
        password,
        role: 'user' // Default role
      });

      console.log(res.data);
      alert('Registration Successful!');
      navigate('/login'); 

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    // Updated Container: relative position for background
    <div className="relative min-h-screen flex items-center justify-center px-4">
      
      {/* --- BACKGROUND IMAGE SECTION --- */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${beachImg})` }}
      >
        {/* Transparent Navy Overlay */}
        <div className="absolute inset-0 bg-blue-100/10"></div>
      </div>

      {/* --- REGISTER CARD (z-10 ensures it floats on top) --- */}
      <div className="relative z-10 bg-white p-10 rounded-xl shadow-2xl w-full max-w-lg">
        <h2 className="text-4xl font-bold text-center text-blue-900 mb-8">Create an Account</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2 text-lg">Full Name</label>
            <input 
              type="text" 
              name="name" 
              value={name} 
              onChange={handleChange} 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-lg"
              placeholder="John Doe" 
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2 text-lg">Email</label>
            <input 
              type="email" 
              name="email"
              value={email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-lg"
              placeholder="john@example.com" 
              required
            />
          </div>
          
          <div className="mb-8">
            <label className="block text-gray-700 font-medium mb-2 text-lg">Password</label>
            <input 
              type="password" 
              name="password"
              value={password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-lg"
              placeholder="********" 
              required
            />
          </div>
          
          <button type="submit" className="w-full bg-blue-900 text-white font-bold py-3.5 rounded-lg hover:bg-blue-800 transition shadow-md text-lg">
            Register
          </button>
        </form>
        
        <p className="mt-6 text-center text-gray-600 text-lg">
          Already have an account? 
          <Link to="/login" className="text-blue-900 font-bold ml-1 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
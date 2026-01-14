import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate(); // Hook to redirect user after success

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
    e.preventDefault(); // <--- STOP PAGE RELOAD

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
      navigate('/login'); // Redirect to login page

    } catch (err) {
      console.error(err);
      // Show error message from backend or a default message
      alert(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-primary mb-6">Create an Account</h2>
        
        {/* ADD onSubmit HERE */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Full Name</label>
            <input 
              type="text" 
              name="name"  // Name attribute is required for handleChange
              value={name} // Bind value to state
              onChange={handleChange} // Update state on typing
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe" 
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input 
              type="email" 
              name="email"
              value={email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="john@example.com" 
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input 
              type="password" 
              name="password"
              value={password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="********" 
              required
            />
          </div>
          
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition">
            Register
          </button>
        </form>
        
        <p className="mt-4 text-center text-gray-600">
          Already have an account? 
          <Link to="/login" className="text-blue-600 font-bold ml-1 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
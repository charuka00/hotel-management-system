import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate(); // Hook to move pages

  // 1. State for form data
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  // 2. Handle typing
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // <--- STOPS PAGE RELOAD

    try {
      // Connect to Backend (Port 5001)
      const res = await axios.post('http://localhost:5001/api/auth/login', formData);
      
      // Success! 
      // Save the Token and Role in LocalStorage (Browser Memory)
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);

      alert('Login Successful!');
      
      // Redirect based on role (Optional, but good practice)
      if(res.data.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/'); // Go to home/dashboard for normal users
      }

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || 'Invalid Credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Welcome Back</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input 
              type="email" 
              name="email"
              value={email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email" 
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
              placeholder="Enter your password" 
              required
            />
          </div>
          
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition">
            Login
          </button>
        </form>
        
        <p className="mt-4 text-center text-gray-600">
          Don't have an account? 
          <Link to="/register" className="text-blue-600 font-bold ml-1 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
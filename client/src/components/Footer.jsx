import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Column 1 */}
        <div>
          <h4 className="text-xl font-bold mb-4">Ocean Pearl Resort</h4>
          <p className="text-gray-400 text-sm">
            Experience luxury and comfort in the heart of the city. Your perfect stay awaits.
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <h5 className="font-bold mb-4 text-gray-200">About Us</h5>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><Link to="/about" className="hover:text-white">Our Story</Link></li>
            <li><Link to="/careers" className="hover:text-white">Careers</Link></li>
            <li><Link to="/sustainability" className="hover:text-white">Sustainability</Link></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h5 className="font-bold mb-4 text-gray-200">Support</h5>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><Link to="/contact" className="hover:text-white">Customer Service</Link></li>
            <li><Link to="/faq" className="hover:text-white">FAQs</Link></li>
            <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h5 className="font-bold mb-4 text-gray-200">Follow Us</h5>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white text-xl">FB</a>
            <a href="#" className="text-gray-400 hover:text-white text-xl">IG</a>
            <a href="#" className="text-gray-400 hover:text-white text-xl">TW</a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-10 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Ocean Pearl Resort. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
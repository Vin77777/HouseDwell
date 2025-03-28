import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-8">
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-6 text-gray-700">
        
        {/* HouseDwell Section */}
        <div>
          <h2 className="font-bold text-lg">HouseDwell</h2>
          <p className="text-sm mt-2">
            Find your perfect rental home and predict property prices with help of our  ML model .
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-md">Quick Links</h3>
          <ul className="mt-2 space-y-1 text-sm">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/listings" className="hover:underline">Listings</a></li>
            <li><a href="/predict" className="hover:underline">Price Prediction</a></li>
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h3 className="font-semibold text-md">Legal</h3>
          <ul className="mt-2 space-y-1 text-sm">
            <li><a href="/terms" className="hover:underline">Terms of Service</a></li>
            <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
            <li><a href="/cookies" className="hover:underline">Cookie Policy</a></li>
          </ul>
        </div>

        {/* Social Media & Newsletter */}
        <div>
          <h3 className="font-semibold text-md">Connect With Us</h3>
          <div className="flex space-x-3 mt-2">
            <a href="#" className="text-gray-600 hover:text-black"><FaFacebookF /></a>
            <a href="#" className="text-gray-600 hover:text-black"><FaTwitter /></a>
            <a href="#" className="text-gray-600 hover:text-black"><FaInstagram /></a>
            <a href="#" className="text-gray-600 hover:text-black"><FaLinkedinIn /></a>
          </div>

          <h3 className="font-semibold text-md mt-4">Subscribe to our newsletter</h3>
          <div className="flex mt-2">
            <input 
              type="email" 
              placeholder="Your email" 
              className="w-full border p-2 rounded-l-md text-sm outline-none"
            />
            <button className="bg-black text-white px-4 py-2 rounded-r-md text-sm">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center text-sm text-gray-500 py-4 border-t">
        © 2025 HouseDwell. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

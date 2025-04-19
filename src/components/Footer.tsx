import React from 'react';
import { Link } from 'react-router-dom';
import { PenTool as Tool, Heart, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white pt-8 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
            <div className="flex items-center mb-4">
              <Tool size={24} className="text-green-500" />
              <h2 className="ml-2 text-xl font-bold">ToolShare</h2>
            </div>
            <p className="text-gray-400 mb-4">
              Connecting neighbors through shared tools. 
              Borrow, lend, and build community together.
            </p>
            <div className="flex items-center space-x-2">
              <span className="flex items-center">
                <Heart size={16} className="text-red-500 mr-1" />
                Made with love for Greenfield
              </span>
            </div>
          </div>
          
          <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/tools" className="text-gray-400 hover:text-white transition-colors">
                  Tool Catalog
                </Link>
              </li>
              <li>
                <Link to="/reservations" className="text-gray-400 hover:text-white transition-colors">
                  My Reservations
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-400 hover:text-white transition-colors">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/tools?category=1" className="text-gray-400 hover:text-white transition-colors">
                  Power Tools
                </Link>
              </li>
              <li>
                <Link to="/tools?category=2" className="text-gray-400 hover:text-white transition-colors">
                  Hand Tools
                </Link>
              </li>
              <li>
                <Link to="/tools?category=3" className="text-gray-400 hover:text-white transition-colors">
                  Garden Tools
                </Link>
              </li>
              <li>
                <Link to="/tools?category=8" className="text-gray-400 hover:text-white transition-colors">
                  Woodworking
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="text-green-500 mr-2 mt-1" />
                <span className="text-gray-400">
                  Greenfield Community Center<br />
                  123 Main Street<br />
                  Greenfield, CA 94301
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-green-500 mr-2" />
                <span className="text-gray-400">(555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-green-500 mr-2" />
                <a href="mailto:info@toolshare.org" className="text-gray-400 hover:text-white transition-colors">
                  info@toolshare.org
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-6 pt-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} ToolShare. All rights reserved.</p>
          <p className="mt-2">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            {' • '}
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
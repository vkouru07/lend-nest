import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Menu, X, PenTool as Tool, Home, Calendar, User, LogOut } from 'lucide-react';

const Navbar: React.FC = () => {
  const { currentUser, logOut } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { path: '/', label: 'Home', icon: <Home size={20} /> },
    { path: '/tools', label: 'Tools', icon: <Tool size={20} /> },
    { path: '/reservations', label: 'My Reservations', icon: <Calendar size={20} /> },
    { path: '/profile', label: 'Profile', icon: <User size={20} /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-green-700 text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
          <Tool size={24} />
          <span className="text-xl font-bold">ToolShare</span>
        </Link>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center space-x-1 hover:text-green-200 transition-colors ${
                isActive(link.path) ? 'font-semibold text-green-100' : ''
              }`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
          
          {currentUser && (
            <div className="flex items-center space-x-3">
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name} 
                className="w-8 h-8 rounded-full object-cover"
              />
              <button 
                onClick={logOut} 
                className="flex items-center space-x-1 hover:text-green-200 transition-colors"
                aria-label="Log out"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </nav>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-green-800 px-4 py-2">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-2 py-2 hover:bg-green-700 rounded px-2 transition-colors ${
                  isActive(link.path) ? 'bg-green-700 font-semibold' : ''
                }`}
                onClick={closeMenu}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
            
            {currentUser && (
              <div className="border-t border-green-600 pt-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name} 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span>{currentUser.name}</span>
                </div>
                <button 
                  onClick={() => { logOut(); closeMenu(); }} 
                  className="flex items-center space-x-1 hover:text-green-200 transition-colors p-2"
                  aria-label="Log out"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
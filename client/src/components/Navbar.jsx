import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle the hamburger menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-800 p-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-2xl font-bold">
          <Link to="/">MyBusiness</Link>
        </div>

        {/* Desktop Navbar */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-white">Home</Link>
          <Link to="/about" className="text-white">About Us</Link>
          <Link to="/portfolio" className="text-white">Portfolio</Link>
          <Link to="/contact" className="text-white">Contact</Link>
        </div>

        {/* Mobile Hamburger Menu */}
        <button
          className="md:hidden text-white"
          onClick={toggleMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} mt-4 space-y-4`}
      >
        <Link to="/" className="block text-white">Home</Link>
        <Link to="/about" className="block text-white">About Us</Link>
        <Link to="/portfolio" className="block text-white">Portfolio</Link>
        <Link to="/contact" className="block text-white">Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;

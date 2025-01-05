import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-black text-white z-10 w-full top-0 left-0">
      <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4">
        {/* Social Icons */}
        <div className="flex space-x-4 md:order-1">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <i className="fab fa-instagram text-lg"></i>
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <i className="fab fa-facebook text-lg"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <i className="fab fa-twitter text-lg"></i>
          </a>
        </div>

        {/* Business Name */}
        <h1 className="text-2xl md:text-4xl font-bold text-center md:order-2 md:flex-grow mr-0 md:mr-20">
          <Link to="/">Cinematography</Link>
        </h1>

        {/* Hamburger Menu Toggle */}
        <div className="md:hidden order-3">
          <button
            className="text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"}`}></i>
          </button>
        </div>
      </div>

      {/* Desktop Navbar (doesn't overlay content) */}
      <nav className="hidden md:flex justify-center space-x-10 bg-black py-4">
        <Link to="/" className="hover:text-gray-400">
          HOME
        </Link>
        <Link to="/portfolio" className="hover:text-gray-400">
          PORTFOLIO
        </Link>
        <Link to="/rental" className="hover:text-gray-400">
          RENTAL
        </Link>
        <Link to="/about" className="hover:text-gray-400">
          ABOUT
        </Link>
        <Link to="/contact" className="hover:text-gray-400">
          CONTACT
        </Link>
      </nav>

      {/* Mobile Menu (overlays content) */}
      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black flex flex-col items-center justify-center z-40">
          <Link
            to="/"
            className="text-white text-xl mb-6"
            onClick={() => setIsMenuOpen(false)}
          >
            HOME
          </Link>
          <Link
            to="/portfolio"
            className="text-white text-xl mb-6"
            onClick={() => setIsMenuOpen(false)}
          >
            PORTFOLIO
          </Link>
          <Link
            to="/rental"
            className="text-white text-xl mb-6"
            onClick={() => setIsMenuOpen(false)}
          >
            RENTAL
          </Link>
          <Link
            to="/about"
            className="text-white text-xl mb-6"
            onClick={() => setIsMenuOpen(false)}
          >
            ABOUT
          </Link>
          <Link
            to="/contact"
            className="text-white text-xl"
            onClick={() => setIsMenuOpen(false)}
          >
            CONTACT
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto text-center">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-blue-400 mb-6">Get in Touch</h2>

        {/* Social and Contact Links */}
        <div className="flex justify-center gap-8 mb-6">
          {/* Instagram Link */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 text-xl"
          >
            <i className="fab fa-instagram"></i> Instagram
          </a>
          {/* Email Link */}
          <a
            href="mailto:email@example.com"
            className="hover:text-blue-500 text-xl"
          >
            <i className="fas fa-envelope"></i> Email@email.com
          </a>
          {/* Phone Link */}
          <a
            href="tel:+123456789"
            className="hover:text-blue-500 text-xl"
          >
            <i className="fas fa-phone-alt"></i> +359 88 1111111
          </a>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-6 mb-4"></div>

        {/* Copyright */}
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Your Business Name. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

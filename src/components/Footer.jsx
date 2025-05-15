import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="d-flex bg-footer text-white">
      <div className="max-w-7xl mx-auto py-6 px-4 flex flex-col sm:flex-row items-center justify-between">
        <p className="mb-4 sm:mb-0 text-lg"></p>

        <div className="mt- d-flex justify-content-around">
          <a
            href="#"
            aria-label="Facebook"
            className="hover:text-pink-500 transition-colors duration-200"
          >
            <FaFacebookF size={30} />
          </a>

          <a
            href="#"
            aria-label="Twitter"
            className="hover:text-pink-500 transition-colors duration-200"
          >
            <FaTwitter size={30} />
          </a>

          <a
            href="#"
            aria-label="Instagram"
            className="hover:text-pink-500 transition-colors duration-200"
          >
            <FaInstagram size={30} />
          </a>
        </div>

        <p className="mt-5 sm:mt-0 text-sm opacity-75">© 2025 GameLab. All rights reserved.</p>
      </div>
    </footer>
  );
}
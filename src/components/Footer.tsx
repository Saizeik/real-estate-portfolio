"use client";

import { FaFacebookF, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white text-center py-6 mt-20">
      <p className="text-white/90 mb-2">
        Real Estate photographer serving Seattle, WA and surrounding areas
      </p>

      {/* Social icons */}
      <div className="flex justify-center space-x-6 mb-2">
        <a
          href="https://www.facebook.com/people/Stephanie-Kaye-Photography/61556626255168/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-indigo-200 hover:bg-indigo-300 transition-transform transform hover:scale-110"
        >
          <FaFacebookF size={20} />
        </a>
        <a
          href="https://www.instagram.com/stephaniekayephoto/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-indigo-200 hover:bg-indigo-300 transition-transform transform hover:scale-110"
        >
          <FaInstagram size={20} />
        </a>
      </div>

      <p className="text-white/90">
        &copy; {new Date().getFullYear()} Stephanie Kaye Photography | Seattle, WA
      </p>
    </footer>
  );
}

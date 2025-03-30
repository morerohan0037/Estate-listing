import React from "react";
import fb from "../assets/icons/fb.svg";
import ig from "../assets/icons/insta.svg";
import x from "../assets/icons/x.svg";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-black py-6 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        {/* Social Media Links */}
        <ul className="flex gap-4">
          <li>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <img src={fb} alt="Facebook" className="w-6 h-6 hover:opacity-75 transition duration-300" />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <img src={ig} alt="Instagram" className="w-6 h-6 hover:opacity-75 transition duration-300" />
            </a>
          </li>
          <li>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img src={x} alt="X" className="w-6 h-6 hover:opacity-75 transition duration-300" />
            </a>
          </li>
        </ul>

        {/* Copyright */}
        <div className="text-sm">&copy; {new Date().getFullYear()} EarthlyStays. All rights reserved.</div>

        {/* Privacy & Terms */}
        <div className="text-sm">
          <a href="/privacy" className="hover:underline">Privacy</a> | <a href="/terms" className="hover:underline">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

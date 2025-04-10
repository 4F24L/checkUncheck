import React from "react";
import logo from '../assets/checkUncheck logo.png'

const Nav = () => {
  return (
    <div className="relative z-10 text-white overflow-hidden">
      <nav className="relative z-10 flex items-center justify-between px-8 py-4">
        <img className="text-2xl font-bold text-lime-400" src={logo} width={'60px'}/>
        <div className="hidden md:flex gap-6 text-sm">
          <a href="#features" className="hover:text-lime-400">
            Features
          </a>
          <a href="#about" className="hover:text-lime-400">
            About
          </a>
          <a href="#services" className="hover:text-lime-400">
            Services
          </a>
          <a href="#faqs" className="hover:text-lime-400">
            FAQs
          </a>
        </div>
        <button className="bg-lime-400 text-black px-4 py-2 rounded-md hover:bg-lime-300 transition">
          Login
        </button>
      </nav>
    </div>
  );
};

export default Nav;

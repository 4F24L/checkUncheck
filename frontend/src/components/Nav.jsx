import React from "react";
import logo from '../assets/checkUncheck-logo.png'

const Nav = () => {
  const navItems = [
    { id: "#features", label: "Features" },
    { id: "#about", label: "About" },
    { id: "#testimonials", label: "Testimonials" },
    { id: "#faqs", label: "FAQs" },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative z-10 md:px-14 text-white overflow-hidden">
      <nav className="relative z-10 flex items-center justify-between px-8 py-4">
      {/* logo  */}
        <img className="text-2xl font-bold text-lime-400" src={logo} width={'60px'}/>

        {/* Nav elems  */}
        <ul className="hidden md:flex gap-12 text-base list-none border-2 border-[#c4b8b86b] bg-[#453e3ea4] px-10 py-2 rounded-full">
          {navItems.map((item) => (
            <li key={item.id}>
              <a  onClick={()=>{
                scrollToSection(item.id)
              }} className="hover:text-lime-400 cursor-pointer ">
                {item.label}
              </a> 
            </li>
          ))}
        </ul>

         {/* button  */}
        <button className="bg-lime-400 text-black px-4 py-2 rounded-md hover:bg-lime-300 transition">
          Login
        </button>
      </nav>
    </div>
  );
};

export default Nav;

import React, { useState, useRef } from "react";
import logo from "../assets/checkUncheck-logo.png";
import {
  ChevronLeft,
  EllipsisVertical,
  Info,
  LayoutList,
  MessageSquareHeart,
  ShieldQuestion,
} from "lucide-react";
import { useClickOutside } from "react-haiku";

const Nav = () => {
  const navItems = [
    { id: "#features", label: "Features", logo: LayoutList },
    { id: "#about", label: "About", logo: Info },
    { id: "#testimonials", label: "Testimonials", logo: MessageSquareHeart },
    { id: "#faqs", label: "FAQs", logo: ShieldQuestion },
  ];

  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef(null);

  const handleClickOutside = () => setMenuOpen(false);
  useClickOutside(ref, handleClickOutside);

  if (menuOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "unset";
  }

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative z-10 md:px-14 text-white overflow-hidden">
      <nav className="relative z-10 flex items-center justify-between px-8 py-4">
        {/* logo  */}
        <img
          className="text-2xl font-bold text-lime-400"
          src={logo}
          width={"60px"}
        />

        {/* Nav elems  */}
        <ul className="hidden md:flex gap-12 text-base list-none border-2 border-[#c4b8b86b] bg-[#453e3ea4] px-10 py-2 rounded-full">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                onClick={() => {
                  scrollToSection(item.id);
                }}
                className="hover:text-lime-400 cursor-pointer "
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex justify-between items-center">
          <button className="bg-lime-400 text-black px-4 py-2 rounded-md hover:bg-lime-300 transition">
            Login
          </button>

          <span
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden border-[2px] border-[#6a6262] mx-2 p-1 rounded-3xl bg-[#2C2828] cursor-pointer transform transition-transform duration-300"
          >
            {menuOpen ? (
              <ChevronLeft size={30} />
            ) : (
              <EllipsisVertical size={30} />
            )}
          </span>
        </div>
      </nav>

      {menuOpen && (
        <div
          ref={ref}
          className="sm:hidden fixed z-32 w-6/11 right-12 border-2 border-[#6a6262] bg-[#272917] top-20 rounded-2xl"
        >
          <ul className="list-none my-2 select-none ">
            {navItems.map((item) => (
              <li
                key={item.id}
                onClick={() => {
                  scrollToSection(item.id);
                  setMenuOpen(!menuOpen);
                  document.body.style.overflow = "unset";
                }}
                className=" flex items-center py-1 gap-2 border text-[1.35rem] px-2.5 mx-2 rounded-lg mb-2.5 bg-[#181818] text-[#efefef]"
              >
                <item.logo size={25}/> {item.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Nav;

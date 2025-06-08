import React from "react";
import Nav from "../components/Nav";
import HeroSection from "../components/Hero-Section";
import HeroNext from "../components/HeroNext";

const LandingPage = () => {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden sm:pt-2">
      <svg
        className="absolute inset-0 w-full h-full z-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="dots"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="2" fill="#a2ff00" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" opacity="0.1" />
      </svg>

      <Nav />
      <HeroSection />
      <HeroNext/>
    </div>
  );
};

export default LandingPage;

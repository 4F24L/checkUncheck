import React from "react";
import Nav from "../components/Nav";
import HeroSection from "../components/Hero-Section";
import HeroNext from "../components/HeroNext";
import DottedBG from "../components/DottedBG";

const LandingPage = () => {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden sm:pt-2">
      <DottedBG/>

      <Nav />
      <HeroSection />
      <HeroNext/>
    </div>
  );
};

export default LandingPage;

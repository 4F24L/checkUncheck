import React, { useState } from "react";
import api from "../utils/api";
import toast, { Toaster } from "react-hot-toast";

const HeroSection = () => {

  return (
    <div className="relative z-10 sm:mb-9 text-white overflow-x-hidden">
      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-3 pt-28">
        <div className="w-full max-w-2xl">
          <h1 className="text-3xl md:text-6xl font-semibold mb-6">
            checkUncheck
            <br /> Simplify your teamwork
          </h1>
          <p className="text-gray-300 mb-8 ">
            Streamline Your Team's Workflow – <span className="sm:hidden"><br/></span>Manage, Assign, and Collaborate on
            Tasks with Ease.
          </p>
          <div className="flex items-center justify-center gap-5 flex-col sm:flex-row ">
            <button
              className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none "
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gray-950 px-3 md:px-6 py-1 font-medium text-white backdrop-blur-3xl">
                Get Started, It's FREE
              </span>
            </button>

            <span className=" text-lg text-start">
              Free forever,
              <span className="sm:hidden">&nbsp; </span>
              <span className="hidden sm:inline"><br /> </span>
              No credit card.
            </span>
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  );
};

export default HeroSection;

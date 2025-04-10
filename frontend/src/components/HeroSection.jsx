import axios from "axios";
import React, { useState } from "react";
import api from "../utils/api";
import toast, { Toaster } from "react-hot-toast";

const HeroSection = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email) return toast.error("Email required");
      const response = await api.post("/collect-email", {
        email: email,
      });

      if (response.status === 200) {
        setSubmitted(true);
        setEmail("");
        toast.success("Thank you for subscribing!");
        setTimeout(() => {
          toast.success("We'll keep you updated");
        }, 1700);
      } else if (response.status === 400) {
        toast.error(response.data.message);
      } else {
        console.error("Error:", response.data.message);
        toast.error("Error: " + response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="relative z-10 h-[80vh] text-white overflow-hidden">
      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-3 pt-28">
        <div className="w-full max-w-2xl">
          <h1 className="text-3xl md:text-6xl font-semibold mb-6">
            checkUncheck
            <br /> Simplify your teamwork
          </h1>
          <p className="text-gray-300 mb-8">
            Streamline Your Team's Workflow – Manage, Assign, and Collaborate on
            Tasks with Ease. Arriving shortly.
          </p>
          <div className="flex items-center justify-center gap-2 flex-col sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter your email"
              className="px-4 py-2 rounded-md w-[280px] sm:w-[320px] bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none"
            />
            <button
              onClick={handleSubmit}
              className="bg-lime-400 text-black px-6 py-2 rounded-md hover:bg-lime-300 transition shadow-md"
            >
              Submit Now
            </button>
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  );
};

export default HeroSection;

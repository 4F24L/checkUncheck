import React from "react";
import Nav from "../components/Nav";
import GoogleLoginBtn from "../components/GoogleLoginBtn";
import DottedBG from "../components/DottedBG";
import RegisterForm from "../components/RegisterForm";

const SignUp = () => {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden sm:pt-2 ">
      <DottedBG />

      <Nav />
      <div className="relative z-10 max-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-gradient-to-tr from-gray-900 via-black to-gray-900 rounded-2xl shadow-2xl p-6">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Create Account
          </h2>
          <RegisterForm />

          <div className=" my-3 w-full ">
            <GoogleLoginBtn />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

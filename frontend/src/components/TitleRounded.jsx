import React from "react";

const TitleRounded = ({ title, id, subTitle }) => {
  return (
    <div id={id} className=" flex flex-col justify-center w-full relative mt-12 mb-6 sm:mt-20 sm:pt-6">
      <div className=" flex justify-center w-full relative">
        <span className="z-10 bg-[#181818] text-xs sm:text-xl  px-4 py-2 text-lime-400 border-2 border-[#c4b8b86b] rounded-full">
          {title.toUpperCase()}
        </span>

        <div className="absolute top-1/2 left-0 right-0">
          <hr className="border-t-2 border-[#c4b8b86b] mx-2" />
        </div>
      </div>


      <p className=" text-2xl sm:text-4xl my-5 text-gray-200 opacity-80 font-extralight px-3">{subTitle}</p>
    </div>
  );
};

export default TitleRounded;

import React from "react";
import trelloLogo from "../assets/trello-seeklogo.svg";
import asanaLogo from "../assets/asana-seeklogo-2.svg";
import clickupLogo from "../assets/clickup-black-seeklogo.svg";
import jiraLogo from "../assets/jira-seeklogo.svg";
import mondayLogo from "../assets/monday-seeklogo.svg";

const HeroNext = () => {
  const altArray = [
    {
      name: "Trello",
      logo: trelloLogo,
    },
    {
      name: "Asana",
      logo: asanaLogo,
    },
    {
      name: "ClickUp",
      logo: clickupLogo,
    },
    {
      name: "Jira",
      logo: jiraLogo,
    },
    {
      name: "Monday.com",
      logo: mondayLogo,
    },
  ];

  return (
    <>
      {/* All other alternatives  */}
      <div className=" w-full text-center mt-24 h-[500px]">
        <p className=" text-4xl md:text-6xl font-semibold bg-gradient-to-r from-gray-50 to-zinc-800 bg-clip-text text-transparent opacity-80 ">
          Powerful Alternatives Trusted Worldwide
        </p>

        <div class="grid grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-6 mt-5 sm:mt-12 sm:px-3">
          {altArray.map((alt, index) => {
            const isLast = index === altArray.length - 1;
            return (
              <div
                key={alt.name}
                // bg-gradient-to-l from-[#ffffffae] to-[#5b54548d]
                className={`flex justify-center items-center  mx-7 rounded-2xl  ${
                  isLast ? "col-span-2 lg:col-span-1" : ""
                }`}
              >
                <img  src={alt.logo} className=" grayscale-96 brightness-900 w-[80%] sm:w-[90%]" />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HeroNext;

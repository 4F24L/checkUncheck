import React from "react";
import trelloLogo from "../assets/trello-seeklogo.svg";
import asanaLogo from "../assets/asana-seeklogo-2.svg";
import clickupLogo from "../assets/clickup-black-seeklogo.svg";
import jiraLogo from "../assets/jira-seeklogo.svg";
import mondayLogo from "../assets/monday-seeklogo.svg";
import TitleRounded from "./TitleRounded";
import {
  HeartHandshake,
  Workflow,
  CalendarCheck,
  Blocks,
  History,
  Lightbulb,
  ShieldUser,
  SquareTerminal,
  Import,
} from "lucide-react";
import notificationIcon from "../assets/notification-icon.svg";
import realtimeWorkIcon from "../assets/realtime-work.svg";
import workflowIcon from "../assets/workflow.svg";
import progressTrackIcon from "../assets/progress-track.svg";
import integrationIcon from "../assets/integration.svg";
import faq from "../data/faq.json";

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

  const featArray = [
    {
      logo: realtimeWorkIcon,
      icon: HeartHandshake,
      title: "Real-Time Collaboration",
      description:
        "Collaborate seamlessly with your team in real-time, ensuring everyone is on the same page with live updates.",
    },
    {
      logo: workflowIcon,
      icon: Workflow,
      title: "Customizable Workflows",
      description:
        "Create and modify workflows to fit your team's unique needs with customizable task boards, labels, and priorities.",
    },
    {
      logo: notificationIcon,
      icon: CalendarCheck,
      title: "Automated Task Reminders",
      description:
        "Set automatic reminders to stay on top of deadlines and never miss an important task again.",
    },
    {
      logo: integrationIcon,
      icon: Blocks,
      title: "Powerful Integrations",
      description:
        "Integrate with popular tools like Google Calendar, Slack, Trello, and more to centralize all your workflows.",
    },
    {
      logo: progressTrackIcon,
      icon: History,
      title: "Progress Tracking & Reports",
      description:
        "Get detailed progress reports and track your team's performance with insights into task completion and productivity.",
    },
  ];

  const aboutArray = [
    {
      title: "Innovative Solutions",
      description:
        "We craft creative and effective solutions tailored to modern business challenges.",
      logo: Lightbulb,
    },
    {
      title: "Client-Centric Approach",
      description:
        "Our priority is understanding client needs to deliver exceptional results.",
      logo: ShieldUser,
    },
    {
      title: "Passionate Team",
      description:
        "A dedicated team that thrives on building impactful digital experiences.",
      logo: SquareTerminal,
    },
  ];

  return (
    <>
      {/* All other alternatives  */}
      <div className=" w-full text-center mt-24">
        <p className=" text-4xl md:text-6xl font-semibold bg-gradient-to-r from-gray-50 to-zinc-800 bg-clip-text text-transparent opacity-80 ">
          Powerful Alternatives Trusted Worldwide
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-6 my-5 sm:mt-8 sm:px-3">
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
                <img
                  src={alt.logo}
                  className=" grayscale-96 brightness-900 w-[80%] sm:w-[90%]"
                />
              </div>
            );
          })}
        </div>

        {/* features section  */}
        <TitleRounded
          title={"What You'll Receive"}
          id={"#features"}
          subTitle={"Your challenges, our smart solutions."}
        />
        <div className="grid grid-cols-1 sm:grid-cols-6 gap-y-4 sm:gap-6 p-2">
          {/* First Row (3 cards, 2 cols each) */}
          {featArray.slice(0, 3).map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="relative col-span-2 mx-1 group">
                <div className=" absolute z-10 bg-[#2C2F15] p-2 border-2 border-[#252525] rounded-full m-3.5  group-hover:scale-110 transform transition-transform duration-300 ">
                  <Icon size={30} />
                </div>
                <div className="bg-[#181818] p-6 rounded-2xl shadow-2xl transition-transform transform duration-300 flowing-border ">
                  <img
                    src={feature.logo}
                    alt={feature.title}
                    className="w-48 h-32 sm:w-56 sm:h-44 mb-4 mx-auto opacity-72"
                  />
                  <h3
                    className="text-2xl font-medium text-slate-300 text-left my-1 group-hover:translate-x-3.5 group-hover:scale-105 
                  transform transition-transform duration-300"
                  >
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#b1b1b1] text-left my-1 group-hover:translate-x-1 transform transition-transform duration-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Second Row (2 cards, 3 cols each) */}
          {featArray.slice(3).map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index + 3} className="relative col-span-3 mx-1 group">
                <div className=" absolute z-10 bg-[#2C2F15] p-2 border-2 border-[#252525] rounded-full m-3.5  group-hover:scale-110 transform transition-transform duration-300 ">
                  <Icon size={30} />
                </div>
                <div className="bg-[#181818] p-6 rounded-2xl shadow-2xl transition-transform transform duration-300 flowing-border border border-transparent">
                  <img
                    src={feature.logo}
                    alt={feature.title}
                    className="w-48 h-36 sm:w-56 sm:h-44 mb-4 mx-auto opacity-72"
                  />
                  <h3 className="text-2xl font-medium text-slate-300 text-left my-1 group-hover:translate-x-5 group-hover:scale-105 transform transition-transform duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#b1b1b1] text-left my-1 group-hover:translate-x-1 transform transition-transform duration-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* about us  */}
        <TitleRounded
          title={"Innovating Your Future"}
          id={"#about"}
          subTitle={"Transforming challenges into opportunities."}
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-4 sm:gap-6 p-2">
          {/*(3 cards, 1 cols each) */}
          {aboutArray.map((card, index) => {
            const Icon = card.logo;
            return (
              <div key={index} className="relative col-span-1 mx-1 group">
                <div className="bg-[#181818] p-5 rounded-2xl shadow-2xl transition-transform transform duration-300 flowing-border">
                  <div className="w-16 h-16 flex justify-center items-center bg-[#2C2F15] p-2 border-2 mb-8 sm:mb-14 border-[#252525] rounded-full ">
                    <Icon size={40} />
                  </div>
                  <h3
                    className="text-2xl font-medium text-slate-300 text-left my-1 group-hover:translate-x-6 group-hover:scale-110 
                  transform transition-transform duration-300"
                  >
                    {card.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#b1b1b1] text-left my-1 group-hover:translate-x-1 transform transition-transform duration-300">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Testimonials  */}
        <TitleRounded
          // title={"What Our Clients Say"}
          title={"Coming Soon"}
          id={"#testimonials"}
          // subTitle={"Real stories, real impact."}
          subTitle={"No testimonials yet! Be the first to share your thoughts."}
        />

        {/* FAQs  */}
        <TitleRounded
          title={"Quick Answers"}
          id={"#faqs"}
          subTitle={"Everything you need to know. Uploading Soon"}
        />

        
      </div>
    </>
  );
};

export default HeroNext;

import { CardDemo } from "./CardDemo";

import {
  Download,
  Clock,
  Sparkles,
  FileText,
  Share2,
  Bot,
  Languages
} from "lucide-react";



const Features = () => {
   const steps = [
     {
    title: "AI Powered",
    description:
      "YTNotes uses powerful AI models to transform YouTube videos into comprehensive and structured notes.",
    icons: Sparkles,
  },
   {
  title: "Multi-Language Support",
  description:
    "Extracts accurate content from YouTube videos in over 100 languages — no matter what language the video is in.",
  icons: Languages, // optional: can replace with Globe, Languages, or Translate icon if available
},
  {
    title: "Smart Summary",
    description:
      "Get concise, to-the-point highlights that capture the essence of the entire video.",
    icons: Bot,
  },
  {
    title: "Save Hours",
    description:
      "Stop wasting time watching entire videos. Get instant summaries and notes within seconds.",
    icons: Clock,
  },
  {
    title: "Download Notes",
    description:
      "Export your notes in multiple formats including TXT, JSON, CSV, SRT, and VTT for flexible use.",
    icons: Download,
  },

  {
    title: "Easy Sharing",
    description:
      "Easily share notes with teammates or friends across platforms for collaboration or learning.",
    icons: Share2,
  },
  
];


  return (
    <section className="py-[60px] px-[60px] bg-zinc-900 max-w-[1440px] mx-auto w-full ">
      <div className="">
        {/* Header */}
        <div className="text-center mb-[60px]">
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-[25px]">
            Powerfull{" "}
            <span className="bg-gradient-to-r from-[#c471f5] via-[#fa71cd] to-[#fda085] bg-clip-text text-transparent">
              Features{" "}
            </span>
         
          </h2>
          <p className="text-[20px] leading-snug text-gray-400 text-center ">
            Transform any YouTube video into comprehensive, AI-generated notes
            in just four simple steps.
            <br />
            Perfect for students, researchers, and content creators.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {steps.map((step, index) => {
            const IconComponent = step.icons;
            return (
             <div className="relative h-full flex flex-col bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-2xl p-8 hover:bg-zinc-800/70 transition-all duration-500 hover:scale-105 hover:border-zinc-600/50 group
  before:absolute before:bottom-0 before:left-0 before:w-full before:h-1/2 before:bg-gradient-to-t before:from-[#c471f5]/20 before:to-transparent before:rounded-2xl before:z-0
">

                {/* Icon */}
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#c471f5] via-[#fa71cd] to-[#fda085] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content Block */}
                <div className="flex flex-col flex-grow">
                  <h3 className="text-2xl font-semibold text-white mb-4 text-center group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#c471f5] group-hover:via-[#fa71cd] group-hover:to-[#fda085] group-hover:bg-clip-text transition-all duration-300">
                    {step.title}
                  </h3>
                  <p className="text-zinc-400 text-center font-light leading-normal group-hover:text-zinc-300 transition-colors duration-300 mt-auto">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        {/* <div className="text-center">
          <div className="inline-flex items-center gap-4 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-2xl p-8">
            <div className="w-12 h-12 bg-gradient-to-r from-[#c471f5] via-[#fa71cd] to-[#fda085] rounded-full flex items-center justify-center">
              <Youtube className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <h4 className="text-xl font-semibold text-white mb-1">
                Ready to get started?
              </h4>
              <p className="text-zinc-400">
                Join thousands of users who are already turning videos into
                valuable notes.
              </p>
            </div>
          </div>
        </div> */}

        {/* Decorative Elements */}
        {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-10 w-32 h-32 bg-gradient-to-r from-[#c471f5] to-[#fa71cd] rounded-full opacity-10 blur-3xl " />
          <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-gradient-to-r from-[#fa71cd] to-[#fda085] rounded-full opacity-10 blur-3xl " style={{ animationDelay: '1s' }} />
        </div> */}
      </div>
    </section>
  );
};

export default Features;
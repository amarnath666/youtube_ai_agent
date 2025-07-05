import { Download, UserPlus } from "lucide-react";
import { LuBrain } from "react-icons/lu";
import { FaYoutube } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Login",
      description:
        "Create your account to get started with AI-powered YouTube video note generation. Quick and easy registration process.",
      icon: UserPlus,
      delay: "0ms",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      number: "02",
      title: "Add Video URL",
      description:
        "Paste any YouTube video URL and let our AI begin processing. We support videos of all lengths and topics.",
      icon: FaYoutube,
      delay: "200ms",
      gradient: "from-blue-500 to-purple-500",
    },
    {
      number: "03",
      title: "Generating Notes",
      description:
        "Wait while our AI transcribes and analyzes your video content. We extract key insights and create comprehensive notes.",
      icon: LuBrain,
      delay: "400ms",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      number: "04",
      title: "Download Notes",
      description:
        "Download organized notes in your preferred format—TXT, PDF, CSV, SRT, or VTT—for easy studying, sharing, or reviewing later.",
      icon: Download,
      delay: "600ms",
      gradient: "from-green-500 to-cyan-500",
    },
  ];

  return (
    <section className="my-[45px] lg:my-[100px] px-4 md:px-[30px] lg:px-[60px] bg-zinc-900 max-w-[1440px] mx-auto w-full ">
      <div className="">
        {/* Header */}
        <div className="text-center mb-[30px] md:mb-[60px]">
          <h2 className="text-[32px] md:text-5xl font-semibold text-white mb-[15px] md:mb-[25px]">
            How It{" "}
            <span className="bg-gradient-to-r from-[#c471f5] via-[#fa71cd] to-[#fda085] bg-clip-text text-transparent">
              Works
            </span>
          </h2>
              <p className="text-[14px] md:text-[20px] leading-snug text-gray-400 text-center ">
            Transform any YouTube video into comprehensive,
            <br />
            AI-generated notes in just four simple steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6  items-stretch">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div
                className="relative h-full flex flex-col bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-2xl p-8 hover:bg-zinc-800/70 transition-all duration-500 hover:scale-105 hover:border-zinc-600/50 group   before:absolute before:bottom-0 before:left-0 before:w-full before:h-1/2 before:bg-gradient-to-t before:from-[#c471f5]/20 before:to-transparent before:rounded-2xl before:z-0

"
              >
                {/* Step Number */}
                {/* <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-[#c471f5] via-[#fa71cd] to-[#fda085] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {step.number}
                </div> */}

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
      </div>
    </section>
  );
};

export default HowItWorks;

{
  /* Bottom CTA */
}
{
  /* <div className="text-center">
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
        </div> */
}

{
  /* Decorative Elements */
}
{
  /* <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-10 w-32 h-32 bg-gradient-to-r from-[#c471f5] to-[#fa71cd] rounded-full opacity-10 blur-3xl " />
          <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-gradient-to-r from-[#fa71cd] to-[#fda085] rounded-full opacity-10 blur-3xl " style={{ animationDelay: '1s' }} />
        </div> */
}

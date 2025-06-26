"use client";

import { AnimatedShinyTextDemo } from "../AnimatedTextDemo";
import CustomButton from "../CustomButton";
import { useRouter } from "next/navigation";

const Support = () => {
  const router = useRouter();
  return (
    <div className="py-[60px] px-[60px] bg-zinc-900 max-w-[1440px] mx-auto w-full  text-center ">
      <div
        className=" bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-2xl py-[60px] hover:bg-zinc-800/70 transition-all duration-500 hover:border-zinc-600/50 group before:absolute before:top-0 before:left-0 before:w-full before:h-1/2 before:bg-gradient-to-b before:from-[#c471f5]/20 before:to-transparent before:rounded-2xl before:z-0
 "
      >
         <AnimatedShinyTextDemo name={"✨ AI Powered Notes"} />
        <h2 className="text-4xl md:text-5xl font-semibold text-white my-[25px]">
          Start Turning Videos into <br />  Notes <span className="bg-gradient-to-r from-[#c471f5] via-[#fa71cd] to-[#fda085] bg-clip-text text-transparent">Instantly</span>
        </h2>
        <p className="text-[20px] leading-snug text-gray-400 text-center pb-[25px]">
            Say goodbye to hours of manual note-taking. <br />
  Let our AI do the work—fast, smart, and accurate.
        </p>

        <CustomButton
          name={"Generate Your First Notes"}
          onClick={() => router.push("/signin")}
        />
      </div>
    </div>
  );
};

export default Support;

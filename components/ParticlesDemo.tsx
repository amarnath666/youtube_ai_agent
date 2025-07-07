"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Particles } from "@/components/magicui/particles";
import { useRouter } from "next/navigation";
import { AnimatedShinyTextDemo } from "./AnimatedTextDemo";
import CustomButton from "./CustomButton";
import WhiteButton from "./WhiteButton";
import { AuroraText } from "./magicui/aurora-text";
import { NavbarDemo } from "./NavbarDemo";

export function ParticlesDemo() {
  const { resolvedTheme } = useTheme();
  const [color, setColor] = useState("#ffffff");
  const router = useRouter();
  useEffect(() => {
    setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
  }, [resolvedTheme]);

  return (
    <div className="relative h-screen bg-zinc-900 before:absolute before:top-0 before:left-0 before:w-full before:h-1/2 before:bg-gradient-to-b before:from-[#c471f5]/20 before:to-transparent before:content-[''] rounded-b-[25px]">
      <NavbarDemo />
      <div className="flex flex-col items-center justify-center h-[calc(100vh-65px)] relative w-full  px-4 md:px-[30px] lg:px-[60px]">
        <AnimatedShinyTextDemo name={"✨ AI Powered Notes"} />
        <span className="pointer-events-none z-10 whitespace-pre-wrap text-center text-[32px] xs:text-4xl md:text-6xl xl:text-8xl font-semibold leading-none bg-gradient-to-br from-white from-30% to-white/40 mt-[25px] bg-clip-text text-transparent">
          Turn YouTube Videos <br />
          into{" "}
          <span className="bg-gradient-to-r from-[#c471f5] via-[#fa71cd] to-[#fda085] bg-clip-text text-transparent">
            Smart Notes
          </span>
        </span>
        <p className="text-[16px] md:text-[20px] leading-snug text-gray-400 text-center pb-[25px] mt-[25px] max-w-[650px] mx-auto">
          Effortlessly convert any YouTube video into clear, concise notes.
          Perfect for learning, revising, or sharing key takeaways — all in
          seconds.
        </p>
        <WhiteButton
          name="✨ Get Started For Free"
          onClick={() => router.push("/signin")}
        />
        <Particles
          className="absolute inset-0 z-0"
          quantity={100}
          ease={80}
          color={color}
          refresh
        />
      </div>
    </div>
  );
}

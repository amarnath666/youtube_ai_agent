"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Particles } from "@/components/magicui/particles";
import HompageHeader from "./HomepageHeader";
import AiButton from "./ai-button";
import WorkButton from "./WorkButton";
import { AnimatedShinyTextDemo } from "./AnimatedTextDemo";
import { RainbowButton } from "./magicui/rainbow-button";
import { ShimmerButton } from "./magicui/shimmer-button";

export function ParticlesDemo() {
  const { resolvedTheme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
  }, [resolvedTheme]);

  return (
    <div className="relative h-screen bg-zinc-900 ">
      <HompageHeader />
      <div className=" flex  w-full flex-col items-center overflow-hidden  pt-[100px]">
        <AnimatedShinyTextDemo />
        <span className="pointer-events-none z-10 whitespace-pre-wrap text-center text-8xl font-semibold leading-none bg-gradient-to-br from-white from-30% to-white/40 mt-[25px]   bg-clip-text text-transparent">
           Turn YouTube Videos <br />
          into Smart Notes
        </span>

        <p className="text-[20px] leading-snug text-gray-600 text-center  pb-[25px] mt-[25px]">
          Effortlessly convert any YouTube video into clear, concise notes.
          <br />
          Perfect for learning, revising, or sharing key takeaways — all in
          seconds.
        </p>
        <ShimmerButton>Get Started</ShimmerButton>
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

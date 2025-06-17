"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Particles } from "@/components/magicui/particles";
import HompageHeader from "./HomepageHeader";
import AiButton from "./ai-button";
import WorkButton from "./WorkButton";

export function ParticlesDemo() {
  const { resolvedTheme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
  }, [resolvedTheme]);

  return (
    <div className="relative h-screen  ">
      <HompageHeader />
      <div className=" flex  w-full flex-col items-center overflow-hidden rounded-lg  pt-[100px]">
        <span className="pointer-events-none z-10 whitespace-pre-wrap text-center text-8xl font-semibold leading-none text-black pb-[25px]">
          Turn{" "}
          <img
            src="/yotube.webp"
            alt="YouTube"
            className="inline h-[1.2em] mx-2"
          />
         YouTube Videos <br />
          into Smart Notes
        </span>

        <p className="text-[20px] leading-snug text-gray-600 text-center pb-[50px]">
          Effortlessly convert any YouTube video into clear, concise notes.
          <br />
          Perfect for learning, revising, or sharing key takeaways — all in
          seconds.
        </p>
        <WorkButton />
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

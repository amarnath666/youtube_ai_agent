"use client";
import CustomButton from "./CustomButton";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const HompageHeader = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  return (
    <header>
      <nav className=" border-gray-200 px-4 lg:px-[50px] pt-[25px] bg-zinc-900 w-full">
        <div className="flex flex-wrap justify-center items-center mx-auto w-full">
          <a href="/" className="flex items-center">
            {/* <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" /> */}
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white mr-3">
              YTNotes
            </span>
          </a>
          
        </div>
      </nav>
    </header>
  );
};

export default HompageHeader;

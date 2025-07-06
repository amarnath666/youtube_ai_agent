"use client";

// import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useNavigation } from "@/lib/context/navigation";
import { NavigationContext } from "@/lib/context/navigation";
import { use } from "react";
import { signOut } from "next-auth/react";
import Profile from "./ui/Profile";
import { redirect } from "next/navigation";

export default function Header() {
  const { setIsMobileNavOpen } = use(NavigationContext);

  return (
    <header className="border-b border-gray-500/50 bg-zinc-800 backdrop-blur-xl sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileNavOpen(true)}
            className="md:hidden text-gray-500 hover:text-gray-700 hover:bg-gray-100/50"
          >
            <HamburgerMenuIcon className="h-5 w-5" />
          </Button>
          <div 
          onClick={() => redirect("/")}
          className="font-semibold cursor-pointer">YTNotes</div>
        </div>
        <div className="flex items-center">
           <Profile />
          {/* <button
            className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 text-gray-500 transition-all duration-200"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Logout
          </button> */}
        </div>
      </div>
    </header>
  );
}

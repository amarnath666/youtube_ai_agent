"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";
import { toast } from "sonner";
// import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { SpinnerComponent } from "@/components/ui/Spinner";
import { isInAppBrowser } from "@/components/ui/AppinBrower";

export default function SignInPage() {
  //   const searchParams = useSearchParams();
  //   const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (isInAppBrowser()) {
      // Show your custom modal or redirect user to open in Chrome/Safari
      alert(
        "Google login won't work in this browser. Please open in Chrome/Browser."
      );
      return;
    }
    try {
      setLoading(true);
      await signIn("google", {
        callbackUrl: "/dashboard",
      });
    } catch (error) {
      toast.error("Login Failed");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Sign in</h1>
      {/* ✅ Google Button inside the modal */}
      <div className="w-full max-w-[350px] flex flex-row justify-center">
        <Button
          variant="outline"
          className="w-full bg-white flex flex-row cursor-pointer text-black"
          onClick={() => handleSignIn()}
        >
          {loading ? (
            <SpinnerComponent />
          ) : (
            <>
              <FaGoogle className="mr-2 h-5 w-5 text-black" />
              Google
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

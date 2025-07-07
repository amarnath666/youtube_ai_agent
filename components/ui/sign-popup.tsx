import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";
import { toast } from "sonner";
import { useState } from "react";
import { SpinnerComponent } from "./Spinner";
import { isInAppBrowser } from "./AppinBrower";

export function SignPopup({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
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
      await signIn("google");

      toast.success("Login Successful");
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md py-[50px]">
        <DialogHeader className="flex flex-col items-center justify-center">
          <DialogTitle>Login to YTNotes</DialogTitle>
        </DialogHeader>

        {/* ✅ Google Button inside the modal */}
        <Button
          variant="outline"
          className="w-full flex flex-row cursor-pointer bg-white text-black "
          onClick={() => handleSignIn()}
          disabled={loading}
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
      </DialogContent>
    </Dialog>
  );
}

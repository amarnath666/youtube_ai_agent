import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { signIn } from "next-auth/react"
import { FaGoogle } from "react-icons/fa";
import { toast } from "sonner";

export function SignPopup({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
    const handleSignIn = async () => {
        try {
            await signIn("google");
         
            toast.success("Login Successful");
            setOpen(false);
        } catch (error) {
            console.error(error);
            toast.error("Login Failed");
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
          className="w-full flex flex-row cursor-pointer "
          onClick={() => handleSignIn()}
        >
          <FaGoogle className="mr-2 h-5 w-5 text-white" />
          Google
        </Button>

       
      </DialogContent>
    </Dialog>
  );
}


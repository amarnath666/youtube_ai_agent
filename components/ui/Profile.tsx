import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, LayoutDashboard } from "lucide-react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { capitalizeAfterSpace } from "@/lib/helper";
import { MdOutlineVerified } from "react-icons/md";


const Profile = () => {
  const { data: session, status } = useSession();

  if (!session) {
    return
  }

  const existingUser = session?.user;

  if (!existingUser) {
    return <div>No user found</div>;
  }


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={existingUser?.image as string || "https://pub-c6b2c51e46d544939af2d74ef91f1668.r2.dev/catalagoue-products/684fba3a-74c8-4ca5-ac38-b227b475fd2b.webp"} />
         
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel className="flex flex-row items-center justify-center gap-2">
          <Avatar>
            <AvatarImage src={existingUser?.image as string || "https://pub-c6b2c51e46d544939af2d74ef91f1668.r2.dev/catalagoue-products/684fba3a-74c8-4ca5-ac38-b227b475fd2b.webp"} />
            {/* <AvatarFallback>CN</AvatarFallback> */}
          </Avatar>
          {capitalizeAfterSpace(existingUser?.name as string)}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <Link href="/dashboard">
          <DropdownMenuItem className="cursor-pointer">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </DropdownMenuItem>
        </Link>
         <Link href="/dashboard/subscription">
          <DropdownMenuItem className="cursor-pointer">
            <MdOutlineVerified className="w-5 h-5" />
              Subscription
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => signOut()}
        >
          <LogOut className="w-5 h-5" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;

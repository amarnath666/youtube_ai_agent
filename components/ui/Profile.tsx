import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, LayoutDashboard } from "lucide-react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const capitalizeAfterSpace = (str: string) => {
  return str.replace(/(?:^|\s)\S/g, (match) => match.toUpperCase());
};

const Profile = () => {
  const { data: session, status } = useSession();

  if (!session) {
    return <div>Not signed in</div>;
  }

  const existingUser = session?.user;

  if (!existingUser) {
    return <div>No user found</div>;
  }

  console.log(existingUser, "exiting usesr");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={existingUser?.image as string} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel className="flex flex-row items-center justify-center gap-2">
          <Avatar>
            <AvatarImage src={existingUser?.image as string} />
            <AvatarFallback>CN</AvatarFallback>
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

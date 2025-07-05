
import axios from "axios";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongoose";
import Chat from "@/models/chat";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);


  if (!session) {
    redirect("/api/auth/signin");
  }

  await dbConnect();

  const chats = await Chat.find({ userId: session.user.id });

  if (chats.length > 0) {
    redirect(`/dashboard/chat/${chats[0]._id}`);
  } else {
    const newChat = await Chat.create({
      userId: session.user.id,
      title: "New Chat",
    });
    redirect(`/dashboard/chat/${newChat._id}`);
  }

  return null;
}
  // (
  //   <div className="flex-1 flex items-center justify-center p-4 bg-zinc-900">
  //     <div className="relative max-w-2xl w-full">
  //       {/* Decorative elements */}
  //       <div className="absolute inset-0 -z-10 bg-zinc-800 rounded-3xl"></div>
  //       <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:4rem_4rem] rounded-3xl"></div>

  //       <div className="relative space-y-6 p-8 text-center">
  //         <div className="bg-zinc-800/80 backdrop-blur-sm shadow-sm ring-1 ring-zinc-700 rounded-2xl p-6 space-y-4">
  //           <div className="bg-zinc-700 rounded-xl p-4 inline-flex">
  //             <FaYoutube className="w-12 h-12 text-white" />
  //           </div>
  //           <h2 className="text-2xl font-semibold bg-gradient-to-br from-white to-zinc-300 bg-clip-text text-transparent">
  //             Welcome to the YTNotes Chat
  //           </h2>
  //           <p className="text-zinc-300 max-w-md mx-auto">
  //             Start a new conversation or select an existing chat from the
  //             sidebar.
  //           </p>
  //           <div className="pt-2 flex justify-center gap-4 text-sm text-white">
  //             <div className="flex items-center gap-1.5">
  //               <div className="w-2 h-2 rounded-full bg-blue-500"></div>
  //               Real-time responses
  //             </div>
  //             <div className="flex items-center gap-1.5">
  //               <div className="w-2 h-2 rounded-full bg-green-500"></div>
  //               Smart Notes
  //             </div>
  //             <div className="flex items-center gap-1.5">
  //               <div className="w-2 h-2 rounded-full bg-purple-500"></div>
  //               Download in any format
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
// import TimeAgo from "react-timeago";
import { cn } from "@/lib/utils";
import { NavigationContext } from "@/lib/context/navigation";
import { use } from "react";
import ChatRow from "./ChatRow";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Sidebar() {
  const router = useRouter();
  const { isMobileNavOpen, closeMobileNav } = use(NavigationContext);
  const [chats, setChats] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchChats = async () => {
      setIsLoading(true);
      const response = await axios.get("/api/chat");
      setChats(response.data);
      setIsLoading(false);
    };
    fetchChats();
  }, []);

  // const chats = useQuery(api.chat.listChats);
  // const createChat = useMutation(api.chat.createChat);
  // const deleteChat = useMutation(api.chat.deleteChat);

  const handleNewChat = async () => {
    const res = await axios.post("/api/chat", {
      title: "New Chat",
    });

    const chatId = res.data.chatId;
    router.push(`/dashboard/chat/${chatId}`);
    closeMobileNav();
  };

  // const handleNewChat = async () => {
  //   // const chatId = await createChat({ title: "New Chat" });
  //   // router.push(`/dashboard/chat/${chatId}`);
  //   closeMobileNav();
  // };

  const handleDeleteChat = async (id: any) => {
    try {
    const res = await axios.delete("/api/chat", {
      data: {
        id,
      },
    });

    router.push("/dashboard");
    toast.success("Chat deleted successfully");
  } catch (error: any) {
    toast.error(error?.message || "Error deleting chat");
    console.error("Error deleting chat:", error);
  }
  };

  return (
    <>
      {/* Background Overlay for mobile */}
      {isMobileNavOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={closeMobileNav}
        />
      )}

      <div
        className={cn(
          "fixed md:inset-y-0 top-14 bottom-0 left-0 z-50 w-72 bg-zinc-900 backdrop-blur-xl border-r border-gray-200/50 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:top-0 flex flex-col",
          isMobileNavOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-4 ">
          <Button
            onClick={handleNewChat}
            className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-200/50 shadow-sm hover:shadow transition-all duration-200"
          >
            <PlusIcon className="mr-2 h-4 w-4" /> New Chat
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2.5 p-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
          <p className=" text-gray-300 text-sm">Chats</p>
          {chats?.map((chat) => (
            <ChatRow key={chat._id} chat={chat} onDelete={handleDeleteChat} />
          ))}
        </div>
      </div>
    </>
  );
}

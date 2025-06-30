"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BotIcon,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { MessageBubbleProps } from "@/lib/types";
import { formatMessage, isSummaryContent } from "@/lib/helper";
import CopyDownloadDropdown from "./ui/CopyDropdown";


export function MessageBubble({ content, isUser }: MessageBubbleProps) {
  const { data: session, status } = useSession();
  const user = session?.user;

  const showSummaryOptions = isSummaryContent(content);

  return (
    <div
      className={`flex bg-zinc-800 ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`rounded-2xl bg-zinc-900  px-4 py-2.5 max-w-[85%] md:max-w-[75%] shadow-sm  relative ${
          isUser
            ? "bg-blue-600 text-white rounded-br-none "
            : "bg-white text-gray-900 rounded-bl-none "
        }`}
      >
        {showSummaryOptions && (
          <div className="absolute bottom-2 right-2">
            <CopyDownloadDropdown content={content} />
          </div>
        )}
        <div className="whitespace-pre-wrap text-[15px] leading-relaxed text-white">
          <div dangerouslySetInnerHTML={{ __html: formatMessage(content) }} />
        </div>

        <div
          className={`absolute bottom-0 ${
            isUser
              ? "right-0 translate-x-1/2 translate-y-1/2"
              : "left-0 -translate-x-1/2 translate-y-1/2"
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full  ${
              isUser ? " " : "bg-blue-600 "
            } flex items-center justify-center shadow-sm`}
          >
            {isUser ? (
              <Avatar className="h-7 w-7">
                <AvatarImage src={user?.image as string} />
                <AvatarFallback>{user?.name}</AvatarFallback>
              </Avatar>
            ) : (
              <BotIcon className="h-5 w-5 text-white" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

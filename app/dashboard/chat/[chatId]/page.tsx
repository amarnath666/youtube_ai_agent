import ChatInterface from "@/components/ChatInterface"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { getConvexClient } from "@/lib/convex"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

interface ChatPageParams {
  params: {
    chatId: Id<"chats">
  }
}

const ChatPage =  async ({ params }: ChatPageParams) => {
    const {chatId} = await params
    const { userId } = await auth()

    if (!userId) {
        redirect("/")
    }

    const convex = await getConvexClient()

    const initialMessages = await convex.query(api.messages.list , { chatId })
  return (
    <div className="flex-1 overflow-hidden">
        <ChatInterface chatId={chatId} initialMessages={initialMessages} />
    </div>
  )

  
}

export default ChatPage
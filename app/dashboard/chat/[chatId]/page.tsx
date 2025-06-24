"use client"

import ChatInterface from "@/components/ChatInterface"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { getConvexClient } from "@/lib/convex"
// import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import axios from "axios"

interface ChatPageParams {
  params: {
    chatId: Id<"chats">
  }
}

const ChatPage =   ({ params }: ChatPageParams) => {
    const {chatId} =  params
  
    const [messages, setMessages] = useState<any>([])

    useEffect(() => {
      const fetchMessages = async () => {
        const res = await axios.get(`/api/message?chatId=${chatId}`)
        setMessages(res.data)
      
      }
      fetchMessages()
    }, []);

    // const { userId } = await auth()

    // if (!userId) {
    //     redirect("/")
    // }

    // const convex = await getConvexClient()

    // const initialMessages = await convex.query(api.messages.list , { chatId })

    console.log("messages", messages)
  return (
    <div className="flex-1 overflow-hidden">
        <ChatInterface chatId={chatId} initialMessages={messages} />
    </div>
  )

  
}

export default ChatPage
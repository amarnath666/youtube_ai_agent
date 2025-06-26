"use client"

import ChatInterface from "@/components/ChatInterface"
import { useEffect, useState } from "react"
import axios from "axios"

const ChatPage =   ({
  params,
}: any) => {
    const {chatId} =  params
    const [messages, setMessages] = useState<any>([])

    useEffect(() => {
      const fetchMessages = async () => {
        const res = await axios.get(`/api/message?chatId=${chatId}`)
        setMessages(res.data)
      
      }
      fetchMessages()
    }, []);
  return (
    <div className="flex-1 overflow-hidden">
        <ChatInterface chatId={chatId} initialMessages={messages} />
    </div>
  )  
}

export default ChatPage
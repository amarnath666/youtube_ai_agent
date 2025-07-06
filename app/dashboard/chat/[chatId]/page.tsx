"use client"

import ChatInterface from "@/components/ChatInterface"
import { useEffect, useState } from "react"
import axios from "axios"
import CustomSpinner from "@/components/ui/CustomSpinner"

const ChatPage =   ({
  params,
}: any) => {
    const {chatId} =  params
    const [messages, setMessages] = useState<any>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      const fetchMessages = async () => {
        try {
          setIsLoading(true)
        const res = await axios.get(`/api/message?chatId=${chatId}`)
        setMessages(res.data)
        setIsLoading(false)
        } catch (error) {
          console.error(error)
        } finally {
          setIsLoading(false)
        }
      }
      fetchMessages()
    }, []);

    if (isLoading) {
      return <CustomSpinner />
    }

  return (
    <div className="flex-1 overflow-hidden">
        <ChatInterface chatId={chatId} initialMessages={messages} />
    </div>
  )  
}

export default ChatPage
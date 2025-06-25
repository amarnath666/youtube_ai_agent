import { getServerSession } from "next-auth/next"
import dbConnect from '@/lib/mongoose'
import { authOptions } from "@/lib/auth"
import { NextResponse } from 'next/server'
import Chat from '@/models/chat'
import Message from '@/models/message'

export async function POST(req: Request) {
    try {
 const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

   await dbConnect()

  const { title } = await req.json()

  const chat = await Chat.create({
    title,
    userId: session.user.id,
  })

  return NextResponse.json({ chatId: chat._id })
} catch (error : any) {
  console.error(error)
  return NextResponse.json({ error: error.message }, { status: 500 })
}
}

export async function GET(req: Request) {
    console.log("getting chats")
    try {
  const session = await getServerSession(authOptions)
  console.log("session", session)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

   await dbConnect()
   console.log("connected to db")


  const chats = await Chat.find({ userId: session.user.id })
  console.log("chats", chats)

  return NextResponse.json(chats)
}  catch (error : any) {
  console.error(error)
  return NextResponse.json({ error: error.message }, { status: 500 })
}
}

export async function DELETE(req: Request) {
    try {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

   await dbConnect()


  const { id } = await req.json()

  const messages = await Message.find({ chatId: id })

  await Message.deleteMany({ chatId: id })

  await Chat.deleteOne({ _id: id })

  return NextResponse.json({ message: "Chat deleted" })
}  catch (error : any) {
  console.error(error)
  return NextResponse.json({ error: error.message }, { status: 500 })
}
}


import { getServerSession } from "next-auth/next"
import dbConnect from '@/lib/mongoose'
import { authOptions } from "../../auth/[...nextauth]/route"
import { NextResponse } from 'next/server'
import Message from '@/models/message'

export async function POST(req: Request) {
    try {
 const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

   await dbConnect()

  const { chatId, content } = await req.json();

  const message = await Message.create({
    chatId,
    content,
    role: "user",
  });

  return NextResponse.json({ messageId: message._id })
} catch (error : any) {
  console.error(error)
  return NextResponse.json({ error: error.message }, { status: 500 })
}
}
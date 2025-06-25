import Chat from "@/models/chat";
import { getServerSession } from "next-auth/next"
import dbConnect from '@/lib/mongoose'
import { authOptions } from "@/lib/auth";
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    // ✅ Extract query params from req.url
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('chatId');

    if (!id) {
      return NextResponse.json({ error: 'Missing chat id' }, { status: 400 });
    }

    const chat = await Chat.findById(id);

    if (!chat) {
      return NextResponse.json({ error: 'Chat not found' }, { status: 404 });
    }

    return NextResponse.json(chat);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
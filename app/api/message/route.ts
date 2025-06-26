import { getServerSession } from "next-auth/next";
import dbConnect from "@/lib/mongoose";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

import Message from "@/models/message";

export async function GET(req: Request) {
  console.log("getting messages");
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    // ✅ Extract query params from req.url
    const { searchParams } = new URL(req.url);
    console.log("searchParams", searchParams);
    const id = searchParams.get("chatId");

    console.log("id", id);

    if (!id) {
      return NextResponse.json({ error: "Missing chat id" }, { status: 400 });
    }

    const messages = await Message.find({ chatId: id });

    return NextResponse.json(messages);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

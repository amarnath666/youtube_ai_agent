import { auth } from "@clerk/nextjs/server";
import { ChatRequestBody } from "@/lib/types";
import { getConvexClient } from "@/lib/convex";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new Response("Not authenticated", { status: 401 });
        }

        const { messages, newMessage, chatId } = await req.json() as ChatRequestBody;

        const stream = new TransformStream({}, { highWaterMark: 1024 });
        const writer = stream.writable.getWriter();

        const convex = await getConvexClient();

        const response = new Response(stream.readable, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
            },
        })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
} 
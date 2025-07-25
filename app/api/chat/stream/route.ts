import { submitQuestion } from "@/lib/langgraph";
import { NextResponse } from "next/server";
import { AIMessage, HumanMessage, ToolMessage } from "@langchain/core/messages";
import {
  ChatRequestBody,
  StreamMessage,
  StreamMessageType,
  SSE_DATA_PREFIX,
  SSE_LINE_DELIMITER,
} from "@/lib/types";
import { getServerSession } from "next-auth/next";
import dbConnect from "@/lib/mongoose";
import { authOptions } from "@/lib/auth";
import message from "@/models/message";


function sendSSEMessage(
  writer: WritableStreamDefaultWriter<Uint8Array>,
  data: StreamMessage
) {
  const encoder = new TextEncoder();
  return writer.write(
    encoder.encode(
      `${SSE_DATA_PREFIX}${JSON.stringify(data)}${SSE_LINE_DELIMITER}`
    )
  );
}

export async function POST(req: Request) {
  // console.log("started POST route");
  try {
    console.log("started POST route");
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { messages, newMessage, chatId } =
      (await req.json()) as ChatRequestBody;
    // console.log("messages from next route", messages);
    // console.log("newMessage from next route", newMessage);
    console.log("chatId from next route", chatId);

    // Create stream with larger queue strategy for better performance
    const stream = new TransformStream({}, { highWaterMark: 1024 });
    // console.log("stream", stream);
    const writer = stream.writable.getWriter();
    // console.log("writer", writer);
    console.log("writer", writer);

    const response = new Response(stream.readable, {
      headers: {
        "Content-Type": "text/event-stream",

        Connection: "keep-alive",
        "X-Accel-Buffering": "no", // Disable buffering for nginx which is required for SSE to work properly
      },
    });

    console.log("response from next route", response);
    await dbConnect();
    console.log("connected to db");

    // console.log("response from next route", response);

    // Handle the streaming response
    (async () => {
      try {
        console.log("streaming response");
        // Send initial connection established message
        await sendSSEMessage(writer, { type: StreamMessageType.Connected });
        console.log("sent connected message");
        // Send user message to Convex
        // await convex.mutation(api.messages.send, {
        //   chatId,
        //   content: newMessage,
        // });

        await message.create({
          chatId,
          content: newMessage,
          role: "user",
        });

        // Convert messages to LangChain format
        const langChainMessages = [
          ...messages.map((msg) =>
            msg.role === "user"
              ? new HumanMessage(msg.content)
              : new AIMessage(msg.content)
          ),
          new HumanMessage(newMessage),
        ];

        try {
          // Create the event stream
          console.log(
            "------------------- calling submitQuestion -------------------"
          );
          const eventStream = await submitQuestion(langChainMessages, chatId);

          // Process the events
          for await (const event of eventStream) {
            //console.log("------------------- event -------------------", event);

            if (event.event === "on_chat_model_stream") {
              const token = event.data.chunk;

              if (token) {
                // Access the text property from the AIMessageChunk
                const text = token.content;

                // console.log("text from on_chat_model_stream", text);
                if (text) {
                  await sendSSEMessage(writer, {
                    type: StreamMessageType.Token,
                    token: text,
                  });
                }
              }
            } else if (event.event === "on_tool_start") {
              // console.log("token from on_tool_start", event.event);
              await sendSSEMessage(writer, {
                type: StreamMessageType.ToolStart,
                tool: event.name || "unknown",
                input: event.data.input,
              });
            } else if (event.event === "on_tool_end") {
              // console.log("token from on_tool_start", event.event);
              const toolMessage = new ToolMessage(event.data.output);

              await sendSSEMessage(writer, {
                type: StreamMessageType.ToolEnd,
                tool: toolMessage.lc_kwargs.name || "unknown",
                output: event.data.output,
              });
            }
          }
          // console.log("sent all messages");
          // Send completion message without storing the response
          console.log("sending done");
          await sendSSEMessage(writer, { type: StreamMessageType.Done });
        } catch (streamError) {
          console.error("Error in event stream:", streamError);
          await sendSSEMessage(writer, {
            type: StreamMessageType.Error,
            error:
              streamError instanceof Error
                ? streamError.message
                : "Stream processing failed",
          });
        }
      } catch (error) {
        console.error("Error in stream:", error);
        await sendSSEMessage(writer, {
          type: StreamMessageType.Error,
          error: error instanceof Error ? error.message : "Unknown error",
        });
      } finally {
        try {
          await writer.close();
        } catch (closeError) {
          console.error("Error closing writer:", closeError);
        }
      }
    })();

    return response;
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "Failed to process chat request" } as const,
      { status: 500 }
    );
  }
}

import { ChatDeepSeek } from "@langchain/deepseek";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import wxflows from "@wxflows/sdk/langchain";
import {
  END,
  MemorySaver,
  MessagesAnnotation,
  START,
  StateGraph,
} from "@langchain/langgraph";
import SYSTEM_MESSAGE, { baseUrl } from "@/constants/systemMessage";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import {
  AIMessage,
  BaseMessage,
  HumanMessage,
  SystemMessage,
  trimMessages,
} from "@langchain/core/messages";
import { z } from "zod";
import { DynamicStructuredTool } from "@langchain/core/tools";
import axios from "axios";

// Trim the messages to manage conversation history
const trimmer = trimMessages({
  maxTokens: 15,
  strategy: "last",
  tokenCounter: (msgs) => msgs.length,
  includeSystem: true,
  allowPartial: false,
  startOn: "human",
});

// const toolClient = new wxflows({
//   endpoint: process.env.WX_ENDPOINT || "",
//   apikey: process.env.wx_api_key || "",
// });

// // Retrieve the tools
// const tools = await toolClient.lcTools;
// const toolNode = new ToolNode(tools);

// YouTube transcript tool
const createYouTubeTranscriptTool = () => {
  console.log("🎥 Creating YouTube transcript tool...");
  return new DynamicStructuredTool({
    name: "youtube_transcript",
    description:
      "Get transcript from a YouTube video URL. Supports videos in almost all languages.",
    schema: z.object({
      url: z.string().describe("The YouTube video URL"),
    }),
    func: async ({ url }) => {
      try {
        console.log("🎥 Fetching YouTube transcript for:", url);

        const apiUrl = `${baseUrl}/youtube-transcript`;
        const response = await axios.post(apiUrl, { url });

        console.log("response came", response);

        const data = response?.data;

        console.log("addded to data");

        if (data.error) {
          throw new Error(data.error);
        }

        // Format response for better analysis
        if (Array.isArray(data) && data?.length > 0) {
          const doc = data[0];
          const metadata = doc?.metadata || {};

          return `📹 VIDEO INFORMATION:
Title: ${metadata.title || "Unknown"}
Channel: ${metadata.author || "Unknown"}
View Count: ${metadata.view_count || "Unknown"}

📝 FULL TRANSCRIPT:
${doc.pageContent}

📊 TRANSCRIPT STATS:
- Word count: ~${doc.pageContent.split(" ").length}
- Character count: ${doc.pageContent.length}`;
        }

        return "No transcript data available for this video.";
      } catch (error: any) {
        console.error("❌ YouTube transcript error:", error);
        return `${error.message}`;
      }
    },
  });
};

const initialiseModel = () => {
  const youtubeTranscriptTool = createYouTubeTranscriptTool();
  const tools = [youtubeTranscriptTool];

  const model = new ChatDeepSeek({
    model: "deepseek-chat",
    temperature: 0.7,
    maxTokens: 3000,
    apiKey: process.env.DEEPSEEK_API_KEY,
    streaming: true,

    callbacks: [
      {
        handleLLMStart: async () => {
          // console.log("🤖 Starting LLM call");
        },
        handleLLMEnd: async (output) => {
          // console.log("🤖 End LLM call", output);
          const usage = output.llmOutput?.usage;
          // if (usage) {
          //   console.log("📊 Token Usage:", {
          //     input_tokens: usage.input_tokens,
          //     output_tokens: usage.output_tokens,
          //     total_tokens: usage.input_tokens + usage.output_tokens,
          //     cache_creation_input_tokens:
          //       usage.cache_creation_input_tokens || 0,
          //     cache_read_input_tokens: usage.cache_read_input_tokens || 0,
          //   });
          // }
        },
        handleLLMNewToken: async (token: string) => {
          // console.log("🔤 New token:", token);
        },
      },
    ],
  }).bindTools(tools);

  return { model, tools };
};

// Define the function that determines whether to continue or not
function shouldContinue(state: typeof MessagesAnnotation.State) {
  const messages = state.messages;
  const lastMessage = messages[messages.length - 1] as AIMessage;

  // If the LLM makes a tool call, then we route to the "tools" node
  if (lastMessage.tool_calls?.length) {
    return "tools";
  }

  // Otherwise, we stop (reply to the user)
  return END;
}

// Define a new graph
const createWorkflow = () => {
  // console.log("createWorkflow");
  const { model, tools } = initialiseModel();

  const toolNode = new ToolNode(tools);

  const stateGraph = new StateGraph(MessagesAnnotation)
    .addNode("agent", async (state) => {
      // Create the system message content
      const systemContent = SYSTEM_MESSAGE;

      // Create the prompt template with system message and messages placeholder
      const promptTemplate = ChatPromptTemplate.fromMessages([
        new SystemMessage(systemContent, {
          cache_control: { type: "ephemeral" },
        }),
        new MessagesPlaceholder("messages"),
      ]);

      // console.log("promptTemplate", promptTemplate);

      // Trim the messages to manage conversation history
      const trimmedMessages = await trimmer.invoke(state.messages);

      // console.log("trimmedMessages", trimmedMessages);

      // Format the prompt with the current messages
      const prompt = await promptTemplate.invoke({ messages: trimmedMessages });

      // console.log("prompt", prompt);

      // Get response from the model
      const response = await model.invoke(prompt);

      // console.log("response", response);

      return { messages: [response] };
    })
    .addNode("tools", toolNode)
    .addEdge(START, "agent")
    .addConditionalEdges("agent", shouldContinue)
    .addEdge("tools", "agent");

  return stateGraph;
};

function addCachingHeaders(messages: BaseMessage[]): BaseMessage[] {
  if (!messages.length) return messages;

  const cachedMessages = [...messages];
  const lastMessage = cachedMessages[cachedMessages.length - 1];

  if (lastMessage && typeof lastMessage.content === "string") {
    lastMessage.content = [
      {
        type: "text",
        text: lastMessage.content,
        cache_control: { type: "ephemeral" },
      },
    ];
  }

  return cachedMessages;
}

export async function submitQuestion(messages: BaseMessage[], chatId: string) {
  // console.log("submitQuestion");
  const cachedMessages = addCachingHeaders(messages);

  // console.log("cachedMessages", cachedMessages);
  const workflow = createWorkflow();

  // Create a checkpoint to save the state of the conversation
  const checkpointer = new MemorySaver();
  const app = workflow.compile({ checkpointer });

  // console.log("messages before checkpointing:", messages);
  // console.log("chatId:", chatId);

  // Run the graph & stream
  const stream = await app.streamEvents(
    {
      messages,
    },
    {
      version: "v2",
      configurable: {
        thread_id: chatId,
      },
      streamMode: "messages",
      runId: chatId,
    }
  );
  return stream;
}

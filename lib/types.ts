
// SSE Constants
export const SSE_DATA_PREFIX = "data: " as const;
export const SSE_DONE_MESSAGE = "[DONE]" as const;
export const SSE_LINE_DELIMITER = "\n\n" as const;

export type MessageRole = "user" | "assistant";

export interface Message {
    role: MessageRole;
    content: string;
}

export interface ChatRequestBody {
    messages: Message[];
    newMessage: string;
    chatId: string;
}

export enum StreamMessageType {
  Token = "token",
  Error = "error",
  Connected = "connected",
  Done = "done",
  ToolStart = "tool_start",
  ToolEnd = "tool_end",
}

export interface BaseStreamMessage {
  type: StreamMessageType;
}

export interface TokenMessage extends BaseStreamMessage {
  type: StreamMessageType.Token;
  token: string;
}

export interface ErrorMessage extends BaseStreamMessage {
  type: StreamMessageType.Error;
  error: string;
}

export interface ConnectedMessage extends BaseStreamMessage {
  type: StreamMessageType.Connected;
}

export interface DoneMessage extends BaseStreamMessage {
  type: StreamMessageType.Done;
}

export interface ToolStartMessage extends BaseStreamMessage {
  type: StreamMessageType.ToolStart;
  tool: string;
  input: unknown;
}

export interface ToolEndMessage extends BaseStreamMessage {
  type: StreamMessageType.ToolEnd;
  tool: string;
  output: unknown;
}

declare global {
  interface Window {
    Razorpay: any; // you can use the proper type if you have it
  }
}


export type StreamMessage =
  | TokenMessage
  | ErrorMessage
  | ConnectedMessage
  | DoneMessage
  | ToolStartMessage
  | ToolEndMessage;

export interface CopyDownloadDropdownProps {
  content: string;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}


export interface MessageBubbleProps {
  content: string;
  isUser?: boolean;
}

export interface UserType {
  name: string;
  email: string;
  image: string;
  messageLimit: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatInterfaceProps {
  chatId: string;
  initialMessages: any[];
}

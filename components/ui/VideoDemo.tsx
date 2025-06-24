import { MessageBubble } from "../MessageBubble";

// Demo component showing the video display
export default function VideoDisplayDemo({ sampleContent }: { sampleContent: string }) {


  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">Video Display Component</h1>
      <div className="max-w-4xl mx-auto">
        <MessageBubble content={sampleContent} isUser={false} />
        <MessageBubble content="This looks much better than the terminal output!" isUser={true} />
      </div>
    </div>
  );
}
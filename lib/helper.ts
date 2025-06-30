import { Code, FileText, Table } from "lucide-react";

export const extractYouTubeId = (url: string): string | null => {
  console.log("url", url);
  const regex =
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  console.log("match", match);
  return match ? match[1] : null;
};

export const formatToolOutput = (output: unknown): string => {
  if (typeof output === "string") return output;
  return JSON.stringify(output, null, 2);
};

export const formatYouTubeEmbedOutput = (
  tool: string,
  input: any,
  output: any
) => {
  console.log("input", input);
  let videoUrl = "";

  try {
    let parsed = typeof input === "string" ? JSON.parse(input) : input;
    console.log("parsed", parsed);
    // If it's still wrapped inside an `input` key, unwrap and parse again
    if (parsed?.input && typeof parsed.input === "string") {
      parsed = JSON.parse(parsed.input);
      console.log("parsed again", parsed);
    }

    videoUrl = parsed?.url || "";
    console.log("videoUrl", videoUrl);
  } catch (err) {
    return `<div class="text-red-500">Invalid input format</div>`;
  }

  const videoId = extractYouTubeId(videoUrl);
  console.log("videoId", videoId);
  if (!videoId) return `<div class="text-red-500">Invalid YouTube URL</div>`;

  return `---START---
<div class=" ]">
  <iframe 
    class="w-auto h-auto max-h-[200px] rounded-md shadow-md"
    src="https://www.youtube.com/embed/${videoId}" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen>
  </iframe>
  <div class="mt-4 text-sm text-white whitespace-pre-wrap">${formatToolOutput(
    output
  )}</div>
</div>
---END---`;
};


export const formatMessage = (content: string): string => {
  // First unescape backslashes
  content = content.replace(/\\\\/g, "\\");

  // Then handle newlines
  content = content.replace(/\\n/g, "\n");

  // Remove only the markers but keep the content between them
  content = content.replace(/---START---\n?/g, "").replace(/\n?---END---/g, "");

  // Remove Markdown headings ### ## #
  content = content.replace(/^#{1,6}\s?/gm, "");

  // Remove **bold** or __bold__
  content = content.replace(/\*\*(.*?)\*\*/g, "$1");
  content = content.replace(/__(.*?)__/g, "$1");

  // Trim any extra whitespace that might be left
  return content.trim();
};

export const isSummaryContent = (content: string) => {
  const summaryKeywords = [
    "summary",
    "summarize",
    "key points",
    "main points",
    "overview",
    "recap",
    "highlights",
    "takeaways",
    "conclusion",
    "in summary",
    "to summarize",
    "bullet points",
    "key findings",
    "executive summary",
  ];

  const lowerContent = content.toLowerCase();
  return (
    summaryKeywords.some((keyword) => lowerContent.includes(keyword)) ||
    content.includes("•") ||
    content.includes("- ") ||
    content.includes("1.") ||
    (content.split("\n").length > 3 && content.length > 200)
  );
};

export const formats = [
    { key: "TXT", label: "Plain Text", icon: FileText },
    { key: "JSON", label: "JSON", icon: Code },
    { key: "CSV", label: "CSV", icon: Table },
  ];

// terminal sytle
// export  const formatTerminalOutput = (
//     tool: string,
//     input: unknown,
//     output: unknown
//   ) => {
//     const terminalHtml = `<div class="bg-[#1e1e1e] text-white font-mono p-2 rounded-md my-2 overflow-x-auto whitespace-normal max-w-[600px]">
//       <div class="flex items-center gap-1.5 border-b border-gray-700 pb-1">
//         <span class="text-red-500">●</span>
//         <span class="text-yellow-500">●</span>
//         <span class="text-green-500">●</span>
//         <span class="text-gray-400 ml-1 text-sm">~/${tool}</span>
//       </div>
//       <div class="text-gray-400 mt-1">$ Input</div>
//       <pre class="text-yellow-400 mt-0.5 whitespace-pre-wrap overflow-x-auto">${formatToolOutput(
//         input
//       )}</pre>
//       <div class="text-gray-400 mt-2">$ Output</div>
//       <pre class="text-green-400 mt-0.5 whitespace-pre-wrap overflow-x-auto">${formatToolOutput(
//         output
//       )}</pre>
//     </div>`;

//     return `---START---\n${terminalHtml}\n---END---`;
//   };

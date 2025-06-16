import { NextRequest, NextResponse } from "next/server";
import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  console.log("GET");
  try {
 
    const { url } = await req.json();
    console.log("calling loader with url", url);
    const loader = YoutubeLoader.createFromUrl(url, {
      language: "en",
      addVideoInfo: true,
    });

    console.log("loader", loader);

    const docs = await loader.load();

    console.log("docs", docs);

    return NextResponse.json(docs);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

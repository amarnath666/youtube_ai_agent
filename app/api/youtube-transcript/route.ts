import { NextRequest, NextResponse } from "next/server";
import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";

export const runtime = "edge";

export async function POST(req: NextRequest) {

  try {
 
    const { url } = await req.json();

    const loader = YoutubeLoader.createFromUrl(url, {
      language: "en",
      addVideoInfo: true,
    });



    const docs = await loader.load();



    return NextResponse.json(docs);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

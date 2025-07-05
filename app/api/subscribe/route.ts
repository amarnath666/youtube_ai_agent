
import dbConnect from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Subcription from "@/models/subcription";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";

export async function GET(req: Request) {
    console.log("req came")
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();

        console.log("session", session);

        const subscription = await Subcription.findOne({ userId: session.user.id });

        if (!subscription) {
            return NextResponse.json({ error: "Subscription not found" }, { status: 404 });
        }

        return NextResponse.json({ subscription });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}

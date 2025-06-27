
import dbConnect from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Plan from "@/models/plan";

export async function POST(req: Request) {
    try {
        // const session = await getServerSession(authOptions);

        // if (!session) {
        //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        // }

        await dbConnect();

        const { type, price } = await req.json();

        const plan = await Plan.create({
            type,
            price,
        });

        return NextResponse.json(plan);
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
}

export async function GET (req: Request) {
    try {
        console.log("req reached")
        await dbConnect();
        console.log("db connected")
        const plans = await Plan.find({});
        console.log(plans)
        return NextResponse.json(plans);
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
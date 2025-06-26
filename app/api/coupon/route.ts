import dbConnect from "@/lib/mongoose";
import Coupon from "@/models/coupon";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        await dbConnect();

        const { code, discountPercentage , isActive } = await req.json();

        const coupon = await Coupon.create({
            code,
            discountPercentage,
            isActive
        });

        return NextResponse.json(coupon);
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
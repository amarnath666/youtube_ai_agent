import Razorpay from "razorpay";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import dbConnect from "@/lib/mongoose";
import { authOptions } from "@/lib/auth";
import Order from "@/models/order";

const razorpay = new Razorpay({
  key_id: process.env.RAZARPAY_API!,
  key_secret: process.env.RAZARPAY_SECRET_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { amount, currency, planId } = (await request.json()) as {
      amount: number;
      currency: string;
      planId: string;
    };

    var options = {
      amount: amount,
      currency: currency,
      receipt: Date.now().toString(),
    };

    const order = await razorpay.orders.create(options);

    await dbConnect();

    await Order.create({
      razorpayOrderId: order.id,
      userId: session.user.id,
      planId: planId,
      amount: amount,
      currency: currency,
      status: "created",
     
    });

    console.log(order);
    return NextResponse.json({ orderId: order.id }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

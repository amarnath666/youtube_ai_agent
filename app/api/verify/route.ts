import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import moment from "moment-timezone";
import {
  convertToRupee,
  getPlusOneMonthDate,
  getPlusOneYearDate,
  getTodayDateInIst,
} from "@/lib/moment-helper";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongoose";
import Subcription from "@/models/subcription";
import Plan from "@/models/plan";
import subcription from "@/models/subcription";

const generatedSignature = (
  razorpayOrderId: string,
  razorpayPaymentId: string
) => {
  const keySecret = process.env.RAZARPAY_SECRET_KEY;
  if (!keySecret) {
    throw new Error(
      "Razorpay key secret is not defined in environment variables."
    );
  }
  const sig = crypto
    .createHmac("sha256", keySecret)
    .update(razorpayOrderId + "|" + razorpayPaymentId)
    .digest("hex");
  return sig;
};

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const { orderCreationId, razorpayPaymentId, razorpaySignature, amount } =
      await request.json();

    console.log(orderCreationId, razorpayPaymentId, razorpaySignature, amount);

    const signature = generatedSignature(orderCreationId, razorpayPaymentId);
    if (signature !== razorpaySignature) {
      return NextResponse.json(
        { message: "payment verification failed", isOk: false },
        { status: 400 }
      );
    }

    const convertedAmount = convertToRupee(amount);

    console.log("payment verified successfully");

    await dbConnect();

    const plan = await Plan.findOne({
      price: convertedAmount,
    });

    console.log(plan, "plan");

    if (!plan) {
      return NextResponse.json(
        { message: "plan not found", isOk: false },
        { status: 400 }
      );
    }

    console.log("plan found");

    // check if subcription already exists
    const existingSubcription = await Subcription.findOne({
      userId: session.user.id,
    }).sort({ endDate: -1 });

    if (existingSubcription) {
      // Handle renewal - extend existing subscription
      const currentEndDate = moment.tz(
        existingSubcription.endDate,
        "Asia/Kolkata"
      );
      const today = getTodayDateInIst();

      const baseDate = currentEndDate.isAfter(today) ? currentEndDate : today;

      const newEndDate =
        plan.type === "monthly"
          ? moment(baseDate).add(1, "month").format("YYYY-MM-DD")
          : moment(baseDate).add(1, "year").format("YYYY-MM-DD");

      // Update existing subscription
      await Subcription.findByIdAndUpdate(existingSubcription._id, {
        endDate: newEndDate,
        $push: {
          renewals: {
            renewalDate: getTodayDateInIst(),
            pricePaid: plan.price,
            previousEndDate: existingSubcription.endDate,
            newEndDate: newEndDate,
            paymentId: razorpayPaymentId,
          },
        },
      });
    } else {
      // create new subcription
      const subcription = new Subcription({
        userId: session.user.id,
        planId: plan._id,
        pricePaid: plan.price,
        startDate: getTodayDateInIst(),
        paymentId: razorpayPaymentId,
        endDate:
          plan.type === "monthly"
            ? getPlusOneMonthDate()
            : getPlusOneYearDate(),
      });

      await subcription.save();
    }
    return NextResponse.json(
      { message: "payment verified successfully", isOk: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { message: "Verification failed", isOk: false },
      { status: 500 }
    );
  }
}

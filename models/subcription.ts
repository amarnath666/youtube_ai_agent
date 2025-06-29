import mongoose from "mongoose";

const RenewalSchema = new mongoose.Schema(
  {
    renewalDate: {
      type: String,
      required: true,
    },
    pricePaid: {
      type: Number,
      required: true,
    },
    previousEndDate: {
      type: String,
      required: true,
    },
    newEndDate: {
      type: String,
      required: true,
    },
    paymentId: {
      type: String,
      required: true,
    },
  },
  { _id: true, timestamps: true }
);

const SubcriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: "User",
      required: true,
    },
    planId: {
      type: String,
      ref: "Plan",
      required: true,
    },
    pricePaid: {
      type: Number,
      required: true,
    },
    couponId: {
      type: String,
      ref: "Coupon",
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "expired", "cancelled"],
      default: "active",
    },
    paymentId: {
      type: String,
      required: true,
    },
    renewals: [RenewalSchema], // Track all renewals
  },
  { timestamps: true }
);

export default mongoose.models.Subcription ||
  mongoose.model("Subcription", SubcriptionSchema);

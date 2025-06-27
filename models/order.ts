import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  razorpayOrderId: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  planId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plan',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: 'INR',
  },
  status: {
    type: String,
    enum: ['created', 'paid', 'failed'],
    default: 'created',
  },
  razorpayPaymentId: String, // optional, filled after payment
  razorpaySignature: String, // optional, filled after payment
  paidAt: Date, // filled after successful payment
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);

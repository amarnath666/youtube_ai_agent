import mongoose from "mongoose";

const PlanSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["monthly", "yearly"], required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Plan || mongoose.model("Plan", PlanSchema);

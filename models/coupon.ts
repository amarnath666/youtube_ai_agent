import mongoose from 'mongoose'

const CouponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  discountPercentage: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
},{timestamps: true})

export default mongoose.models.Coupon || mongoose.model('Coupon', CouponSchema)
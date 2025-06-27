import mongoose from 'mongoose'

const SubcriptionSchema = new mongoose.Schema({
  userId: {
    type: String,
    ref: 'User',
    required: true,
  },
  planId: {
    type: String,
    ref: 'Plan',
    required: true,
  },
  pricePaid: {
    type: Number,
    required: true,
  },
  couponId: {
    type: String,
    ref: 'Coupon',
  },
  startDate: {
    type: String, 
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
}, {timestamps: true})

export default mongoose.models.Subcription || mongoose.model('Subcription', SubcriptionSchema)
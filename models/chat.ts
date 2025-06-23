import mongoose from 'mongoose'

const ChatSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {timestamps: true})

ChatSchema.index({ userId: 1, createdAt: -1 })

export default mongoose.models.Chat || mongoose.model('Chat', ChatSchema)
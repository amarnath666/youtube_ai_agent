import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema({
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'assistant'],
    required: true,
  },
},{timestamps: true})

MessageSchema.index({ chatId: 1, createdAt: 1 })

export default mongoose.models.Message || mongoose.model('Message', MessageSchema)
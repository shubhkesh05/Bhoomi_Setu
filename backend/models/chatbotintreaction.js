import mongoose from 'mongoose';

const chatbotInteractionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    platform: {
        type: String,
        enum: ['whatsapp', 'in-app'],
        default: 'in-app'
    },
    message: String,
    intent: String,
    response: String
}, { timestamps: true });

export default mongoose.model('ChatbotInteraction', chatbotInteractionSchema);

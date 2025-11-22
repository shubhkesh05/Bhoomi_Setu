import ChatbotInteraction from '../models/ChatbotInteraction.js';

export const logChatbotInteraction = async (req, res) => {
    try {
        const chat = await ChatbotInteraction.create(req.body);
        res.status(201).json(chat);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getAllInteractions = async (req, res) => {
    try {
        const chats = await ChatbotInteraction.find().populate('user');
        res.json(chats);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

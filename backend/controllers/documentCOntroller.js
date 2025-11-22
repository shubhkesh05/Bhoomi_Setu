import Document from '../models/Document.js';

export const uploadDocument = async (req, res) => {
    try {
        const document = await Document.create(req.body);
        res.status(201).json(document);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getAllDocuments = async (req, res) => {
    try {
        const documents = await Document.find().populate('uploadedBy');
        res.json(documents);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

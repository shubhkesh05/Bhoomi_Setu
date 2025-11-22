import LandRecord from '../models/LandRecord.js';

export const createLandRecord = async (req, res) => {
    try {
        const land = await LandRecord.create(req.body);
        res.status(201).json(land);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getAllLandRecords = async (req, res) => {
    try {
        const lands = await LandRecord.find().populate('owner').populate('documents');
        res.json(lands);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

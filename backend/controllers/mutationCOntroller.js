import MutationRequest from '../models/MutationRequest.js';

export const createMutation = async (req, res) => {
    try {
        const mutation = await MutationRequest.create(req.body);
        res.status(201).json(mutation);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getAllMutations = async (req, res) => {
    try {
        const mutations = await MutationRequest.find()
            .populate('applicant')
            .populate('landRecord')
            .populate('supportingDocuments')
            .populate('assignedTo');
        res.json(mutations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//this is the final one
import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fileName: String,
    fileUrl: String,
    fileType: String,
    fileSize: Number,
    fileHash: String,   // Optional for file integrity
    docType: {
        type: String,
        enum: ['identity', 'ownership_proof', 'legal_notice', 'mutation_form', 'map'],
        required: true
    },
    ocrExtract: String,
    isVerified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export default mongoose.model('Document', documentSchema);

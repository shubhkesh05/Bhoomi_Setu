import mongoose from 'mongoose';  

const userSchema = new mongoose.Schema({
  aadhaarNumber: { type: String, required: true, unique: true, match: /^\d{12}$/ },
  name: { type: String, required: true, trim: true },
  phoneNumber: { type: String, required: true, match: /^\d{10}$/ },
  role: { type: String, enum: ['citizen', 'panchayat_officer', 'legal_advisor', 'admin'], default: 'citizen' },
  languagePreference: { type: String, default: 'en' },
  isVerified: { type: Boolean, default: false }
},{ timestamps: true }); 
export const User = mongoose.model('User', userSchema);


const documentSchema = new mongoose.Schema({ 
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fileName: String,
  fileUrl: String,
  docType: { type: String, enum: ['identity', 'ownership_proof', 'legal_notice', 'mutation_form', 'map'], required: true },
  ocrExtract: String,
  isVerified: { type: Boolean, default: false }
}, { timestamps: true });
export const Document = mongoose.model('Document', documentSchema);


const landRecordSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  surveyNumber: { type: String, required: true, index: true },
  village: String,
  district: String,
  state: String,
  areaInAcres: Number,
  landType: { type: String, enum: ['agricultural', 'residential', 'commercial', 'industrial'], required: true },
  geoCoordinates: { lat: Number, lng: Number },
  documents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }],
  isDisputed: { type: Boolean, default: false },
  lastMutationDate: Date
}, { timestamps: true });
export const LandRecord = mongoose.model('LandRecord', landRecordSchema);



const mutationRequestSchema = new mongoose.Schema({
  applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  landRecord: { type: mongoose.Schema.Types.ObjectId, ref: 'LandRecord', required: true },
  requestType: { type: String, enum: ['ownership_transfer', 'division', 'inheritance', 'correction'], required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  supportingDocuments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }],
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  remarks: String,
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  history: [{ status: String, date: Date, updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, comment: String }]
}, { timestamps: true });
export const MutationRequest = mongoose.model('MutationRequest', mutationRequestSchema);



const ActivityLogSchema = new mongoose.Schema({
  actionBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  actionType: { type: String, enum: ['create', 'update', 'delete', 'approve', 'reject'], required: true },
  entityType: { type: String, enum: ['User', 'LandRecord', 'MutationRequest', 'Document'], required: true },
  entityId: { type: mongoose.Schema.Types.ObjectId, required: true },
  description: String
}, { timestamps: true });
export const ActivityLog = mongoose.model('ActivityLog', ActivityLogSchema);

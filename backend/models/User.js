import mongoose from 'mongoose';
// this is the final
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  aadhaarNumber: {
    type: String,
    unique: true,
     sparse: true, // ✅ allows multiple null values
    match: /^\d{12}$/
  },
  

  name: String,
  phoneNumber: String,
  role: {
    type: String,
    enum: ['citizen', 'panchayat_officer', 'legal_advisor', 'admin' ,'tehsildar' ],
    default: 'citizen'
  },
  languagePreference: {
    type: String,
    default: 'en'
  },
  isVerified: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

// ✅ Export as default for ES Module compatibility
export default User;

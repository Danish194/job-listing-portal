import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true }, // Firebase UID
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['applicant', 'employer'], required: true },
  name: { type: String, required: true },
  appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
  postedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;

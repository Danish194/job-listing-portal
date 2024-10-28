import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true }, // Reference to the job
  applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the applicant
  resume: { type: String, required: true }, // Path or URL to the resume
  coverLetter: { type: String },
  dateApplied: { type: Date, default: Date.now },
}, { timestamps: true });

const Application = mongoose.model('Application', applicationSchema);
export default Application;

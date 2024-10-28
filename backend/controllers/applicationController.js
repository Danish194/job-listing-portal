
import Application from '../models/Application.js';
import Job from '../models/Job.js';
import User from '../models/User.js';

// Apply for a job
export const applyForJob = async (req, res) => {
  const { jobId, resume, coverLetter } = req.body;
  const applicantId = req.userId; // Use req.userId from middleware

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const applicant = await User.findById(applicantId);
    if (!applicant) {
      return res.status(404).json({ message: 'Applicant not found' });
    }

    const application = new Application({
      job: job._id,
      applicant: applicant._id,
      resume,
      coverLetter,
    });

    await application.save();
    job.applicants.push(applicant._id);
    applicant.appliedJobs.push(job._id);

    await job.save();
    await applicant.save();

    res.status(201).json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

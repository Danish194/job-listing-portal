
import Job from '../models/Job.js';
import User from '../models/User.js';

// Post a new job
export const createJob = async (req, res) => {
  const { title, description } = req.body;
  const employerId = req.userId; // Use req.userId from middleware

  try {
    const employer = await User.findById(employerId);
    if (!employer) {
      return res.status(404).json({ message: 'Employer not found' });
    }

    const job = new Job({ title, description, employer: employerId });
    await job.save();

    employer.postedJobs.push(job._id);
    await employer.save();

    res.status(201).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all jobs
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('employer', 'name'); // You can specify fields to return
    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

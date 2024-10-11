import Job from "../models/Job.js";

export const createJob = async (req, res) => {
  const { title, description, company, location, experience, salary, type } = req.body;

  try {
    const newJob = new Job({
      title,
      description,
      company,
      location,
      experience,
      salary,
      type,
      postedBy: req.user._id, // Employer posting the job
    });

    await newJob.save();
    res.status(201).json({ success: true, job: newJob });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

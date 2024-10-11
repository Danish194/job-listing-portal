import Application from '../models/Application.js'

export const applyForJob = async (req, res) => {
  const { jobId, resume, coverLetter } = req.body;

  try {
    const newApplication = new Application({
      job: jobId,
      applicant: req.user._id, // Job seeker applying
      resume,
      coverLetter,
    });

    await newApplication.save();
    res.status(201).json({ success: true, application: newApplication });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


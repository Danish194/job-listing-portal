export const getJobsForEmployer = async () => {
  // Mock API call to fetch jobs posted by the employer
  return [
    { id: 1, title: "Software Engineer", description: "Develop cool features.", company: "Tech Corp" },
    { id: 2, title: "Product Manager", description: "Manage product lifecycle.", company: "Innovate Inc" }
  ];
};

export const getJobsForSeeker = async () => {
  // Mock API call to fetch available jobs for job seekers
  return [
    { id: 1, title: "Software Engineer", description: "Develop cool features.", company: "Tech Corp" },
    { id: 3, title: "UI Designer", description: "Design beautiful interfaces.", company: "Creative Studio" }
  ];
};

export const postNewJob = async (job) => {
  // Mock API call to post a new job
  return { ...job, id: Date.now() }; // Return the job with a unique ID
};

export const applyForJob = async (jobId) => {
  // Mock API call to apply for a job
  return true; // Return success status
};

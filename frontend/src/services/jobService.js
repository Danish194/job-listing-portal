import axios from "axios";

export const postJob = async (jobData) => {
  return await axios.post("/api/jobs/post", jobData);
};

export const applyForJob = async (applicationData) => {
  return await axios.post("/api/applications/apply", applicationData);
};

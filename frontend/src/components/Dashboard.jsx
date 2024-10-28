import { useState, useEffect } from "react";
import { getJobsForEmployer, getJobsForSeeker, postNewJob, applyForJob } from "../services/jobService"; // Mock services for job actions

const Dashboard = ({ userType }) => {
  const [jobs, setJobs] = useState([]); // Holds job data
  const [newJob, setNewJob] = useState({ title: "", description: "", company: "" }); // Holds new job input fields
  const [appliedJobs, setAppliedJobs] = useState([]); // Tracks applied jobs for job seekers

  useEffect(() => {
    // Fetch jobs based on user type (employer or job seeker)
    if (userType === "employer") {
      fetchEmployerJobs();
    } else {
      fetchAvailableJobs();
    }
  }, [userType]);

  // Fetch jobs posted by the employer
  const fetchEmployerJobs = async () => {
    const employerJobs = await getJobsForEmployer();
    setJobs(employerJobs);
  };

  // Fetch available jobs for job seekers
  const fetchAvailableJobs = async () => {
    const availableJobs = await getJobsForSeeker();
    setJobs(availableJobs);
  };

  // Handle form input changes for job posting
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob({ ...newJob, [name]: value });
  };

  // Submit new job post
  const handleJobSubmit = async (e) => {
    e.preventDefault();
    const postedJob = await postNewJob(newJob);
    setJobs([...jobs, postedJob]);
    setNewJob({ title: "", description: "", company: "" }); // Clear form after submitting
  };

  // Job seeker applies for a job
  const handleApply = async (jobId) => {
    const result = await applyForJob(jobId);
    if (result) {
      setAppliedJobs([...appliedJobs, jobId]); // Track applied jobs
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">
        {userType === "employer" ? "Employer Dashboard" : "Job Seeker Dashboard"}
      </h2>

      {/* Employer Dashboard Functionality */}
      {userType === "employer" ? (
        <>
          <section className="mt-4">
            <h3 className="font-semibold text-lg">Post a New Job</h3>
            <form onSubmit={handleJobSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                value={newJob.title}
                onChange={handleInputChange}
                placeholder="Job Title"
                className="block w-full p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="text"
                name="company"
                value={newJob.company}
                onChange={handleInputChange}
                placeholder="Company Name"
                className="block w-full p-2 border border-gray-300 rounded"
                required
              />
              <textarea
                name="description"
                value={newJob.description}
                onChange={handleInputChange}
                placeholder="Job Description"
                className="block w-full p-2 border border-gray-300 rounded"
                required
              ></textarea>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Post Job
              </button>
            </form>
          </section>

          <section className="mt-8">
            <h3 className="font-semibold text-lg">Your Posted Jobs</h3>
            <ul className="mt-4">
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <li key={job.id} className="border-b py-2">
                    <h4 className="text-lg font-semibold">{job.title}</h4>
                    <p>{job.description}</p>
                    <p className="italic">{job.company}</p>
                  </li>
                ))
              ) : (
                <p>No jobs posted yet.</p>
              )}
            </ul>
          </section>
        </>
      ) : (
        // Job Seeker Dashboard Functionality
        <>
          <section className="mt-4">
            <h3 className="font-semibold text-lg">Available Jobs</h3>
            <ul className="mt-4">
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <li key={job.id} className="border-b py-2">
                    <h4 className="text-lg font-semibold">{job.title}</h4>
                    <p>{job.description}</p>
                    <p className="italic">{job.company}</p>
                    <button
                      onClick={() => handleApply(job.id)}
                      className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
                      disabled={appliedJobs.includes(job.id)} // Disable if already applied
                    >
                      {appliedJobs.includes(job.id)
                        ? "Applied"
                        : "Apply for this Job"}
                    </button>
                  </li>
                ))
              ) : (
                <p>No available jobs at the moment.</p>
              )}
            </ul>
          </section>
        </>
      )}
    </div>
  );
};

export default Dashboard;

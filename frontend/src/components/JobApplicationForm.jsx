import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const JobApplicationForm = () => {
    const { jobId } = useParams(); // Extract jobId from URL parameters
    const [resume, setResume] = useState('');
    const [coverLetter, setCoverLetter] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Get the token from local storage (or wherever you store it)
        const token = localStorage.getItem('token');

        // Set up headers for the request
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`  // Include the token in the Authorization header
            }
        };

        try {
            // Send POST request to the backend with headers
            const response = await axios.post('http://localhost:5000/api/applications/apply', { jobId, resume, coverLetter }, config);
            toast.success('Application submitted successfully'); // Show success message
            setResume(''); // Clear form fields
            setCoverLetter('');
        } catch (error) {
            toast.error('Error submitting the application: ' + error.response.data.message || error.message); // Show error message
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">Apply for Job {jobId}</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">
                            Upload Resume
                        </label>
                        <input
                            type="file"
                            id="resume"
                            onChange={(e) => setResume(e.target.files[0])} // Capture the file directly
                            required
                            className="w-full border border-gray-300 p-2 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">
                            Cover Letter (Optional)
                        </label>
                        <textarea
                            id="coverLetter"
                            value={coverLetter}
                            onChange={(e) => setCoverLetter(e.target.value)}
                            placeholder="Write your cover letter here..."
                            className="w-full h-32 border border-gray-300 p-2 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-300"
                        >
                            Submit Application
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JobApplicationForm;

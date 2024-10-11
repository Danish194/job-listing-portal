import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const JobApplicationForm = ({ jobId }) => {
    const [resume, setResume] = useState('');
    const [coverLetter, setCoverLetter] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/applications/apply', { jobId, resume, coverLetter });
            toast.success('Application submitted successfully');
            setResume('');
            setCoverLetter('');
        } catch (error) {
            toast.error('Error submitting the application');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto bg-white p-8 rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Apply for Job</h2>
            <input type="text" value={resume} onChange={(e) => setResume(e.target.value)} placeholder="Resume Link" required />
            <textarea value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} placeholder="Cover Letter"></textarea>
            <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Submit Application</button>
        </form>
    );
};

export default JobApplicationForm;

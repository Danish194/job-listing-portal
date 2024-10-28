import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const JobPostForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        company: '',
        location: '',
        experience: 0,
        salary: 0,
        type: 'Full-time',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/jobs/post', formData); // Post job to backend
            toast.success('Job posted successfully');
            setFormData({
                title: '',
                description: '',
                company: '',
                location: '',
                experience: 0,
                salary: 0,
                type: 'Full-time',
            });
        } catch (error) {
            toast.error('Error posting the job');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto bg-white p-8 rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Post a Job</h2>
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Job Title" required />
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Job Description" required></textarea>
            <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Company Name" required />
            <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
            <input type="number" name="experience" value={formData.experience} onChange={handleChange} placeholder="Experience Required" required />
            <input type="number" name="salary" value={formData.salary} onChange={handleChange} placeholder="Salary" required />
            <select name="type" value={formData.type} onChange={handleChange} required>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
            </select>
            <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Post Job</button>
        </form>
    );
};

export default JobPostForm;

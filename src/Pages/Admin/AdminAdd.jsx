import React, { useState } from 'react';
import { addJob } from '../../services/axios';

export default function AdminAdd() {
    const [success, setSuccess] = useState("");
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        title: "",
        company: "",
        location: "",
        contract: "",
        domain: "",
        skills: "",
        description: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.title) newErrors.title = "Title is required";
        if (!formData.company) newErrors.company = "Company is required";
        if (!formData.location) newErrors.location = "Location is required";
        if (!formData.contract) newErrors.contract = "Contract is required";
        if (!formData.domain) newErrors.domain = "Domain is required";
        if (!formData.skills) newErrors.skills = "Skills are required";
        if (!formData.description) newErrors.description = "Description is required";
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setSuccess("");
            return;
        }

        try {
            const formattedData = {
                ...formData,
                skills: formData.skills.split(",").map(s => s.trim()).filter(Boolean),
            };

            await addJob(formattedData);

            setErrors({});
            setSuccess("Job added successfully!");

            setFormData({
                title: "",
                company: "",
                location: "",
                contract: "",
                domain: "",
                skills: "",
                description: "",
            });

            setTimeout(() => setSuccess(""), 2000);
        } catch (err) {
            console.error("Error while adding job", err);
        }
    };

    return (
        <div className="min-h-screen  flex items-start justify-center p-4 pt-12">
            <div className="w-full max-w-2xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-light text-gray-900 mb-2">Post a new job</h1>
                    <p className="text-gray-500">Fill in the details below to create a new job listing</p>
                </div>

                {/* Main form card */}
                <div className="bg-white border border-gray-200 rounded-lg">
                    <div className="border-b border-gray-200 px-6 py-4">
                        <h2 className="text-lg font-medium text-gray-900">Job information</h2>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {success && (
                            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm">
                                <span className="font-medium">Success!</span> {success}
                            </div>
                        )}

                        {/* Two columns layout for first row */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Job title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    placeholder="e.g. Senior Frontend Developer"
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                />
                                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Company <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="company"
                                    value={formData.company}
                                    placeholder="e.g. Google"
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                />
                                {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
                            </div>
                        </div>

                        {/* Location and Contract */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Location <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    placeholder="e.g. Paris, France"
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                />
                                {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Contract type <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="contract"
                                    value={formData.contract}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
                                >
                                    <option value="">Select contract type</option>
                                    <option value="CDI">CDI - Permanent</option>
                                    <option value="CDD">CDD - Fixed term</option>
                                    <option value="Stage">Internship</option>
                                    <option value="Alternance">Apprenticeship</option>
                                </select>
                                {errors.contract && <p className="text-red-500 text-xs mt-1">{errors.contract}</p>}
                            </div>
                        </div>

                        {/* Domain */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Domain <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="domain"
                                value={formData.domain}
                                placeholder="e.g. Information Technology, Marketing, Sales..."
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            />
                            {errors.domain && <p className="text-red-500 text-xs mt-1">{errors.domain}</p>}
                        </div>

                        {/* Skills */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Required skills <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="skills"
                                value={formData.skills}
                                placeholder="e.g. React, Node.js, TypeScript, Python"
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            />
                            {errors.skills && <p className="text-red-500 text-xs mt-1">{errors.skills}</p>}
                            <p className="text-xs text-gray-500 mt-1">Separate skills with commas</p>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Job description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                placeholder="Describe the role, responsibilities, requirements, benefits..."
                                rows="5"
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                            />
                            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                        </div>

                        {/* Form actions */}
                        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={() => setFormData({
                                    title: "",
                                    company: "",
                                    location: "",
                                    contract: "",
                                    domain: "",
                                    skills: "",
                                    description: "",
                                })}
                                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                            >
                                Publish job
                            </button>
                        </div>
                    </form>
                </div>

                {/* Helper text */}
                <p className="text-xs text-gray-400 mt-4 text-center">
                    Fields marked with <span className="text-red-500">*</span> are required
                </p>
            </div>
        </div>
    );
}
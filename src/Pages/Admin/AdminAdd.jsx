import React from 'react'
import { useState } from 'react'
import { addJob } from '../../services/axios';



export default function AdminAdd() {
    const [success, setSuccess] = useState("");
    const [errors, setErrors] = useState("");
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
    }
    ///message error 
    const validate = () => {
        const newErrors = {};
        if (!formData.title) newErrors.title = " Title is required";
        if (!formData.company) newErrors.company = "Company is required";
        if (!formData.location) newErrors.location = "Loction is required";
        if (!formData.contract) newErrors.contract = "Contract is required";
        if (!formData.domain) newErrors.domain = "domain is required";
        if (!formData.skills) newErrors.skills = "Skills are required";
        if (!formData.description) newErrors.description = "Description is required";
        return newErrors
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setSuccess(""); // clear success
            return;
        }



        //Sending form to Mock Api and clear inputs
        try {
            const formattedData = {
                ...formData,
                skills: formData.skills.split(",").map(s => s.trim())
            };

            await addJob(formattedData);

            setErrors({}); // clear all errors

            setTimeout(() => {
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
            }, 2000);
        } catch (err) {
            console.errors("Error while adding job", err)
        }

    };






    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-xl rounded-xl shadow-lg p-6">
                <h1 className="text-2xl font-bold mb-6 text-center">
                    Admin – Add Job
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/*Seccess messages at top */}
                    {success && (
                        <div className="bg-green-100 text-green-800 p-3 rounded mb-4">
                            {success}
                        </div>
                    )}
                    {/* Title */}
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        placeholder="Title"
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}

                    {/* Company */}
                    <input
                        type="text"
                        name="company"
                        value={formData.company}
                        placeholder="Company"
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg"
                    />
                    {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}

                    {/* Location */}
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        placeholder="Location"
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg"
                    />
                    {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}


                    {/*contract*/}
                    <select
                        name="contract"
                        value={formData.contract}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg"
                    >
                        <option value="">Type de contrat</option>
                        <option value="CDI">CDI</option>
                        <option value="CDD">CDD</option>
                        <option value="Stage">Stage</option>
                        <option value="Alternance">Alternance</option>
                    </select>
                    {errors.contract && <p className="text-red-500 text-sm mt-1">{errors.contract}</p>}

                    {/*Domain*/}
                    <input
                        type="text"
                        name="domain"
                        value={formData.domain}
                        placeholder="Domain"
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg"
                    />
                    {errors.domain && <p className="text-red-500 text-sm mt-1">{errors.domain}</p>}


                    {/*Skills*/}
                    <input
                        type='text'
                        name="skills"
                        value={formData.skills}
                        placeholder="Skills"
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg"
                    />
                    {errors.skills && <p className="text-red-500 text-sm mt-1">{errors.skills}</p>}

                    {/*Description*/}
                    <textarea
                        name="description"
                        value={formData.description}
                        placeholder="Description du poste"
                        rows="4"
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg resize-none"
                    />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Ajouter l’offre
                    </button>
                </form>
            </div>
        </div>

    )
}

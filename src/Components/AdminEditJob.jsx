import { useState, useEffect } from "react";
import { updateJob } from "../services/axios";

export default function AdminEditJob({ job, isOpen, onClose, onUpdated }) {
  const empty = { title: '', company: '', location: '', skills: '', description: '' };
  const [formData, setFormData] = useState(empty);

  useEffect(() => {
    if (!job) {
      setFormData(empty);
      return;
    }

    setFormData({
      ...job,
      skills: Array.isArray(job.skills) ? job.skills.join(', ') : job.skills ?? '',
    });
  }, [job]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateJob(job.id, formData);
    onUpdated();
    onClose();
  };

  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Edit Job</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Title"
          />

          <input
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Company"
          />

          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Location"
          />

          <input
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Skills"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full p-2 border rounded"
            placeholder="Description"
          />

          <div className="flex gap-2">
            <button className="flex-1 bg-blue-600 text-white py-2 rounded">
              Update Job
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

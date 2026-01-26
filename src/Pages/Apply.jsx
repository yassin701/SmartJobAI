import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { sendApplication, resetApplyState } from "../Redux/applySlice";
import { uploadCV } from "../services/UploadCV";

export default function ApplyForm() {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.apply);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    domain: "",
    skills: "",
    motivation: "",
    cv: null,
  });

  const [errors, setErrors] = useState({});

  const DOMAINS = [
    "Front-End Development",
    "Back-End Development",
    "Full Stack Development",
    "AI / Data Science",
    "UI / UX Design",
    "Mobile Development",
  ];

  // Input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.domain) newErrors.domain = "Domain is required";
    if (!formData.skills.trim()) newErrors.skills = "Skills are required";
    if (!formData.motivation.trim()) newErrors.motivation = "Motivation letter is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    let cvUrl = null; 
   if(formData.cv){
     cvUrl = await uploadCV(formData.cv); // upload first
   }
   

    dispatch(
      sendApplication({...formData,
        cv: cvUrl, //send url

      })
    );
  };

  // Reset form after success
  useEffect(() => {
    if (success) {
      setFormData({
        name: "",
        email: "",
        domain: "",
        skills: "",
        motivation: "",
        cv: null,
      });
      const timer = setTimeout(() => dispatch(resetApplyState()), 3000);
      return () => clearTimeout(timer);
    }
  }, [success, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Apply Form</h2>

        {/* Success & Error */}
        {success && <div className="mb-4 p-3 text-green-700 bg-green-100 border border-green-300 rounded-lg text-sm font-medium">Application sent successfully!</div>}
        {error && <div className="mb-4 p-3 text-red-700 bg-red-100 border border-red-300 rounded-lg text-sm font-medium">{error}</div>}

        {/* Name */}
        <div className="mb-4">
          <input type="text" name="name" 
          value={formData.name}
           placeholder="Full Name"
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${errors.name ? "border-red-500" : "border-gray-300"}`} />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div className="mb-4">
          <input type="email"
           name="email" 
           value={formData.email}
            placeholder="Email"
             onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${errors.email ? "border-red-500" : "border-gray-300"}`} />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Domain */}
        <div className="mb-4">
          <select name="domain" 
          value={formData.domain} 
          onChange={handleChange} 
          className="w-full mb-3 px-3 py-2 border rounded-lg">
            <option value="">Select your domain</option>
            {DOMAINS.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          {errors.domain && <p className="text-red-500 text-sm mt-1">{errors.domain}</p>}
        </div>

        {/* Skills */}
        <div className="mb-4">
          <input type="text" 
          name="skills"
          value={formData.skills} 
          placeholder="Skills (React, JS...)"
           onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${errors.skills ? "border-red-500" : "border-gray-300"}`} />
          {errors.skills && <p className="text-red-500 text-sm mt-1">{errors.skills}</p>}
        </div>

        {/* Motivation */}
        <div className="mb-4">
          <textarea name="motivation" 
          rows="4"
           placeholder="Motivation letter"
           value={formData.motivation} 
           onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${errors.motivation ? "border-red-500" : "border-gray-300"}`} />
          {errors.motivation && <p className="text-red-500 text-sm mt-1">{errors.motivation}</p>}
        </div>

        {/* Generate AI */}
        <div className="flex justify-end mb-4">
          <button type="button" 
          className="px-4 py-2 text-sm font-medium rounded-lg text-white bg-indigo-600
           hover:bg-indigo-700 transition">Generate with AI</button>
        </div>

        {/* CV */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">CV (PDF, DOC, DOCX)</label>
          <div className="flex items-center gap-2">
            <label htmlFor="cv" className="flex-1 cursor-pointer px-3 py-2 border rounded-lg bg-white text-gray-700 text-sm
             border-gray-300 hover:border-gray-400">
              {formData.cv ? formData.cv.name : "Choose your CV"}
            </label>

            <button type="button" onClick={() => setFormData(prev => ({ ...prev, cv: null }))}
             className="text-xs text-red-500 hover:underline" disabled={!formData.cv}>
              <FaTrash className="text-xl cursor-pointer" />
            </button>
          </div>
          <input type="file" id="cv" name="cv" accept=".pdf,.doc,.docx" onChange={handleChange} className="hidden" />
        </div>

        {/* Submit */}
        <button type="submit" disabled={loading}
          className={`w-full py-2 rounded-lg font-semibold transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"}`}>
          {loading ? "Sending..." : "Apply Now"}
        </button>
      </form>
    </div>
  );
}

import { useState, useEffect } from "react";
import { FaTrash, FaPaperclip, FaUser, FaEnvelope, FaCode, FaFileAlt } from "react-icons/fa";
import { MdWork, MdMessage } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { sendApplication, resetApplyState } from "../Redux/applySlice";
import { uploadCV } from "../services/UploadCV";
import GenerateMotivationButton from "../Components/GenerateMotivationButton";
import { useParams } from "react-router-dom";
import Tips from "../Components/Tips";
import { sendToN8n } from "../services/SendToN8n";

export default function ApplyForm({ job }) {
  const { id } = useParams();
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
  const [cvName, setCvName] = useState("");

  const DOMAINS = [
    "Front-End Development",
    "Back-End Development",
    "Full Stack Development",
    "AI / Data Science",
    "UI / UX Design",
    "Mobile Development",
  ];

  // Auto-fill job info if available
  useEffect(() => {
    if (job) {
      setFormData((prev) => ({ ...prev }));
    }
  }, [job]);

  // Input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "cv" && files && files[0]) {
      setFormData((prev) => ({ ...prev, cv: files[0] }));
      setCvName(files[0].name);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.domain) newErrors.domain = "Domain is required";
    if (!formData.skills.trim()) newErrors.skills = "Skills are required";
    if (!formData.motivation.trim()) newErrors.motivation = "Motivation letter is required";
    if (!formData.cv) newErrors.cv = "CV is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    let cvUrl = null;

    try {
      if (formData.cv) {
        cvUrl = await uploadCV(formData.cv);
      }

      const payload = {
        ...formData,
        cv: cvUrl,
      };

      // Redux / mock API
      dispatch(sendApplication(payload));

      // n8n (Excel + Email)
      sendToN8n(payload);

    } catch (error) {
      console.error("Application failed:", error);
    }
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

      setCvName("");

      const timer = setTimeout(() => {
        dispatch(resetApplyState());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [success, dispatch]);

return (
  <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 py-12 px-4">
    <div className="max-w-4xl mx-auto">
      {/* Job Info Header */}
      {job && (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">{job.title}</h1>
              <div className="flex items-center gap-4 text-gray-600">
                <span className="flex items-center gap-1">
                  <MdWork className="text-blue-500" />
                  {job.company}
                </span>
                <span>•</span>
                <span>{job.location}</span>
                <span>•</span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                  {job.contract}
                </span>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="text-sm text-gray-500">Job ID: {id}</div>
            </div>
          </div>
        </div>
      )}

      {/* Application Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-linear-to-r from-blue-600 to-blue-700 p-6 text-white">
              <h2 className="text-2xl font-bold">Application Form</h2>
              <p className="text-blue-100 mt-1">Complete the form below to apply for this position</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              {/* Success & Error Messages */}
              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold text-lg">✓</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-green-800">Application Submitted!</h3>
                      <p className="text-green-600 text-sm">We've received your application. We'll contact you soon.</p>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold text-lg">!</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-red-800">Submission Failed</h3>
                      <p className="text-red-600 text-sm">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-gray-700 font-medium">
                    <FaUser className="text-blue-500" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    placeholder="John Doe"
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors.name ? "border-red-500" : "border-gray-300"
                      }`}
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-gray-700 font-medium">
                    <FaEnvelope className="text-blue-500" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="john@example.com"
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                {/* Domain */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-gray-700 font-medium">
                    <MdWork className="text-blue-500" />
                    Professional Domain *
                  </label>
                  <select
                    name="domain"
                    value={formData.domain}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors.domain ? "border-red-500" : "border-gray-300"
                      }`}
                  >
                    <option value="">Select your domain</option>
                    {DOMAINS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  {errors.domain && <p className="text-red-500 text-sm">{errors.domain}</p>}
                </div>

                {/* Skills */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-gray-700 font-medium">
                    <FaCode className="text-blue-500" />
                    Skills & Technologies *
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    placeholder="React, JavaScript, Node.js, Python..."
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors.skills ? "border-red-500" : "border-gray-300"
                      }`}
                  />
                  {errors.skills && <p className="text-red-500 text-sm">{errors.skills}</p>}
                </div>
              </div>

              {/* Motivation */}
              <div className="mt-6 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-gray-700 font-medium">
                    <MdMessage className="text-blue-500" />
                    Motivation Letter *
                  </label>
                  <GenerateMotivationButton
                    formData={formData}
                    setFormData={setFormData}
                    jobTitle={job?.title}
                    jobCompany={job?.company}
                  />
                </div>
                <textarea
                  name="motivation"
                  rows="5"
                  placeholder="Explain why you're interested in this position and why you'd be a great fit..."
                  value={formData.motivation}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors.motivation ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {errors.motivation && <p className="text-red-500 text-sm">{errors.motivation}</p>}
              </div>

              {/* CV Upload */}
              <div className="mt-6 space-y-2">
                <label className="flex items-center gap-2 text-gray-700 font-medium">
                  <FaPaperclip className="text-blue-500" />
                  Upload CV *
                </label>
                <div className={`border-2 border-dashed rounded-xl p-6 transition-all ${errors.cv ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                  }`}>
                  <div className="text-center">
                    <FaFileAlt className="text-4xl text-gray-400 mx-auto mb-3" />
                    <input
                      type="file"
                      id="cv"
                      name="cv"
                      accept=".pdf,.doc,.docx"
                      onChange={handleChange}
                      className="hidden"
                    />
                    <label htmlFor="cv" className="cursor-pointer">
                      <p className="text-gray-600 mb-2">
                        {cvName ? `Selected: ${cvName}` : "Click to upload your CV"}
                      </p>
                      <p className="text-sm text-gray-500 mb-3">Supported formats: PDF, DOC, DOCX (Max 5MB)</p>
                      <span className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Choose File
                      </span>
                    </label>
                    {cvName && (
                      <div className="mt-4 flex items-center justify-center gap-3">
                        <span className="text-green-600 font-medium">✓ {cvName}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setFormData(prev => ({ ...prev, cv: null }));
                            setCvName("");
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                {errors.cv && <p className="text-red-500 text-sm">{errors.cv}</p>}
              </div>

              {/* Submit Button */}
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </div>
                  ) : (
                    "Submit Application"
                  )}
                </button>
                <p className="text-center text-gray-500 text-sm mt-3">
                  By submitting, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Sidebar - Application Tips */}
        <Tips />
      </div>
    </div>
  </div>
);
}
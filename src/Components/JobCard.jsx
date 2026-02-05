import { FaTrash, FaEdit, FaEye, FaCheckCircle, FaBuilding, FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function JobCard({ job, isAdmin, onDelete, onEdit }) {
  const skillsList = Array.isArray(job?.skills)
    ? job.skills
    : typeof job?.skills === 'string'
    ? job.skills.split(',').map((s) => s.trim()).filter(Boolean)
    : [];

  const navigate = useNavigate();

  const handleCardClick = () => {
    if (!isAdmin) {
      navigate(`/jobs/${job.id}`);
    }
  };

  // Limit skills display to 3 for cleaner look
  const displayedSkills = skillsList.slice(0, 3);
  const remainingSkills = skillsList.length - 3;

  return (
    <div 
      className={`group relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl hover:border-blue-200 transition-all duration-300 ${
        !isAdmin ? 'cursor-pointer hover:-translate-y-1' : ''
      }`}
      onClick={handleCardClick}
    >
      {/* Gradient accent bar */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>

      {/* Card content */}
      <div className="p-6">
        
        {/* Job Title */}
        <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {job.title}
        </h2>

        {/* Company & Location */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="flex items-center gap-2 text-gray-600">
            <FaBuilding className="text-blue-400" />
            <span className="font-medium">{job.company}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <FaMapMarkerAlt className="text-red-400" />
            <span>{job.location}</span>
          </div>
          <div className="ml-auto bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
            <FaBriefcase className="text-xs" />
            {job.contract}
          </div>
        </div>

        {/* Skills Section */}
        {displayedSkills.length > 0 && (
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Required Skills</h3>
              {remainingSkills > 0 && (
                <span className="text-xs text-gray-400">+{remainingSkills} more</span>
              )}
            </div>
            <div className="space-y-2">
              {displayedSkills.map((skill, index) => (
                <div key={index} className="flex items-center group/item">
                  <div className="flex items-center justify-center w-5 h-5 mr-3 bg-green-100 rounded-full">
                    <FaCheckCircle className="text-green-500 text-xs" />
                  </div>
                  <span className="text-gray-700 group-hover/item:text-blue-600 transition-colors">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer with actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          {/* Posted time */}
          <div className="flex items-center gap-2 text-gray-400">
            <span className="text-xs">⏱️</span>
            <span className="text-sm">4 days ago</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {isAdmin ? (
              <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit?.();
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors group/edit"
                  aria-label="Edit job"
                >
                  <FaEdit className="group-hover/edit:scale-110 transition-transform" />
                  <span className="text-sm font-medium">Edit</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete?.(job.id);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors group/delete"
                  aria-label="Delete job"
                >
                  <FaTrash className="group-hover/delete:scale-110 transition-transform" />
                  <span className="text-sm font-medium">Delete</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-blue-600 group-hover:text-blue-700 transition-colors">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors">
                  <FaEye className="text-sm" />
                </div>
                <span className="text-sm font-medium group-hover:underline">View Details</span>
                <span className="text-blue-400 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hover effect overlay */}
      {!isAdmin && (
        <div className="absolute inset-0 bg-gradient-to-t from-blue-50/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
      )}
    </div>
  );
}
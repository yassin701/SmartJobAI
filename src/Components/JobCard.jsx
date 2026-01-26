import { Link } from "react-router-dom";
import { FaTrash , FaEdit , FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export default function JobCard({ job, isAdmin, onDelete, onEdit }) {

  const skillsList = Array.isArray(job?.skills)

    ? job.skills
    : typeof job?.skills === 'string'
    ? job.skills.split(',').map((s) => s.trim()).filter(Boolean)
    : [];

 const navigate = useNavigate();


  return (
    <div className="bg-white p-5 rounded-xl shadow-md border">
      <h2 className="text-xl font-bold">{job.title}</h2>
      <p className="text-gray-600">
        {job.company} – {job.location}
      </p>
      <p className="text-sm text-gray-500">{job.contract}</p>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mt-3">
        {skillsList.map((skill, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-700 px-2 py-1 text-xs rounded"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center mt-4">
        {!isAdmin && (
        <button className="flex items-center justify-between gap-2 text-xl text-blue-500"
          onClick={() => navigate(`/jobs/${job.id}`)}
        >
         
         View More <FaEye/>
        </button>
        )}

        {isAdmin && (
          <div className="flex gap-2">
            {/* EDIT BUTTON */}
            <button
              onClick={() => onEdit ? onEdit() : null}
              className="px-3  text-green-600"
            >
              <FaEdit/>
            </button>

            {/* DELETE BUTTON */}
            <button
              onClick={() => onDelete(job.id)}
              className="px-3 py-1 text-red-600 rounded"
            >
              <FaTrash/>
            </button>
          </div>
        )}
      </div>

      {/* Modal is handled by parent via `onEdit` prop */}
    </div>
  );
}

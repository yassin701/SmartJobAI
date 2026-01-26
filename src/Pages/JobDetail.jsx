import React, { useState, useEffect } from 'react';
import { getJobById } from '../services/axios';
import { useParams, useNavigate } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getJobById(id)
      .then((data) => setJob(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading ...</p>;
  if (!job) return <p className="text-center mt-10 text-red-500">Job not Found</p>;

  const skillsList = Array.isArray(job.skills)
    ? job.skills
    : typeof job.skills === 'string'
      ? job.skills.split(',').map(s => s.trim()).filter(Boolean)
      : [];

  return (

    <>
    
       
      <div className="max-w-4xl mx-auto my-10 p-8 bg-white shadow-lg rounded-xl border border-gray-200 relative">
        
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-2">{job.title}</h1>
          <p className="text-gray-600 text-lg">{job.company} – {job.location}</p>
          <p className="text-gray-500 mt-1 italic">{job.contract}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">Job Description</h2>
          <p className="text-gray-600 leading-relaxed">{job.description}</p>
        </div>

        {skillsList.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Skills Required</h3>
            <div className="flex flex-wrap gap-3">
              {skillsList.map((skill, i) => (
                <span
                  key={i}
                  className="bg-blue-50 text-blue-800 px-3 py-1 text-sm font-medium rounded-full border border-blue-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className='flex justify-center' >
        <button onClick={() => navigate("/Apply")}
        className='px-6 py-2 bg-gray-500 text-white rounded-2xl  hover:bg-blue-400 '>
          Apply
        </button>
      </div>
    </>
  );
}

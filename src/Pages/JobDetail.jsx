import React, { useState, useEffect } from 'react';
import { getJobById } from '../services/axios';
import { useParams, useNavigate } from 'react-router-dom';
import { MdArrowBack, MdLocationOn, MdBusiness, MdCalendarToday } from 'react-icons/md';
import { FaBriefcase, FaRegClock } from 'react-icons/fa';
import Footer from '../Components/Footer';
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto my-10 p-8 bg-white shadow-lg rounded-xl border border-gray-200 text-center">
        <div className="text-red-500 text-5xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Job Not Found</h2>
        <p className="text-gray-600 mb-6">The job you're looking for might have been removed or doesn't exist.</p>
        <button
          onClick={() => navigate('/jobs')}
          className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <MdArrowBack />
          Back to Jobs
        </button>
      </div>
    );
  }

  const skillsList = Array.isArray(job.skills)
    ? job.skills
    : typeof job.skills === 'string'
      ? job.skills.split(',').map(s => s.trim()).filter(Boolean)
      : [];

  return (
    <>
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header with Back Button */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors font-medium"
          >
            <MdArrowBack className="text-xl" />
            Back to Jobs
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Job Details Card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Job Header with Gradient */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold mb-3">{job.title}</h1>
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        <MdBusiness className="text-lg" />
                        <span className="font-medium">{job.company}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        <MdLocationOn className="text-lg" />
                        <span>{job.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold">
                    {job.contract}
                  </div>
                </div>
              </div>

              {/* Job Content */}
              <div className="p-8">
                {/* Job Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <FaBriefcase className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Type</p>
                        <p className="font-semibold text-gray-800">{job.contract}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <FaRegClock className="text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Posted</p>
                        <p className="font-semibold text-gray-800">4 days ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <MdCalendarToday className="text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Applications</p>
                        <p className="font-semibold text-gray-800">24 applied</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Job Description */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-8 w-1 bg-blue-600 rounded-full"></div>
                    <h2 className="text-xl font-bold text-gray-800">Job Description</h2>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {job.description}
                    </p>
                  </div>
                </div>

                {/* Skills Section */}
                {skillsList.length > 0 && (
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-8 w-1 bg-blue-600 rounded-full"></div>
                      <h2 className="text-xl font-bold text-gray-800">Required Skills</h2>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {skillsList.map((skill, i) => (
                        <span
                          key={i}
                          className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 px-4 py-2.5 rounded-xl border border-blue-200 font-medium shadow-sm hover:shadow-md transition-shadow"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Apply Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Apply Now</h3>
              <p className="text-gray-600 mb-6">
                Ready to join the {job.company} team? Submit your application now!
              </p>
              
              <div className="space-y-4">
                <button
                  onClick={() => navigate(`/apply`)}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                >
                  Apply Now
                </button>
                
                <button
                  onClick={() => navigate('/jobs')}
                  className="w-full py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
                >
                  View Similar Jobs
                </button>
              </div>

              {/* Quick Info */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-700 mb-3">Quick Facts</h4>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium">{job.location}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Contract:</span>
                    <span className="font-medium">{job.contract}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Company:</span>
                    <span className="font-medium">{job.company}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Posted:</span>
                    <span className="font-medium">4 days ago</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
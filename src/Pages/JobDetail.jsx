import React, { useState, useEffect } from 'react';
import { getJobById } from '../services/axios';
import { useParams, useNavigate } from 'react-router-dom';
import { MdArrowBack, MdLocationOn, MdBusiness, MdCalendarToday } from 'react-icons/md';
import { FaBriefcase, FaRegClock } from 'react-icons/fa';
import Footer from '../Components/Footer';
import { useSelector } from 'react-redux';

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.auth);
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
          <p className="text-gray-600 dark:text-gray-300 font-medium">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto my-10 p-8 bg-white dark:bg-slate-800 shadow-lg rounded-xl border border-gray-200 dark:border-slate-700 text-center transition-colors">
        <div className="text-red-500 text-5xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">Job Not Found</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">The job you're looking for might have been removed or doesn't exist.</p>
        <button
          onClick={() => navigate('/jobs')}
          className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
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
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-900 py-8 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header with Back Button */}
          <div className="mb-8">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors font-medium"
            >
              <MdArrowBack className="text-xl" />
              Back to Jobs
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Job Details Card */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-slate-800/80 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700/50 overflow-hidden backdrop-blur-sm transition-colors duration-300">
                {/* Job Header with Gradient */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-900 p-8 text-white transition-colors">
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
                    <div className="bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-lg font-semibold shadow-sm transition-colors">
                      {job.contract}
                    </div>
                  </div>
                </div>

                {/* Job Content */}
                <div className="p-8">
                  {/* Job Info Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800/30 transition-colors">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-100 dark:bg-blue-800/50 rounded-lg transition-colors">
                          <FaBriefcase className="text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Type</p>
                          <p className="font-semibold text-gray-800 dark:text-gray-200">{job.contract}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-100 dark:border-green-800/30 transition-colors">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-green-100 dark:bg-green-800/50 rounded-lg transition-colors">
                          <FaRegClock className="text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Posted</p>
                          <p className="font-semibold text-gray-800 dark:text-gray-200">4 days ago</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl border border-purple-100 dark:border-purple-800/30 transition-colors">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-purple-100 dark:bg-purple-800/50 rounded-lg transition-colors">
                          <MdCalendarToday className="text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Applications</p>
                          <p className="font-semibold text-gray-800 dark:text-gray-200">24 applied</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Job Description */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-8 w-1 bg-blue-600 dark:bg-blue-500 rounded-full"></div>
                      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Job Description</h2>
                    </div>
                    <div className="bg-gray-50 dark:bg-slate-700/30 p-6 rounded-xl transition-colors">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                        {job.description}
                      </p>
                    </div>
                  </div>

                  {/* Skills Section */}
                  {skillsList.length > 0 && (
                    <div className="mb-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-8 w-1 bg-blue-600 dark:bg-blue-500 rounded-full"></div>
                        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Required Skills</h2>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {skillsList.map((skill, i) => (
                          <span
                            key={i}
                            className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/40 dark:to-blue-800/40 text-blue-700 dark:text-blue-300 px-4 py-2.5 rounded-xl border border-blue-200 dark:border-blue-700/50 font-medium shadow-sm hover:shadow-md transition-all"
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
              <div className="bg-white dark:bg-slate-800/80 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700/50 p-6 sticky top-8 backdrop-blur-sm transition-colors duration-300">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Apply Now</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Ready to join the {job.company} team? Submit your application now!
                </p>

                <div className="space-y-4">
                  {role ? (
                    <button
                      onClick={() => navigate(`/apply`)}
                      className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700 transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                    >
                      Apply Now
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate(`/auth`)}
                      className="w-full py-4 bg-gradient-to-r from-gray-600 to-gray-700 dark:from-slate-600 dark:to-slate-700 text-white font-bold rounded-xl hover:from-gray-700 hover:to-gray-800 dark:hover:from-slate-700 dark:hover:to-slate-800 transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                    >
                      Sign In to Apply
                    </button>
                  )}

                  <button
                    onClick={() => navigate('/jobs')}
                    className="w-full py-3 bg-gray-100 dark:bg-slate-700/50 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                  >
                    View Similar Jobs
                  </button>
                </div>

                {/* Quick Info */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-700/50 transition-colors">
                  <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-3">Quick Facts</h4>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Location:</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">{job.location}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Contract:</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">{job.contract}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Company:</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">{job.company}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Posted:</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">4 days ago</span>
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
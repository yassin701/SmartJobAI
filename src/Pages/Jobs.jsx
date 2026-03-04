import React from 'react'
import { useEffect } from 'react'
import { fetchJobs } from '../Redux/jobSlice'
import JobCard from '../Components/JobCard'
import { useDispatch, useSelector } from 'react-redux'
import Footer from '../Components/Footer';
import JobFilter from '../Components/JobFilter';
import gsap from "gsap";

export default function Jobs() {
  const [filters, setFilters] = React.useState({ searchTerm: '', contractType: '' });
  const { list, status } = useSelector((state) => state.jobs)
  const dispatch = useDispatch();
  const jobsContainerRef = React.useRef(null);


  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const filteredJobs = list ? list.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      (Array.isArray(job.skills) ? job.skills.join(' ') : job.skills ?? '').toLowerCase().includes(filters.searchTerm.toLowerCase());

    const matchesContract = filters.contractType === '' || job.contract === filters.contractType;

    return matchesSearch && matchesContract;
  }) : [];

  // Re-run animation when filtered jobs change
  useEffect(() => {
    if (status !== 'loading' && filteredJobs.length > 0) {
      // Small timeout to allow DOM elements to render before GSAP targets them
      setTimeout(() => {
        gsap.fromTo(
          ".job-card-element",
          { opacity: 0, y: 40, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.2)", clearProps: "all" }
        );
      }, 0);
    }
  }, [filteredJobs.length, status]);

  if (status === "loading") return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400 font-medium">Loading jobs...</p>
      </div>
    </div>
  );


  return (
    <>
      <div className="py-10 px-6 max-w-7xl mx-auto min-h-screen">
        <JobFilter onFilterChange={setFilters} />

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8' ref={jobsContainerRef}>
          {filteredJobs && filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isAdmin={false}
              />

            ))

          ) : (

            <p className='flex justify-center items-center text-xl font-bold text-gray-500 dark:text-gray-400 py-20 col-span-full'>No Jobs available</p>

          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

import React from 'react'
import { useEffect } from 'react'
import { fetchJobs } from '../Redux/jobSlice'
import JobCard from '../Components/JobCard'
import { useDispatch, useSelector } from 'react-redux'
import Footer from '../Components/Footer';
import JobFilter from '../Components/JobFilter';
export default function Jobs() {
  const [filters, setFilters] = React.useState({ searchTerm: '', contractType: '' });
  const { list, status } = useSelector((state) => state.jobs)
  const dispatch = useDispatch();


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

  if (status === "loading") return <p>Loading...</p>;


  return (
    <>
      <div className='py-10 px-6'>
        <JobFilter onFilterChange={setFilters} />

        <div className='grid grid-cols-1  md:grid-cols-2  lg:grid-cols-4 gap-6'>
          {filteredJobs && filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isAdmin={false}
              />

            ))

          ) : (

            <p className='flex justify-center items-center text-xl font-bold text-gray-500 py-20 col-span-full'>No Jobs available</p>

          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

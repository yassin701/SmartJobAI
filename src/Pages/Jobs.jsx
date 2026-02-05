import React from 'react'
import { useEffect } from 'react'
import { fetchJobs } from '../Redux/jobSlice'
import JobCard from '../Components/JobCard'
import { useDispatch, useSelector } from 'react-redux'

export default function Jobs() {
     const {list, status } = useSelector ((state) => state.jobs)
     const dispatch = useDispatch();


     useEffect(() => {
       dispatch(fetchJobs());
     }, [dispatch]);

      if (status === "loading") return <p>Loading...</p>;


  return (
    <div className='grid grid-cols-1  md:grid-cols-2  lg:grid-cols-4 gap-6 py-10 px-6'>
      {list && list.length > 0 ? (
        list.map((job) => (
            <JobCard 
             key={job.id}
             job={job}
             isAdmin={false}
        />

        ))

      ) : (

        <p className='flex justify-center items-center text-xl font-bold text-gray-500'>No Jobs available</p>

        )}
    </div>

  );
}

import React, { useEffect, useState } from "react";
import JobCard from "../../Components/JobCard";
import { fetchJobs } from "../../Redux/jobSlice";
import { useDispatch , useSelector } from "react-redux";
import AdminEditJob from "../../Components/AdminEditJob";


export default function AdminDashboard() {
  const dispatch = useDispatch();
  const {list , loading} = useSelector((state) => state.jobs)

  const [open , setOpen] = useState(false);
  const [selectedJob , setSelectedJob] = useState(null);

  useEffect(() => {
      dispatch(fetchJobs());
  }, [dispatch]);




  if (loading) {
    return <p className="text-center mt-10">Loading jobs...</p>;
  }


 return (
  <>
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {list.length === 0 ? (
         <p className="text-center col-span-full">No jobs found</p>
      )  :(
        list.map((job) => (
          <JobCard
          key={job.id}
          job={job}
          isAdmin
          onEdit ={()=> {
            setSelectedJob(job);
            setOpen(true)

          }}
          />
        ))
      )}

    </div>
    <AdminEditJob
    isOpen={open}
    job={selectedJob}
    onClose={()=> setOpen(false)}
    onUpdated={() => dispatch(fetchJobs())}
    />

  </>
 );
}

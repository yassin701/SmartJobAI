import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJobById } from "../services/axios";

import JobDetail from "../Components/JobsDetail";
import ApplyForm from "../Components/ApplyForm";

export default function JobPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getJobById(id)
      .then(data => setJob(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Job details */}
        <div className="lg:col-span-2">
          <JobDetail job={job} />
        </div>

        {/* Apply form */}
        <div className="lg:col-span-1">
          <ApplyForm job={job} />
        </div>

      </div>
    </div>
  );
}

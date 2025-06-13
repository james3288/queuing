import React, { useEffect, useState } from "react";
import axios from "axios";

interface JobOrder {
  id: number;
  title: string;
  description: string;
  created_at: string;
}

export default function JobOrderQueue() {
  const [jobs, setJobs] = useState<JobOrder[]>([]);

  useEffect(() => {
    axios
      .get("/api/joborders/")
      .then((res) => {
        // handle both paginated and non-paginated responses
        const data = Array.isArray(res.data) ? res.data : res.data.results;
        setJobs(data || []);
      })
      .catch((err) => console.error("Failed fetching job orders", err));
  }, []);

  return (
    <div>
      <h2 className="text-xl mb-2">Job Orders</h2>
      <ul>
        {jobs.map((job) => (
          <li key={job.id} className="border p-2 mb-1 rounded">
            <div className="font-semibold">{job.title}</div>
            <div className="text-sm text-gray-600">{job.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

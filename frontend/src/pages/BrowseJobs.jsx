import {useState,useEffect,useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import { apiRequest } from "../api/api";
import {Spinner} from "../components/Spinner";
import {useSearchParams} from "react-router-dom";
import { Toast } from "../components/Toast";

export const BrowseJobs = () => {
  const { user, token } = useContext(AuthContext)
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams(); 
  const [toast, setToast] = useState(null);
  const [appliedIds, setAppliedIds] = useState(new Set());
  const search = searchParams.get("search") || "";
  useEffect(() => {
  const fetchAppliedJobs = async () => {
    try {
      const data = await apiRequest("/applications/myapplications", "GET", null, token);
      const ids = new Set(data.applications.map((app) => app.jobId?._id));
      setAppliedIds(ids);
    } catch (e) {
      console.log(e.message);
    }
  };
  if (token) fetchAppliedJobs();
}, []);
  useEffect(() => {
    const fetchJobs = async () => {
  try {
    const data = await apiRequest("/jobs", "GET", null, token);
    setJobs(data.jobs);
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};
  fetchJobs();
}, []);

  const handleApply = async (jobId) => {
  try {
    let result = await apiRequest("/applications/apply/" + jobId, "POST", null, token);
    setAppliedIds((prev) => new Set(prev).add(jobId));
    setToast({ message: "Applied successfully!", type: "success" });
  } catch (e) {
    setToast({ message: e.message, type: "error" }); 
  }
};

  const filteredJobs = jobs.filter((job) => {
  const term = search.toLowerCase();
  return (
    job.title?.toLowerCase().includes(term) ||
    job.company?.toLowerCase().includes(term) ||
    job.skills?.some((skill) => skill.toLowerCase().includes(term))
  );
});
  return (
  <div className="page-container">
    <Toast toast={toast} onClose={() => setToast(null)} />
    {error && <p className="error-text">{error}</p>}
    {loading ? (
      <Spinner />
    ) : (
      filteredJobs.map((job) => (
        <div className="card" key={job._id}>
        <h3>{job.title}</h3>
        <p>{job.company}</p>
        <p>{job.description}</p>
        <p>{job.deadline}</p>
        <p><a href = {job.link}>View Posting</a> job link {job.link}</p>
        {appliedIds.has(job._id) ? (<button disabled>Applied</button>) : (user && user.role === 'user' && (<button onClick={() => handleApply(job._id)}>Apply</button>))}
        </div>
      ))
    )}
     {!loading && filteredJobs.length === 0 && (
      <p>No jobs found matching "{search}"</p>
    )}
  </div>
)
}

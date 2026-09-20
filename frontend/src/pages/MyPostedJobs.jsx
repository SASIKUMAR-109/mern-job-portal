import {useState,useEffect,useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import { apiRequest } from "../api/api";

export const MyPostedJobs = () => {
  const {user,token} = useContext(AuthContext)
  const [jobs,setJobs] = useState([]);
  const [error, setError] = useState("");
  useEffect(()=>{
    const fetchJobs = async () => {
          try {
            const data = await apiRequest("/jobs/my-posts", "GET", null, token);
            setJobs(data.jobs);
            }
          catch (error) {
            setError(error.message);
        }
      };
      fetchJobs();

  },[]);
  const handleClose = async (jobId) => {
  try {
    const updatedJob = await apiRequest(`/jobs/${jobId}/close`, "PATCH", null, token);
    
    alert("Updated Successfully!")
    setJobs(jobs.map((job) => job._id === jobId ? updatedJob : job));
  } catch (error) {
    alert(error.message);
  }
};

const handleDelete = async (jobId) => {
  try {
    await apiRequest(`/jobs/${jobId}`, "DELETE", null, token);
    
    alert("Deleted Successfully!")
    setJobs(jobs.filter((job) => job._id !== jobId));
    
  } catch (error) {
    alert(error.message);
  }
};
    

  return <div className="page-container">
     {error && <p className="error-text">{error}</p>}
    {jobs.map((job) => (
    <div className="card" key={job._id}>
    <h3>{job.title}</h3>
    <p>{job.company}</p>
    <p>{job.status}</p>
    <p>{job.deadline}</p>
    <p><a href = {job.link}>View Posting</a> job link {job.link}</p>
    {user && (user.role === 'user' || user.role === 'company') && <button onClick={() => handleClose(job._id)}>Close</button>}
    {user && (user.role === 'user' || user.role === 'company') && <button onClick={() => handleDelete(job._id)}>Delete</button>}
  
  </div>
))}</div>;
}
import {useState,useEffect,useContext} from "react";
import {AuthContext} from "../context/AuthContext" 
import { apiRequest } from "../api/api";
import {Spinner} from "../components/Spinner";
export const AdminReview = () => {
  const {user,token} = useContext(AuthContext);
  const [jobs,setJobs] = useState([]);
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(true);
useEffect(()=>{
  const fetchJobs =async ()=>{
    try{
      const data = await apiRequest("/jobs/pending","GET",null,token);
      setJobs(data.jobs);
    }
    catch(e){
      setError(e.message);
    }finally{
      setLoading(false);
    }

  };
  fetchJobs();
},[]);
    const handleApprove = async (jobId) => {
  try {
    await apiRequest(`/jobs/${jobId}/approve`, "PATCH", null, token);
    
    alert("Updated Successfully!")
    setJobs(jobs.filter((job) => job._id !== jobId));
  } catch (error) {
    alert(error.message);
  }
};

    const handleReject = async (jobId) => {
  try {
    await apiRequest(`/jobs/${jobId}/reject`, "PATCH", null, token);
    
    alert("Updated Successfully!")
    setJobs(jobs.filter((job) => job._id !== jobId));
  } catch (error) {
    alert(error.message);
  }
};

  return <div className="page-container">
    {error && <p className="error-text">{error}</p>}
    {loading? (<Spinner/>):(jobs.map((job) => (
  <div className="card" key={job._id}>
    <h3>{job.title}</h3>
    <p>{job.company}</p>
    <p>{job.description}</p>
    <p>{job.deadline}</p>
    <p><a href = {job.link}>View Posting</a> job link {job.link}</p>
     {user && user.role === 'admin' && <button onClick = {()=>handleApprove(job._id)}>Approve</button>}
     {user && user.role === 'admin' && <button onClick = {()=>handleReject(job._id)}>Reject</button>}
  
  </div>
)))}
   </div>;
}
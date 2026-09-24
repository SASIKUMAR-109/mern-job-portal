import {useState,useEffect,useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import { apiRequest } from "../api/api";
import {Spinner} from "../components/Spinner";

export const BrowseJobs = () => {
  const { user, token } = useContext(AuthContext)
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
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

  const handleApply = async (jobId)=>{
    try{
      let result = await apiRequest("/applications/apply/" + jobId, "POST", null, token)
      alert("Applied successfully!")
    }
    catch(e){
        alert(e.message)
    }
  }
  return (
  <div className="page-container">
    {error && <p className="error-text">{error}</p>}
    {loading ? (
      <Spinner />
    ) : (
      jobs.map((job) => (
        <div className="card" key={job._id}>
          
    <h3>{job.title}</h3>
    <p>{job.company}</p>
    <p>{job.description}</p>
    <p>{job.deadline}</p>
    <p><a href = {job.link}>View Posting</a> job link {job.link}</p>
     {user && user.role === 'user' && <button onClick = {()=>handleApply(job._id)}>Apply</button>}
  
      </div>
       
      ))
    )}
  </div>
)
}

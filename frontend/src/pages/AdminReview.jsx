import {useState,useEffect,useContext} from "react";
import {AuthContext} from "../context/AuthContext" 
import { apiRequest } from "../api/api";
import {Spinner} from "../components/Spinner";
import { Toast } from "../components/Toast";
import {ConfirmDialog} from "../components/ConfirmDialog";


export const AdminReview = () => {
  const {user,token} = useContext(AuthContext);
  const [jobs,setJobs] = useState([]);
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [pendingRejectId, setPendingRejectId] = useState(null);
  const [pendingApproveId, setPendingApproveId] = useState(null);

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
  const confirmApprove = async () => {
  const jobId = pendingApproveId;
  setPendingApproveId(null);
  try {
    await apiRequest(`/jobs/${jobId}/approve`, "PATCH", null, token);
    setToast({ message: "Approved successfully!", type: "success" });
    setJobs(jobs.filter((job) => job._id !== jobId));
  } catch (error) {
    setToast({ message: error.message, type: "error" });
  }
};

  const confirmReject = async () => {
  const jobId = pendingRejectId;
  setPendingRejectId(null);
  try {
    await apiRequest(`/jobs/${jobId}/reject`, "PATCH", null, token);
    setToast({ message: "Rejected successfully!", type: "success" });
    setJobs(jobs.filter((job) => job._id !== jobId));
  } catch (error) {
    setToast({ message: error.message, type: "error" });
  }
};

  return <div className="page-container">
    <Toast toast={toast} onClose={() => setToast(null)} />
    <ConfirmDialog
      open={!!pendingApproveId}
      message="Approve this job posting? It will go live for users to see."
      onConfirm={confirmApprove}
      onCancel={() => setPendingApproveId(null)}
    />
    <ConfirmDialog
      open={!!pendingRejectId}
      message="Reject this job posting? This can't be undone."
      onConfirm={confirmReject}
      onCancel={() => setPendingRejectId(null)}
    />
    {error && <p className="error-text">{error}</p>}
    {loading? (<Spinner/>):(jobs.map((job) => (
  <div className="card" key={job._id}>
    <h3>{job.title}</h3>
    <p>{job.company}</p>
    <p>{job.description}</p>
    <p>{job.deadline}</p>
    <p><a href = {job.link}>View Posting</a> job link {job.link}</p>
     {user && user.role === 'admin' && (<button onClick={() => setPendingApproveId(job._id)}>Approve</button>)}
     {user && user.role === 'admin' && (<button onClick={() => setPendingRejectId(job._id)}>Reject</button>)}
  </div>
)))}
   </div>;
}
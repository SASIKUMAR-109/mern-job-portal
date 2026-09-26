import {useState,useEffect,useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import { apiRequest } from "../api/api";
import {Spinner} from "../components/Spinner";
import { Toast } from "../components/Toast";
import {ConfirmDialog} from "../components/ConfirmDialog";
import { formatDate } from "../utils/formatDate";

export const MyPostedJobs = () => {
  const {user,token} = useContext(AuthContext)
  const [jobs,setJobs] = useState([]);
  const [error, setError] = useState("");
  const [loading,setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [toast, setToast] = useState(null);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [pendingCloseId, setPendingCloseId] = useState(null);
  
  useEffect(()=>{
    const fetchJobs = async () => {
          try {
            const data = await apiRequest("/jobs/my-posts", "GET", null, token);
            setJobs(data.jobs);
            }
          catch (error) {
            setError(error.message);
        }finally {
          setLoading(false);
        }
      };
      fetchJobs();

  },[]);
  const confirmClose = async () => {
    const jobId = pendingCloseId;
    setPendingCloseId(null);
  try {
    const updatedJob = await apiRequest(`/jobs/${jobId}/close`, "PATCH", null, token);
    setToast({ message: "Closed successfully!", type: "success" });
    setJobs(jobs.map((job) => job._id === jobId ? updatedJob : job));
  } catch (error) {
    setToast({ message: error.message, type: "error" });
  }
};

const confirmDelete = async () => {
  const jobId = pendingDeleteId;
  setPendingDeleteId(null);
  try {
    await apiRequest(`/jobs/${jobId}`, "DELETE", null, token);
    setToast({ message: "Deleted successfully!", type: "success" });
    setJobs(jobs.filter((job) => job._id !== jobId));
  } catch (error) {
    setToast({ message: error.message, type: "error" });
  }
};
    
  const handleEditClick = (job) => {
  setEditingId(job._id);
  setEditForm({
    title: job.title,
    company: job.company,
    description: job.description,
    location: job.location,
    deadline: job.deadline,
    link: job.link
  });
};

  const handleEditChange = (field, value) => {
  setEditForm({ ...editForm, [field]: value });
    };
  const handleSaveEdit = async (jobId)=>{
    try{
      const edit = await apiRequest("/jobs/" + jobId, "PUT", editForm, token);
      setToast({ message: "Saved successfully!", type: "success" });
      setJobs(jobs.map((job) => job._id === jobId ? edit : job));
      setEditingId(null);
    }
    catch (error){
      setToast({ message: error.message, type: "error" });
    }
  }

  return <div className="page-container">
    <Toast toast={toast} onClose={() => setToast(null)} />
      <ConfirmDialog
      open={!!pendingCloseId}
      message="Close this job posting? It will no longer be visible to applicants."
      onConfirm={confirmClose}
      onCancel={() => setPendingCloseId(null)}
    />
    <ConfirmDialog
      open={!!pendingDeleteId}
      message="Are you sure to delete this job posting? This can't be undone."
      onConfirm={confirmDelete}
      onCancel={() => setPendingDeleteId(null)}
    />
     {error && <p className="error-text">{error}</p>}
     {loading ? (<Spinner/>):(jobs.map((job) => (
    <div className="card" key={job._id}>
    {editingId === job._id ? (
  <div className="edit-form">
    <input value={editForm.title} onChange={(e) => handleEditChange("title", e.target.value)} />
    <input value={editForm.company} onChange={(e) => handleEditChange("company", e.target.value)} />
    <input value={editForm.description} onChange={(e) => handleEditChange("description", e.target.value)} />
    <input value={editForm.location} onChange={(e) => handleEditChange("location", e.target.value)} />
    <input type="date" value={editForm.deadline} onChange={(e) => handleEditChange("deadline", e.target.value)} />
    <input value={editForm.link} onChange={(e) => handleEditChange("link", e.target.value)} />
    <div className="edit-form-actions">
    <button onClick={() => handleSaveEdit(job._id)}>Save</button>
    <button onClick={() => setEditingId(null)}>Cancel</button>
    </div>
  </div>
) : (
  <>
    <h3>{job.title}</h3>
    <p>{job.company}</p>
    <p>{job.status}</p>
    <p>{formatDate(job.deadline)}</p>
    <p><a href={job.link}>View Posting</a></p>
    {user && (user.role === 'user' || user.role === 'company') && <button onClick={() => setPendingCloseId(job._id)}>Close</button>}
    {user && (user.role === 'user' || user.role === 'company') && <button onClick={() => setPendingDeleteId(job._id)}>Delete</button>}
    {user && (user.role === 'user' || user.role === 'company') && <button onClick={() => handleEditClick(job)}>Edit</button>}
  </>
)}
  </div>
)))}
    </div>;
}
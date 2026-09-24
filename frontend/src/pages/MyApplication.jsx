
import {useState,useEffect,useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import { apiRequest } from "../api/api";
import {Spinner} from "../components/Spinner";

const statusClassMap = {
  Applied: "applied",
  OA: "oa",
  Interview: "interview",
  Offer: "offer",
  Rejected: "rejected",
};

export const MyApplications = () => {
  const { user, token } = useContext(AuthContext)
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await apiRequest("/applications/myapplications", "GET", null, token);
        setApplications(data.applications);
        }
      catch (error) {
        setError(error.message);
    }finally {
    setLoading(false);
  }
  };
  fetchApplications();
}, []);
    const handleWithdraw = async (applicationId)=>{
    try{
      let result = await apiRequest("/applications/delete/" + applicationId, "DELETE", null, token)
      alert("Deleted successfully!")
      setApplications(applications.filter((application) => application._id !== applicationId));
    }
    catch(e){
        alert(e.message)
    }
  }
  const handleStatusChange = async (applicationId, newStatus) => {
  try {
    const updated = await apiRequest(`/applications/update/${applicationId}`, "PUT", { status: newStatus }, token);
              setApplications(applications.map((application)=>application._id === applicationId?updated:application))
  } catch (e) {
    alert(e.message);
  }
    };
  return (<div className="page-container">
    {error && <p className="error-text">{error}</p>}
    {loading ? ( <Spinner /> ):(applications.map((application) => (
  <div className="card" key={application._id}>
    <h3>{application.jobId.title}</h3>
    <p>{application.jobId.company}</p>
    <select
  className={`status-select status-select-${statusClassMap[application.status] || "applied"}`}
  value={application.status}
  onChange={(e) => handleStatusChange(application._id, e.target.value)}
>
  <option value="Applied">Applied</option>
      <option value="OA">OA</option>
      <option value="Interview">Interview</option>
      <option value="Offer">Offer</option>
      <option value="Rejected">Rejected</option>
</select>
    
    <p>{application.notes}</p>
    <p><a href = {application.jobId.link}>View Posting</a> job link {application.jobId.link}</p>
     {user && user.role === 'user' && <button onClick = {()=>handleWithdraw(application._id)}>Withdraw Application</button>}
     
  
  </div>
)))}
    
    </div>);;
}
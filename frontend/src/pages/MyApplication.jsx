
import {useState,useEffect,useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import { apiRequest } from "../api/api";


export const MyApplications = () => {
  const { user, token } = useContext(AuthContext)
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await apiRequest("/applications/myapplications", "GET", null, token);
        setApplications(data.applications);
        }
      catch (error) {
        setError(error.message);
    }
  };
  fetchApplications();
}, []);
    const handleWithdraw = async (jobId)=>{
    try{
      let result = await apiRequest("/applications/delete/" + jobId, "DELETE", null, token)
      alert("Deleted successfully!")
    }
    catch(e){
        alert(e.message)
    }
  }
  return <div>
    {error && <p>{error}</p>}
    {applications.map((application) => (
  <div key={application._id}>
    <h3>{application.jobId.title}</h3>
    <p>{application.jobId.company}</p>
    <p>{application.status}</p>
    <p>{application.notes}</p>
    <p><a href = {application.jobId.link}>View Posting</a> job link {application.jobId.link}</p>
     {user && user.role === 'user' && <button onClick = {()=>handleWithdraw(application._id)}>Withdraw Application</button>}
     
  
  </div>
))}</div>;;
}
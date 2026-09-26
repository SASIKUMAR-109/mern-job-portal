
import {useState,useEffect,useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import { apiRequest } from "../api/api";
import {Spinner} from "../components/Spinner";
import { Toast } from "../components/Toast";
import {ConfirmDialog} from "../components/ConfirmDialog";

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
  const [toast, setToast] = useState(null);
  const [pendingWithdrawId, setPendingWithdrawId] = useState(null);
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
   

const confirmWithdraw = async () => {
  const applicationId = pendingWithdrawId;
  setPendingWithdrawId(null);
  try {
    await apiRequest("/applications/delete/" + applicationId, "DELETE", null, token);
    setToast({ message: "Deleted successfully!", type: "success" });
    setApplications(applications.filter((application) => application._id !== applicationId));
  } catch (e) {
    setToast({ message: e.message, type: "error" });
  }
};
  const handleStatusChange = async (applicationId, newStatus) => {
  try {
    const updated = await apiRequest(`/applications/update/${applicationId}`, "PUT", { status: newStatus }, token);
    setApplications(applications.map((application)=>application._id === applicationId?updated:application))
  } catch (e) {
     setToast({ message: e.message, type: "error" });
  }
    };
    
  return (
  <div className="page-container">
    <Toast toast={toast} onClose={() => setToast(null)} />
      <ConfirmDialog
          open={!!pendingWithdrawId}
          message="Withdraw this application? This can't be undone."
          onConfirm={confirmWithdraw}
          onCancel={() => setPendingWithdrawId(null)}
        />
    {error && <p className="error-text">{error}</p>}
    {loading ? (
      <Spinner />) : (
      applications.map((application) => (
        <div className="card" key={application._id}>
          {application.jobId ? (
            <>
              <h3>{application.jobId.title}</h3>
              <p>{application.jobId.company}</p>
              <p>
                <a href={application.jobId.link}>View Posting</a>
              </p>
            </>
          ) : (
            <h3>Job posting no longer available</h3>
          )}

          <select
            className={`status-select status-select-${statusClassMap[application.status] || "applied"}`}
            value={application.status}
            onChange={(e) => handleStatusChange(application._id, e.target.value)}
          >
            <option className = "status-applied" value="Applied">Applied</option>
            <option className = "status-oa" value="OA">OA</option>
            <option className = "status-interview" value="Interview">Interview</option>
            <option className = "status-offer"value="Offer">Offer</option>
            <option className = "status-rejected" value="Rejected">Rejected</option>
          </select>

          <p>{application.notes}</p>

          {user && user.role === "user" && (
            <button onClick={() => setPendingWithdrawId(application._id)}>
                Withdraw Application
              </button>
          )}
        </div>
      ))
    )}
  </div>
)
}
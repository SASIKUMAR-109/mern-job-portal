import { useNavigate } from "react-router-dom";
import { useState,useContext ,useEffect} from "react"
import { apiRequest } from "../api/api";
import {AuthContext} from "../context/AuthContext"



export const PostJob = () => {
  const { token } = useContext(AuthContext)
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [deadline, setDeadline] = useState("");
  const [skills, setSkills] = useState("");
  const [link,setLink] = useState("");
  const [error,setError] = useState("");
  const [deadlineError, setDeadlineError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
  if (!token) {
    navigate("/login");
  }
    }, []);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setDeadlineError("");

  const today = new Date().toISOString().split("T")[0];
  if (deadline < today) {
    setDeadlineError("Deadline can't be in the past. Please choose a valid date.");
    return;
  }

  try {
    let skillsArray = skills.split(",")
    let trimArray = skillsArray.map((skill)=>skill.trim())
    const validSkills = trimArray.filter((skill) => skill.length >0);
    if (validSkills.length === 0) {
      setError("Please enter at least one skill");
      return; 
    }
    const finalLocation = location.trim() || undefined;
    const data = await apiRequest("/jobs", "POST", { title,company,description,location:finalLocation,deadline,link,skills:validSkills},token);
    navigate("/my-posted-jobs");
  } catch (error) {
    setError(error.message);
  }
};
  return (
    <div  className="page-container">
    <form className="auth-form" onSubmit={handleSubmit}>
      <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="title" />
      <input value={company} required onChange={(e) => setCompany(e.target.value)} placeholder="company" />
      <input type="text" required value={description} onChange={(e) => setDescription(e.target.value)} placeholder="description" />
      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="location" />
      <input type="text" required value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="skills" />
      <input 
        type="date" 
        value={deadline} 
        min={new Date().toISOString().split("T")[0]}
        onChange={(e) => setDeadline(e.target.value)} 
      />
      {deadlineError && <p className="error-text">{deadlineError}</p>}
      <input type="text" required value={link} onChange={(e) => setLink(e.target.value)} placeholder="link" />
      <button type="submit">Post a Job</button>
      {error && <p>{error}</p>}
    </form>
    </div>
  );;
}
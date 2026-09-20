import { useNavigate } from "react-router-dom";
import { useState,useContext } from "react"
import { apiRequest } from "../api/api";
import {AuthContext} from "../context/AuthContext"



export const PostJob = () => {
  const { token } = useContext(AuthContext)
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [deadline, setDeadline] = useState("");
  const [link,setLink] = useState("");
  const [error,setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await apiRequest("/jobs", "POST", { title,company,description,location,deadline,link},token);
      navigate("/my-posted-jobs");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div  className="page-container">
    <form className="auth-form" onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="title" />
      <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="company" />
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="description" />
      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="location" />
      <input type="text" value={deadline} onChange={(e) => setDeadline(e.target.value)} placeholder="deadline" />
      <input type="text" value={link} onChange={(e) => setLink(e.target.value)} placeholder="link" />
      <button type="submit">Post a Job</button>
      {error && <p>{error}</p>}
    </form>
    </div>
  );;
}
import { useNavigate,Link } from "react-router-dom";
import { useState } from "react"
import { apiRequest } from "../api/api";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [confirmpassord,setConfrimpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmpassord) {
      setError("Passwords do not match");
      return;
    }
    try {
      const data = await apiRequest("/auth/register", "POST", { name, email, password, role });
      navigate("/login");
    
    } catch (error) {
      if (error.message === "Email already exists") {
          navigate("/login");
  } else {
    setError(error.message);
  }
}
  };

  return (
    <div className="page-container">
    <form className="auth-form" onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input 
  type={showPassword ? "text" : "password"} 
  value={password} 
  onChange={(e) => setPassword(e.target.value)} 
  placeholder="Password" 
/>
<input 
  type={showPassword ? "text" : "password"} 
  value={confirmpassord} 
  onChange={(e) => setConfrimpassword(e.target.value)} 
  placeholder="Confirm password" 
/>
<label style={{ fontSize: "13px", color: "var(--text-muted)" }}>
  <input 
    type="checkbox" 
    checked={showPassword} 
    onChange={() => setShowPassword(!showPassword)} 
  /> Show password
</label>
      <select name="role" value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="user">user</option>
        <option value="company">Company</option>
      </select>
      <button type="submit">Register</button>
      {error && <p>{error}</p>}
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </form>
    </div>
  );
}

import { useNavigate,Link } from "react-router-dom";
import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext";
import { apiRequest } from "../api/api";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const data = await apiRequest("/auth/login", "POST", { email, password });
      login({ name: data.name, role: data.role }, data.token);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
    finally {
      setSubmitting(false);
     }
  };

  return (
    <div  className="page-container">
    <form className="auth-form" onSubmit={handleSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <div className="password-field">
  <input
    type={showPassword ? "text" : "password"}
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Password"
  />
    <label style={{ fontSize: "13px", color: "var(--text-muted)" }}>
  <input 
    type="checkbox" 
    checked={showPassword} 
    onChange={() => setShowPassword(!showPassword)} 
    /> Show password
    </label>
  </div>
      <button type="submit" disabled={submitting}>
        {submitting ? "Logging in..." : "Login"}
      </button>
      {error && <p>{error}</p>}
      <p>New here? <Link to="/register">Create an account</Link></p>
    </form>
    </div>
  );
}
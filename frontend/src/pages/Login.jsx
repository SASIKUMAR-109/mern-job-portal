import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext";
import { apiRequest } from "../api/api";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await apiRequest("/auth/login", "POST", { email, password });
      login({ name: data.name, role: data.role }, data.token);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div  className="page-container">
    <form className="auth-form" onSubmit={handleSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
    </div>
  );
}
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "../App.css";

export const Navbar = () => {
  const { user, logout } = useContext(AuthContext)

  return (
    <nav className="navbar">
      <Link className="nav-link" to="/">Browse Jobs</Link>
      {!user && <Link className="nav-link" to="/login">Login</Link>}
      {!user && <Link className="nav-link" to="/register">Register</Link>}
      {user && <button className="btn btn-outline" onClick={logout}>Logout</button>}
      {user && user.role === 'admin' && <Link className="nav-link" to="/admin/review">Review Queue</Link>}
      {user && user.role === 'user' && <Link className="nav-link" to="/my-applications">MyApplication</Link>}
      {user && user.role === 'user' && <Link className="nav-link" to="/post-job">Post a Job</Link>}
      {user && user.role === 'company' && <Link className="nav-link" to="/post-job">Post a Job</Link>}
      {user && user.role === 'company' && <Link className="nav-link" to="/my-posted-jobs">My Posted Jobs</Link>}
    </nav>
  )
};
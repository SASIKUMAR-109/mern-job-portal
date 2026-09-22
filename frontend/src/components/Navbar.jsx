import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "../App.css";

export const Navbar = () => {
  const { user, logout } = useContext(AuthContext)

  return (
    <nav className="navbar">
      <Link className="brand" to="/">CareerHub</Link>

      <div className="navbar-center">
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/jobs">Browse Jobs</Link>
        <Link className="nav-link" to="/post-job">Post a Job</Link>
        <Link className="nav-link" to="/about">About</Link>
        {user && user.role === 'admin' && <Link className="nav-link" to="/admin/review">Review Queue</Link>}
        {user && user.role === 'user' && <Link className="nav-link" to="/my-applications">My Applications</Link>}

        {user && user.role === 'company' && <Link className="nav-link" to="/my-posted-jobs">My Posted Jobs</Link>}
      </div>

      <div className="navbar-right">
        {!user && <Link className="btn" to="/register">Get Started</Link>}
        {user && <span className="navbar-username">Hi, {user.name}</span>}
        {user && <button className="btn btn-outline" onClick={logout}>Logout</button>}
      </div>
    </nav>
  )
};
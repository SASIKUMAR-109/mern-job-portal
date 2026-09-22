import { useContext,useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "../App.css";

export const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={`navbar ${menuOpen ? "menu-open" : ""}`}>
      <Link className="brand" to="/">CareerHub</Link>
      <button className="hamburger-btn" onClick={() => setMenuOpen(!menuOpen)}>☰</button>

      <div className="navbar-center">
        <Link className="nav-link" onClick={() => setMenuOpen(false)} to="/">Home</Link>
        <Link className="nav-link" onClick={() => setMenuOpen(false)} to="/jobs">Browse Jobs</Link>
        <Link className="nav-link" onClick={() => setMenuOpen(false)} to="/post-job">Post a Job</Link>
        <Link className="nav-link" onClick={() => setMenuOpen(false)} to="/about">About</Link>
        {user && user.role === 'admin' && <Link className="nav-link" to="/admin/review" onClick={() => setMenuOpen(false)}>Review Queue</Link>}
        {user && user.role === 'user' && <Link className="nav-link" to="/my-applications" onClick={() => setMenuOpen(false)}>My Applications</Link>}

        {user && user.role === 'company' && <Link className="nav-link" to="/my-posted-jobs" onClick={() => setMenuOpen(false)}>My Posted Jobs</Link>}
      </div>

      <div className="navbar-right">
        {!user && <Link className="btn"  onClick={() => setMenuOpen(false)} to="/register">Get Started</Link>}
        {user && <span className="navbar-username">Hi, {user.name}</span>}
        {user && <button className="btn btn-outline" onClick={() => { logout(); setMenuOpen(false);}}>Logout</button>}
      </div>
    </nav>
  )
};
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const { user, logout } = useContext(AuthContext)

  return (
    <nav>
      <Link to="/">Browse Jobs</Link>
      {!user && <Link to="/login">Login</Link>}
      {!user && <Link to="/register">Register</Link>}
      {user && <button onClick={logout}>Logout</button>}
      {user && user.role === 'admin' && <Link to="/admin/review">Review Queue</Link>}
      {user && user.role === 'user' && <Link to="/my-applications">MyApplication</Link>}
      {user && user.role === 'user' && <Link to="/post-job">Post a Job</Link>}
      {user && user.role === 'company' && <Link to="/post-job">Post a Job</Link>}
      {user && user.role === 'company' && <Link to="/my-posted-jobs">My Posted Jobs</Link>}
    </nav>
  )
};
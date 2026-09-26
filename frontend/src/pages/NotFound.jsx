import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="not-found" style={{ textAlign: "center" }}>
      <h1>404</h1>
      <p>This page doesn't exist.</p>
      <Link to="/" className="btn">Back to Home</Link>
    </div>
  );
};
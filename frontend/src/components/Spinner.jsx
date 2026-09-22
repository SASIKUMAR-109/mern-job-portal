import { useState } from "react";
import { ClipLoader } from "react-spinners";

export function Spinner(data) {
  const [loading, setLoading] = useState(true);

  // Simulate data loading
  setTimeout(() => setLoading(false), 1000);

  return (
    <div>
      {loading ? (
        <div className = "spinner">
        <ClipLoader  color="#7aa2f7"  loading={loading} size={50} />
        </div>
      ) : (
        <div>{data}</div>
      )}
    </div>
  );
}   
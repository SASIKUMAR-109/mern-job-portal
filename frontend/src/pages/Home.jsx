import {useState,useEffect} from "react";
import {Link} from "react-router-dom";
import {apiRequest} from "../api/api";
import {Spinner} from "../components/Spinner";
export const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async ()=>{
        try {
        const data = await apiRequest("/jobs", "GET", null);
        setJobs(data.jobs);
        }
      catch (error) {
        setError(error.message);
    }
    finally{
        setLoading(false);
    }
    };fetchJobs()
  }, []);

  return (
    <div>
        <section className="hero">
            
            <p className="hero-tagline">JOBS • INTERNSHIPS • FOR EVERYONE</p>
            <h1>Find Your Next <span className="highlight">Opportunity</span></h1>
            <p>Not just companies — students share leads too.</p>
            <div className="search-bar">
                <input type="text" placeholder="Search jobs, roles, or companies..." />
                <button>Search</button>
            </div>
        </section>
        <section className="how-it-works">
            <h2>How it works</h2>
            <div className="steps">
                <div className="step">
                    <h3>1.Post</h3>
                    <p>Companies or students post opportunities</p>

                </div>
                <div className="step">
                    <h3>2.Review</h3>
                    <p>Our team reviews every listing.</p>
                </div>
                <div className="step"><h3>3.Get hired.</h3>
                    <p>Find genuine opportunities and apply with confidence.</p></div>
            </div>
        </section>
        <section className="latest-jobs">
            <h2>Latest Opportunities</h2>
         <div>
            {loading ? (<Spinner/>):( jobs.slice(0, 4).map((job) => (
            <div className="card" key={job._id}>
                <h3>{job.title}</h3>
                <p>{job.company}</p>
                <p>{job.location}</p>
                {job.skills?.slice(0, 3).map((skill) => (
                    <span key={skill}>{skill}</span>
                ))}
                </div>
    
        )))}
           </div>
        </section>
       
    </div>
  )
}
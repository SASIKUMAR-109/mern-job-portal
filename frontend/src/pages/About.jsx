import "../App.css";

export const About = () => {
  return (
    <div className="page-container about-page">
      <h1>About CareerHub</h1>
      <p>
        CareerHub was built on a simple idea: opportunities shouldn't only 
        come from companies. Students often hear about openings before they're 
        even posted anywhere official, through friends, professors, or 
        word of mouth. CareerHub gives them a way to share that knowledge 
        with their peers, not just companies posting on their own.
      </p>

      <div className="about-section">
        <h2>How it's different</h2>
        <p>
          Most job portals only let companies post listings. CareerHub lets 
          both companies and students post opportunities, so if you hear 
          your senior's company is hiring, you can share it with your batch 
          directly on the platform.
        </p>
      </div>

      <div className="about-section">
        <h2>Trust & moderation</h2>
        <p>
          Every listing, whether posted by a company or a student, goes 
          through admin review before it appears publicly. This keeps the 
          platform genuine and spam-free, while still being open to everyone.
        </p>
      </div>

      <div className="about-section">
        <h2>Built by</h2>
        <p>
          CareerHub was built by Sasi Kumar, a final-year Computer Science 
          student, as a full-stack MERN project, combining real authentication, 
          role-based access, and a moderation workflow into a working platform.
        </p>
      </div>

      <p className="about-signature">— Sasi Kumar —</p>
    </div>
  );
};
import { AuthProvider } from "./context/AuthContext";
import { Navbar } from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminReview } from "./pages/AdminReview";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { PostJob } from "./pages/PostJob";
import { MyApplications } from "./pages/MyApplication";
import { MyPostedJobs } from "./pages/MyPostedJobs";
import { BrowseJobs } from "./pages/BrowseJobs";
import { Home } from "./pages/Home";
import { Footer } from "./components/Footer";
import {About} from "./pages/About";
import {NotFound} from "./pages/NotFound";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/jobs" element={<BrowseJobs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/my-applications" element={<MyApplications />} />
          <Route path="/my-posted-jobs" element={<MyPostedJobs />} />
          <Route path="/admin/review" element={<AdminReview />} />
          <Route path ="/about" element = {<About/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
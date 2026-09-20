const Job = require('../models/Job');

const createJob = async (req, res) => {
  try {
    const { title, company, description, location, deadline, link,skills } = req.body;
    const postedBy = req.user.id;
    const job = new Job({ title, company, description, location, deadline, link, postedBy,skills });
    const savedJob = await job.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

const getApprovedJobs = async (req,res)=>{
    try{
        const jobsApproved = await Job.find({ status: 'approved' });
        res.status(200).json({count:jobsApproved.length,jobs:jobsApproved});
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}

const getMyPostedJobs = async(req,res)=>{
    try{
        const postedBy = req.user.id;
        const jobsPosted = await Job.find({ postedBy });
        res.status(200).json({count:jobsPosted.length,jobs:jobsPosted});
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}

const getPendingJobs = async(req,res)=>{
    try{
        const jobsPending = await Job.find({status: 'pending' });
        res.status(200).json({count:jobsPending.length,jobs:jobsPending});
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}

const approveJob = async(req,res)=>{
    try{
        const id=req.params.id;
        const updatedJobStatus = await Job.findByIdAndUpdate(id,{status:'approved'},{new:true});
        if(!updatedJobStatus){
            return res.status(404).json({message:"Job not found"});
        }
        res.status(200).json(updatedJobStatus);
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}

const rejectJob = async(req,res)=>{
    try{
        const id=req.params.id;
        const updatedJobStatus = await Job.findByIdAndUpdate(id,{status:'rejected'},{new:true});
        if(!updatedJobStatus){
            return res.status(404).json({message:"Job not found"});
        }   
        res.status(200).json(updatedJobStatus);
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}

const updateJob = async (req,res)=>{
    try{
        const id=req.params.id;
        const postedBy = req.user.id;
        const updatedJob = await Job.findOneAndUpdate({_id:id, postedBy},req.body,{new:true});
        if(!updatedJob){
            return res.status(404).json({message:"Job not found"});
        }
        res.status(200).json(updatedJob);
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}

const deleteJob = async(req,res)=>{
    try{
        const id=req.params.id;
        const postedBy = req.user.id;
        const deletedJob = await Job.findOneAndDelete({_id:id, postedBy});
        if(!deletedJob){
            return res.status(404).json({message:"Job not found"});
        }
        res.status(200).json({message:"Job deleted successfully"});
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}

const closeJob = async(req,res)=>{
    try{
        const id=req.params.id;
        const postedBy = req.user.id;
        const closedJob = await Job.findOneAndUpdate({_id:id, postedBy},{status:'closed'},{new:true});
        if(!closedJob){
            return res.status(404).json({message:"Job not found"});
        }
        res.status(200).json(closedJob);
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
  createJob,
  getApprovedJobs,
  getMyPostedJobs,
  getPendingJobs,
  approveJob,
  rejectJob,
  updateJob,
  deleteJob,
  closeJob
};
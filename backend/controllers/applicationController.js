const Application = require('../models/Application');
const Job = require('../models/Job');

const applyToJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.user.id;
    const { notes } = req.body;

    const job = await Job.findById(jobId);
    if (!job || job.status !== 'approved') {
      return res.status(404).json({ message: 'Job not found or not open for applications' });
    }

    const alreadyApplied = await Application.findOne({ jobId, userId });
    if (alreadyApplied) {
      return res.status(400).json({ message: 'You have already applied to this job' });
    }

    const application = new Application({ jobId, userId, notes });
    const savedApplication = await application.save();
    res.status(201).json(savedApplication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getMyApplications = async(req,res)=>{
    try{
        const userId = req.user.id;
        const applications = await Application.find({ userId }).populate('jobId');
        res.status(200).json({ count: applications.length, applications });
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}

const updateApplicationStatus = async(req,res)=>{
    try{
        const id=req.params.id;
        const userId = req.user.id;
        const updatedApplicationStatus = await Application.findOneAndUpdate({_id:id, userId},req.body,{new:true}).populate('jobId');
        if(!updatedApplicationStatus){
            return res.status(404).json({message:"Application not found"});
        }
        res.status(200).json(updatedApplicationStatus);
    }
    catch(error){
        res.status(500).json({ message: error.message });   
    }
}

const deleteApplication = async(req,res)=>{
    try{
        const id=req.params.id;
        const userId = req.user.id;
        const deletedApplication = await Application.findOneAndDelete({_id:id, userId});
        if(!deletedApplication){
            return res.status(404).json({message:"Application not found"});
        }
        res.status(200).json({message:"Application deleted successfully"});
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}

module.exports = { applyToJob, getMyApplications, updateApplicationStatus, deleteApplication };
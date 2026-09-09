const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  status:{ type: String, enum: ['Applied', 'OA',"Interview", 'Offer', 'Rejected'], default: 'Applied' },
  appliedDate: { type: Date, default: Date.now },
  notes: { type: String },
});

module.exports = mongoose.model('Application', applicationSchema);
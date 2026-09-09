const express = require('express');
const router = express.Router();
const { applyToJob, getMyApplications, updateApplicationStatus, deleteApplication } = require('../controllers/applicationController');
const {authenticateToken, authorizeRoles} = require("../middlewares/authMiddleware");

router.post('/apply/:jobId', authenticateToken,authorizeRoles(['user']), applyToJob);
router.get('/myapplications', authenticateToken, getMyApplications);
router.put('/update/:id', authenticateToken, updateApplicationStatus);
router.delete('/delete/:id', authenticateToken, deleteApplication);

module.exports = router;
const express = require('express');
const router = express.Router();
const {
  createJob, getApprovedJobs, getMyPostedJobs, getPendingJobs,
  approveJob, rejectJob, updateJob, deleteJob, closeJob
} = require('../controllers/jobController');
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');

router.post("/",authenticateToken, authorizeRoles(['company','user']), createJob);
router.get("/", getApprovedJobs);
router.get("/my-posts",authenticateToken, getMyPostedJobs);
router.get("/pending",authenticateToken, authorizeRoles(['admin']), getPendingJobs);
router.patch("/:id/approve",authenticateToken, authorizeRoles(['admin']), approveJob);
router.patch("/:id/reject",authenticateToken, authorizeRoles(['admin']), rejectJob);
router.put("/:id",authenticateToken, updateJob);
router.delete("/:id",authenticateToken, deleteJob);
router.patch("/:id/close",authenticateToken, closeJob);

module.exports = router;
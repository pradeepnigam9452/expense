const express = require('express');
const router = express.Router();
const {
  getDashboard,
  getSavingAnalysis
} = require('../controllers/analysisController');
const { protect } = require('../middleware/authMiddleware');

router.get('/dashboard', protect, getDashboard);
router.get('/saving-feasibility', protect, getSavingAnalysis);

module.exports = router;
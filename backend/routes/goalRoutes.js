const express = require('express');
const router = express.Router();
const {
  setGoal,
  getActiveGoal,
  getAllGoals,
  updateGoal,
  deleteGoal
} = require('../controllers/goalController');
const { protect } = require('../middleware/authMiddleware');
const { validateGoal } = require('../middleware/validators');

router.post('/', protect, validateGoal, setGoal);
router.get('/active', protect, getActiveGoal);
router.get('/', protect, getAllGoals);
router.put('/:id', protect, updateGoal);
router.delete('/:id', protect, deleteGoal);

module.exports = router;
const express = require('express');
const router = express.Router();
const {
  addIncome,
  getAllIncome,
  getIncomeById,
  updateIncome,
  deleteIncome
} = require('../controllers/incomeController');
const { protect } = require('../middleware/authMiddleware');
const { validateIncome } = require('../middleware/validators');

router.post('/', protect, validateIncome, addIncome);
router.get('/', protect, getAllIncome);
router.get('/:id', protect, getIncomeById);
router.put('/:id', protect, updateIncome);
router.delete('/:id', protect, deleteIncome);

module.exports = router;
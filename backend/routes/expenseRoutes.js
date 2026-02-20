const express = require('express');
const router = express.Router();
const {
  addExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getExpensesByCategory
} = require('../controllers/expenseControllers');
const { protect } = require('../middleware/authMiddleware');
const { validateExpense } = require('../middleware/validators');

router.post('/', protect, validateExpense, addExpense);
router.get('/', protect, getAllExpenses);
router.get('/category/:category', protect, getExpensesByCategory);
router.get('/:id', protect, getExpenseById);
router.put('/:id', protect, updateExpense);
router.delete('/:id', protect, deleteExpense);

module.exports = router;
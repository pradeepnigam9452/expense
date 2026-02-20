const Income = require('../models/Income');
const Expense = require('../models/Expense');
const SavingGoal = require('../models/SavingGoal');
const { generateSuggestions, analyzeCategorySpending } = require('../utils/analysisEngine');

// @desc    Get dashboard summary
// @route   GET /api/analysis/dashboard
// @access  Private
exports.getDashboard = async (req, res, next) => {
  try {
    // Get current month
    const currentDate = new Date();
    const currentMonth = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;

    // Get income
    const incomes = await Income.find({ userId: req.userId });
    const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);

    // Get expenses
    const expenses = await Expense.find({ userId: req.userId });
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    // Calculate current savings
    const currentSavings = totalIncome - totalExpenses;

    // Get active goal
    const savingGoal = await SavingGoal.findOne({
      userId: req.userId,
      isActive: true
    });

    // Category breakdown
    const categoryBreakdown = await analyzeCategorySpending(req.userId);

    res.status(200).json({
      success: true,
      data: {
        totalIncome,
        totalExpenses,
        currentSavings,
        savingRate: totalIncome > 0 ? ((currentSavings / totalIncome) * 100).toFixed(2) : 0,
        savingGoal,
        categoryBreakdown,
        incomeCount: incomes.length,
        expenseCount: expenses.length
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get saving feasibility analysis
// @route   GET /api/analysis/saving-feasibility
// @access  Private
exports.getSavingAnalysis = async (req, res, next) => {
  try {
    // Get total income
    const incomes = await Income.find({ userId: req.userId });
    const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);

    // Get total expenses
    const expenses = await Expense.find({ userId: req.userId });
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    // Current monthly savings
    const currentMonthlySavings = totalIncome - totalExpenses;

    // Get active goal
    const goal = await SavingGoal.findOne({
      userId: req.userId,
      isActive: true
    });

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: 'No active saving goal found. Please set a goal first.'
      });
    }

    // Calculate required monthly savings
    const requiredMonthlySavings = goal.targetAmount / goal.duration;

    // Check if achievable
    const isAchievable = currentMonthlySavings >= requiredMonthlySavings;
    const difference = currentMonthlySavings - requiredMonthlySavings;

    // Get category breakdown for suggestions
    const categoryBreakdown = await analyzeCategorySpending(req.userId);

    // Generate suggestions
    const suggestions = generateSuggestions({
      isAchievable,
      difference,
      totalIncome,
      totalExpenses,
      currentMonthlySavings,
      requiredMonthlySavings,
      targetAmount: goal.targetAmount,
      duration: goal.duration,
      categoryBreakdown
    });

    // Calculate projections
    let projections = {};
    if (isAchievable) {
      const projectedSavings = currentMonthlySavings * goal.duration;
      projections = {
        projectedSavings,
        surplus: projectedSavings - goal.targetAmount,
        monthsToReach: Math.ceil(goal.targetAmount / currentMonthlySavings)
      };
    } else {
      projections = {
        deficit: Math.abs(difference),
        additionalMonthlySavingsNeeded: Math.abs(difference),
        suggestedDuration: Math.ceil(goal.targetAmount / currentMonthlySavings)
      };
    }

    res.status(200).json({
      success: true,
      analysis: {
        isAchievable,
        currentMonthlySavings,
        requiredMonthlySavings,
        difference,
        targetAmount: goal.targetAmount,
        duration: goal.duration,
        totalIncome,
        totalExpenses,
        savingRate: totalIncome > 0 ? ((currentMonthlySavings / totalIncome) * 100).toFixed(2) : 0,
        suggestions,
        projections,
        categoryBreakdown
      }
    });
  } catch (error) {
    next(error);
  }
};
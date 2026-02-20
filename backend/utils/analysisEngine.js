const Expense = require('../models/Expense');

// Analyze category spending
const analyzeCategorySpending = async (userId) => {
  try {
    const expenses = await Expense.find({ userId });
    
    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    
    const categoryTotals = {};
    const categories = ['Food', 'Transport', 'Bills', 'Entertainment', 'Healthcare', 'Shopping', 'Other'];
    
    categories.forEach(category => {
      const categoryExpenses = expenses.filter(exp => exp.category === category);
      const total = categoryExpenses.reduce((sum, exp) => sum + exp.amount, 0);
      const percentage = totalExpenses > 0 ? (total / totalExpenses) * 100 : 0;
      
      categoryTotals[category] = {
        total,
        percentage: percentage.toFixed(2),
        count: categoryExpenses.length
      };
    });
    
    return categoryTotals;
  } catch (error) {
    console.error('Error analyzing category spending:', error);
    return {};
  }
};

// Generate AI-like suggestions
const generateSuggestions = (data) => {
  const {
    isAchievable,
    difference,
    totalIncome,
    totalExpenses,
    currentMonthlySavings,
    requiredMonthlySavings,
    targetAmount,
    duration,
    categoryBreakdown
  } = data;

  const suggestions = [];

  if (isAchievable) {
    // Goal is achievable
    suggestions.push({
      type: 'success',
      message: `Great! You're on track to reach your goal of $${targetAmount} in ${duration} months.`,
      icon: '✅'
    });

    suggestions.push({
      type: 'projection',
      message: `At your current savings rate of $${currentMonthlySavings.toFixed(2)}/month, you'll save $${(currentMonthlySavings * duration).toFixed(2)} total.`,
      icon: '📊'
    });

    if (difference > 0) {
      suggestions.push({
        type: 'surplus',
        message: `You're saving $${difference.toFixed(2)} more than needed per month. Keep up the good work!`,
        icon: '💰'
      });
    }
  } else {
    // Goal is not achievable
    const deficit = Math.abs(difference);

    suggestions.push({
      type: 'warning',
      message: `You need to save an additional $${deficit.toFixed(2)} per month to reach your goal.`,
      icon: '⚠️'
    });

    // Analyze high-spending categories
    Object.keys(categoryBreakdown).forEach(category => {
      const categoryData = categoryBreakdown[category];
      if (parseFloat(categoryData.percentage) > 30) {
        const potentialSavings = categoryData.total * 0.3; // Suggest 30% reduction
        suggestions.push({
          type: 'category-reduction',
          category,
          message: `${category} spending is ${categoryData.percentage}% of your budget. Reducing by 30% could save $${potentialSavings.toFixed(2)}/month.`,
          icon: '🔻',
          currentSpending: categoryData.total,
          suggestedReduction: potentialSavings
        });
      }
    });

    // Non-essential spending analysis
    const nonEssentials = ['Entertainment', 'Shopping'];
    let nonEssentialTotal = 0;
    nonEssentials.forEach(category => {
      if (categoryBreakdown[category]) {
        nonEssentialTotal += categoryBreakdown[category].total;
      }
    });

    const nonEssentialPercentage = totalExpenses > 0 ? (nonEssentialTotal / totalExpenses) * 100 : 0;
    
    if (nonEssentialPercentage > 20) {
      suggestions.push({
        type: 'non-essential',
        message: `Non-essential spending (Entertainment, Shopping) is ${nonEssentialPercentage.toFixed(2)}% of your budget. Consider reducing these expenses.`,
        icon: '🎯',
        amount: nonEssentialTotal,
        potentialSavings: nonEssentialTotal * 0.5
      });
    }

    // Duration extension suggestion
    const newDuration = Math.ceil(targetAmount / currentMonthlySavings);
    if (newDuration > duration) {
      suggestions.push({
        type: 'duration',
        message: `Alternatively, extend your goal duration to ${newDuration} months to make it achievable at your current savings rate.`,
        icon: '⏱️',
        suggestedDuration: newDuration
      });
    }

    // Income increase suggestion
    if (deficit > totalExpenses * 0.3) {
      suggestions.push({
        type: 'income',
        message: `Consider exploring additional income sources to bridge the gap of $${deficit.toFixed(2)}/month.`,
        icon: '💼'
      });
    }
  }

  // General savings tips
  if (currentMonthlySavings / totalIncome < 0.2) {
    suggestions.push({
      type: 'tip',
      message: `Your savings rate is below 20%. Financial experts recommend saving at least 20% of your income.`,
      icon: '💡'
    });
  }

  return suggestions;
};

module.exports = {
  analyzeCategorySpending,
  generateSuggestions
};
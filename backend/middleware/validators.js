const validateRegister = (req, res, next) => {
    const { name, email, password } = req.body;
    const errors = [];
  
    if (!name || name.trim().length < 3) {
      errors.push('Name must be at least 3 characters');
    }
  
    if (!email || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      errors.push('Valid email is required');
    }
  
    if (!password || password.length < 6) {
      errors.push('Password must be at least 6 characters');
    }
  
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors
      });
    }
  
    next();
  };
  
  const validateLogin = (req, res, next) => {
    const { email, password } = req.body;
    const errors = [];
  
    if (!email) {
      errors.push('Email is required');
    }
  
    if (!password) {
      errors.push('Password is required');
    }
  
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors
      });
    }
  
    next();
  };
  
  const validateExpense = (req, res, next) => {
    const { title, amount, category } = req.body;
    const errors = [];
  
    if (!title || title.trim().length === 0) {
      errors.push('Title is required');
    }
  
    if (!amount || amount <= 0) {
      errors.push('Amount must be greater than 0');
    }
  
    if (!category) {
      errors.push('Category is required');
    }
  
    const validCategories = ['Food', 'Transport', 'Bills', 'Entertainment', 'Healthcare', 'Shopping', 'Other'];
    if (category && !validCategories.includes(category)) {
      errors.push('Invalid category');
    }
  
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors
      });
    }
  
    next();
  };
  
  const validateIncome = (req, res, next) => {
    const { amount, source } = req.body;
    const errors = [];
  
    if (!amount || amount <= 0) {
      errors.push('Amount must be greater than 0');
    }
  
    if (!source || source.trim().length === 0) {
      errors.push('Source is required');
    }
  
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors
      });
    }
  
    next();
  };
  
  const validateGoal = (req, res, next) => {
    const { targetAmount, duration } = req.body;
    const errors = [];
  
    if (!targetAmount || targetAmount <= 0) {
      errors.push('Target amount must be greater than 0');
    }
  
    if (!duration || duration < 1) {
      errors.push('Duration must be at least 1 month');
    }
  
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors
      });
    }
  
    next();
  };
  
  module.exports = {
    validateRegister,
    validateLogin,
    validateExpense,
    validateIncome,
    validateGoal
  };
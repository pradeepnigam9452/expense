const Income = require('../models/Income');

// @desc    Add income
// @route   POST /api/income
// @access  Private
exports.addIncome = async (req, res, next) => {
  try {
    const { amount, source, month, description } = req.body;

    const income = await Income.create({
      userId: req.userId,
      amount,
      source,
      month,
      description
    });

    res.status(201).json({
      success: true,
      message: 'Income added successfully',
      income
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all income
// @route   GET /api/income
// @access  Private
exports.getAllIncome = async (req, res, next) => {
  try {
    const { month } = req.query;
    
    const filter = { userId: req.userId };
    if (month) {
      filter.month = month;
    }

    const incomes = await Income.find(filter).sort({ createdAt: -1 });

    const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);

    res.status(200).json({
      success: true,
      count: incomes.length,
      totalIncome,
      incomes
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single income
// @route   GET /api/income/:id
// @access  Private
exports.getIncomeById = async (req, res, next) => {
  try {
    const income = await Income.findById(req.params.id);

    if (!income) {
      return res.status(404).json({
        success: false,
        message: 'Income not found'
      });
    }

    // Check ownership
    if (income.userId.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this income'
      });
    }

    res.status(200).json({
      success: true,
      income
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update income
// @route   PUT /api/income/:id
// @access  Private
exports.updateIncome = async (req, res, next) => {
  try {
    let income = await Income.findById(req.params.id);

    if (!income) {
      return res.status(404).json({
        success: false,
        message: 'Income not found'
      });
    }

    // Check ownership
    if (income.userId.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this income'
      });
    }

    income = await Income.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Income updated successfully',
      income
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete income
// @route   DELETE /api/income/:id
// @access  Private
exports.deleteIncome = async (req, res, next) => {
  try {
    const income = await Income.findById(req.params.id);

    if (!income) {
      return res.status(404).json({
        success: false,
        message: 'Income not found'
      });
    }

    // Check ownership
    if (income.userId.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this income'
      });
    }

    await Income.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Income deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
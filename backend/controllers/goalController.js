const SavingGoal = require('../models/SavingGoal');

// @desc    Set saving goal
// @route   POST /api/goals
// @access  Private
exports.setGoal = async (req, res, next) => {
  try {
    const { targetAmount, duration } = req.body;

    // Deactivate previous goals
    await SavingGoal.updateMany(
      { userId: req.userId, isActive: true },
      { isActive: false }
    );

    const goal = await SavingGoal.create({
      userId: req.userId,
      targetAmount,
      duration,
      startDate: new Date()
    });

    res.status(201).json({
      success: true,
      message: 'Saving goal set successfully',
      goal
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get active saving goal
// @route   GET /api/goals/active
// @access  Private
exports.getActiveGoal = async (req, res, next) => {
  try {
    const goal = await SavingGoal.findOne({
      userId: req.userId,
      isActive: true
    });

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: 'No active saving goal found'
      });
    }

    res.status(200).json({
      success: true,
      goal
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all goals
// @route   GET /api/goals
// @access  Private
exports.getAllGoals = async (req, res, next) => {
  try {
    const goals = await SavingGoal.find({ userId: req.userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: goals.length,
      goals
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
exports.updateGoal = async (req, res, next) => {
  try {
    let goal = await SavingGoal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: 'Goal not found'
      });
    }

    // Check ownership
    if (goal.userId.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this goal'
      });
    }

    goal = await SavingGoal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Goal updated successfully',
      goal
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
exports.deleteGoal = async (req, res, next) => {
  try {
    const goal = await SavingGoal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: 'Goal not found'
      });
    }

    // Check ownership
    if (goal.userId.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this goal'
      });
    }

    await SavingGoal.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Goal deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
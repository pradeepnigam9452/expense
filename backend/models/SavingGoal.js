const mongoose = require('mongoose');

const savingGoalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  targetAmount: {
    type: Number,
    required: [true, 'Please provide target amount'],
    min: [0, 'Target amount cannot be negative']
  },
  duration: {
    type: Number,
    required: [true, 'Please provide duration in months'],
    min: [1, 'Duration must be at least 1 month']
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Only one active goal per user
savingGoalSchema.index({ userId: 1, isActive: 1 });

module.exports = mongoose.model('SavingGoal', savingGoalSchema);
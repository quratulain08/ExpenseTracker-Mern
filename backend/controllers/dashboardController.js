const Income = require('../models/Income');
const Expense = require('../models/Expense');
const { isValidObjectId, Types } = require('mongoose');

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id; // Use _id directly (ObjectId)

    // Total Income
    const totalIncome = await Income.aggregate([
      { $match: { userId } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    // Total Expense
    const totalExpense = await Expense.aggregate([
      { $match: { userId } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    // Income in last 60 days
    const last60DaysIncomeTransactions = await Income.find({
      userId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) }
    }).sort({ date: -1 });

    const incomeLast60Days = last60DaysIncomeTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    // Expenses in last 30 days
    const last30DaysExpenseTransactions = await Expense.find({
      userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    }).sort({ date: -1 });

    const expenseLast30Days = last30DaysExpenseTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    // Recent Transactions (latest 5 incomes for now)
    const incomeTxns = await Income.find({ userId }).sort({ date: -1 }).limit(5);
    const lastTransactions = incomeTxns.map(txn => ({
      ...txn.toObject(),
      type: 'income'
    })).sort((a, b) => b.date - a.date);

    // Response
    res.json({
      totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpenses: totalExpense[0]?.total || 0,
      last30DaysExpenses: {
        total: expenseLast30Days,
        transactions: last30DaysExpenseTransactions
      },
      last60DaysIncome: {
        total: incomeLast60Days,
        transactions: last60DaysIncomeTransactions
      },
      recentTransactions: lastTransactions
    });

  } catch (error) {
    console.error("Error in getDashboardData:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

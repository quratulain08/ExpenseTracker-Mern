const Income = require('../models/Income');
const Expense = require('../models/Expense');

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id; // Ensure it's coming from middleware (auth)

    // --- Total Income ---
    const totalIncome = await Income.aggregate([
      { $match: { userId } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    // --- Total Expense ---
    const totalExpense = await Expense.aggregate([
      { $match: { userId } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    // --- Income in last 60 days ---
    const last60DaysIncomeTransactions = await Income.find({
      userId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) }
    }).sort({ date: -1 });

    const incomeLast60Days = last60DaysIncomeTransactions.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );

    // --- Expenses in last 30 days ---
    const last30DaysExpenseTransactions = await Expense.find({
      userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    }).sort({ date: -1 });

    const expenseLast30Days = last30DaysExpenseTransactions.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );

    // --- Recent Transactions (combine income + expense, latest 5) ---
    const incomeTxns = await Income.find({ userId }).sort({ date: -1 }).limit(5);
    const expenseTxns = await Expense.find({ userId }).sort({ date: -1 }).limit(5);

    const allTxns = [
      ...incomeTxns.map(txn => ({ ...txn.toObject(), type: 'income' })),
      ...expenseTxns.map(txn => ({ ...txn.toObject(), type: 'expense' })),
    ];

    const lastTransactions = allTxns
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    // --- Response ---
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

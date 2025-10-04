const Expense = require("../models/Expense");
const ExcelJS = require("exceljs");

// @desc    Add expense
// @route   POST /api/v1/expense/add
// @access  Private
exports.addExpense = async (req, res) => {
  try {
    const { icon, category, amount, date } = req.body;

    if (!category || !amount || !date) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    const expense = await Expense.create({
      userId: req.user.id,
      icon,
      category,
      amount,
      date,
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get all expenses
// @route   GET /api/v1/expense/get
// @access  Private
exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id }).sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete expense
// @route   DELETE /api/v1/expense/:id
// @access  Private
exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Download expenses as Excel
// @route   GET /api/v1/expense/downloadexcel
// @access  Private
exports.downloadExpenseExcel = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Expenses");

    worksheet.columns = [
      { header: "Category", key: "category", width: 20 },
      { header: "Amount", key: "amount", width: 15 },
      { header: "Date", key: "date", width: 20 },
      { header: "Icon", key: "icon", width: 10 },
    ];

    expenses.forEach((expense) => {
      worksheet.addRow({
        category: expense.category,
        amount: expense.amount,
        date: expense.date.toISOString().split("T")[0],
        icon: expense.icon || "",
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=expenses.xlsx");

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Upload expense icon
// @route   POST /api/v1/expense/upload-icon
// @access  Private
exports.uploadExpenseIcon = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Cloudinary automatically handles the upload and returns the URL
    const imageUrl = req.file.path;

    res.status(200).json({
      message: "Icon uploaded successfully",
      imageUrl: imageUrl,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

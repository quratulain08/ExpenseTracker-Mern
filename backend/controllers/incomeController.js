// controllers/incomeController.js
const Income = require("../models/Income");
const ExcelJS = require("exceljs");

// @desc    Add new income
// @route   POST /api/v1/income/add
// @access  Private
exports.addIncome = async (req, res) => {
  try {
    const { icon, source, amount, date } = req.body;

    if (!source || !amount || !date) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    const income = new Income({
      userId: req.user.id, // from protect middleware
      icon,
      source,
      amount,
      date,
    });

    const savedIncome = await income.save();
    res.status(201).json(savedIncome);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get all incomes for logged-in user
// @route   GET /api/v1/income/get
// @access  Private
exports.getAllIncome = async (req, res) => {
  try {
    const incomes = await Income.find({ userId: req.user.id }).sort({ date: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete income by ID
// @route   DELETE /api/v1/income/:id
// @access  Private
exports.deleteIncome = async (req, res) => {
  try {
    const income = await Income.findOne({ _id: req.params.id, userId: req.user.id });

    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }

    await income.deleteOne();
    res.status(200).json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Download income records as Excel
// @route   GET /api/v1/income/downloadexcel
// @access  Private
exports.downloadIncomeExcel = async (req, res) => {
  try {
    const incomes = await Income.find({ userId: req.user.id }).sort({ date: -1 });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Incomes");

    worksheet.columns = [
      { header: "Source", key: "source", width: 25 },
      { header: "Amount", key: "amount", width: 15 },
      { header: "Date", key: "date", width: 20 },
      { header: "Icon", key: "icon", width: 20 },
    ];

    incomes.forEach((income) => {
      worksheet.addRow({
        source: income.source,
        amount: income.amount,
        date: income.date.toISOString().split("T")[0],
        icon: income.icon || "",
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=incomes.xlsx");

    await workbook.xlsx.write(res);
    res.status(200).end();
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

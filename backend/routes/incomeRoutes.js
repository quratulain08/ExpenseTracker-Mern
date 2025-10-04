const express = require('express');
const { addIncome, getAllIncome, deleteIncome, downloadIncomeExcel, uploadIncomeIcon } = require('../controllers/incomeController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.post('/add', protect, addIncome);
router.get('/get', protect, getAllIncome);
router.delete('/:id', protect, deleteIncome);
router.get('/downloadexcel', protect, downloadIncomeExcel);
router.post('/upload-icon', protect, upload.single('icon'), uploadIncomeIcon);

module.exports = router;

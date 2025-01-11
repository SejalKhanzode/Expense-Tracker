const express = require("express");
const router = express.Router();
const {
  addExpense,
  getAllExpense,
  deleteExpense,
  editExpense,
  splitExpense,
  splitStatusToggle,
  getAllSplitExpense,
} = require("../controllers/Expense");

// Define routes
router.post("/addExpense", addExpense);
router.get("/getAllExpense", getAllExpense);
router.delete("/deleteExpense", deleteExpense);
router.put("/editExpense", editExpense);
router.post("/splitExpense", splitExpense);
router.put("/splitStatusToggle", splitStatusToggle);
router.get("/getAllSplitExpense", getAllSplitExpense);

module.exports = router;

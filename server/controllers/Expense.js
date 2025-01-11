const expense = require("../models/ExpenseModel");

exports.addExpense = async (req, res) => {
  try {
    const { userId, amount, category, description } = req.body;
    if (!userId || !amount || !category || !description) {
      res.status(400).json({
        success: false,
        messsage: "All fields are reaquired",
      });
    }
    const newExpense = await expense.create({
      userId: userId,
      amount: amount,
      category: category,
      description: description,
    });
    res.status(200).json({
      success: true,
      data: newExpense,
      messsage: "Expense added successfully",
    });
  } catch (error) {
    console.log("error>>", error);
    res.status(500).json({
      success: false,
      messsage: error.messsage,
    });
  }
};

exports.getAllExpense = async (req, res) => {
    try {
        const {userId} = req.body;
        const expenses = await expense.find({
            userId
        });
        res.status(200).json({
            success: true,
            data:expenses,
        message:"All expense fetched successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteExpense = async (req, res) => {
    try {
        await expense.findOneAndDelete({
            _id: req.body.expenseId,
        });
        res.status(200).json({
            success:true,
            message: "Expense deleted"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.editExpense = async (req, res) => {
    try {
        const updatedExpense = await expense.findOneAndUpdate(
            { _id: req.body.expenseId },
            req.body.payload,
            { new: true } 
        );
        res.status(200).json({ success: true, message: "Edit successful", updatedExpense });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.splitExpense = async (req, res) => {
    try {
        await expense.findOneAndUpdate(
            { _id: req.body.expenseId },
            { $push: { split: req.body.payload } } // Ensure split is defined in the schema
        );
        res.status(200).send("Split successful");
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.splitStatusToggle = async (req, res) => {
    try {
        const { splitId, status } = req.body;
       const expenses=await expense.findOneAndUpdate(
            { "split._id": splitId },
            { $set: { "split.$.paid": status } }
        );
        return res.status(200).json(
            {
                success:true,
                message:""
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAllSplitExpense = async (req, res) => {
    try {
        const expenses = await expense.find({
            "split.email": req.body.userId, 
            "split.paid": false,
        });
        res.status(200).json({
            success:true,
            data:expenses,
            message:"data fetched successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};
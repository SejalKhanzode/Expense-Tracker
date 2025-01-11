const mongoose = require("mongoose")

const expenseSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		amount: {
			type: Number,
			required: [true, "amount is required"],
		},
		category: {
			type: String,
			required: [true, "category is required"],
		},
		description: {
			type: String,
			required: [true, "description is required"],
		},
		// split: [
		// 	{
		// 		email: String,
		// 		name: String,
		// 		paid: Boolean,
		// 	}
		// ]
	},
	
)

const expenseModel = mongoose.model("expenses", expenseSchema)
module.exports = expenseModel
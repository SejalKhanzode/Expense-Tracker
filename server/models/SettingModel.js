const mongoose = require("mongoose")

const settingSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		budget: {
			type: Number,
			default: 0,
		},
		categories: {
			type: [String],
			default: ["Credit", "Debit"],
		},
	},
	{ timestamps: true }
)

const settingModel = mongoose.model("settings", settingSchema)
module.exports = settingModel
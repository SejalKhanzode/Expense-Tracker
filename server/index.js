const express = require("express")
const cors = require("cors")

const dotenv = require("dotenv")
const database = require("./config/database")
const userRoute = require("./routes/userRoute")
const settingRoute = require("./routes/settingRoute")
const expenseRoute = require("./routes/expenseRoute")

dotenv.config()
database.connect()

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/auth", userRoute)
app.use("/api/expenses", expenseRoute)
app.use("/api/settings", settingRoute)

const PORT = 8080 || process.env.PORT

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
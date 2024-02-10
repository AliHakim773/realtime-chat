import dotenv from "dotenv"
import express from "express"
import connectToMongoDB from "./configs/db.config.js"
import siteRoutes from "./routes/index.routes.js"

dotenv.config()

const app = express()

siteRoutes(app)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)

  connectToMongoDB()
})

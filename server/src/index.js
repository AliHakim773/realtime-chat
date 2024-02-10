import { config } from "dotenv"
import express, { json } from "express"
import connectToMongoDB from "./configs/db.config.js"
import siteRoutes from "./routes/index.routes.js"
import errorMiddleware from "./middlewares/error.middleware.js"
import cookieParser from "cookie-parser"

config()

const app = express()
app.use(json())
app.use(cookieParser())

siteRoutes(app)
app.use(errorMiddleware)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)

  connectToMongoDB()
})

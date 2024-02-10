import mongoose from "mongoose"

const connectToMongoDB = async () => {
  mongoose.connect(process.env.MONGODB_URL)

  const connection = mongoose.connection
  connection.on("error", (error) => {
    console.log("Error connecting to MongoDB: ", error)
  })

  connection.once("open", () => {
    console.log("Connected to MongoDB...")
  })
}

export default connectToMongoDB

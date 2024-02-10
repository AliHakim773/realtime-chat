import jwt from "jsonwebtoken"
import User from "../models/user.model"
import errorHandler from "../utils/errorHandler"

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.access_token
  if (!token) return next(errorHandler(403, "Unauthorized"))
  else {
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET)
      const user = await User.findOne({ _id: decode._id }).select("-password")
      req.user = user
      next()
    } catch {
      next(errorHandler(403, "Token expired"))
    }
  }
}

export default authMiddleware

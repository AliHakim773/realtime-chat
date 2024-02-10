import errorHandler from "../util/errorHandler.js"
import generateToken from "../util/generateToken.js"
import setCookie from "../util/setCookie.js"
import User from "../models/user.model.js"

export const register = async (req, res, next) => {
  const { fullName, username, password, confirmPassword, gender } = req.body
  try {
    if (password !== confirmPassword)
      return next(errorHandler(400, "Passwords don't match"))

    const user = await User.findOne({ username })
    if (user) return next(errorHandler(400, "Username already exist"))

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

    const newUser = new User({
      fullName,
      username,
      password,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    })
    await newUser.save()

    const token = generateToken(newUser)
    setCookie(token, res)

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      profilePic: newUser.profilePic,
    })
  } catch (e) {
    next(e)
  }
}

export const login = async (req, res, next) => {
  res.send("login")
}

export const logout = async (req, res, next) => {
  res.send("logout")
}

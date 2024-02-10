import errorHandler from "../util/errorHandler.js"
import generateToken from "../util/generateToken.js"
import setCookie from "../util/setCookie.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

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

    const [token, userDetails] = generateToken(newUser)
    setCookie(token, res)

    res.status(201).send({
      ...userDetails,
    })
  } catch (e) {
    next(e)
  }
}

export const login = async (req, res, next) => {
  const { username, password } = req.body
  try {
    const validUser = await User.findOne({ username })
    if (!validUser) return next(errorHandler(401, "Wrong Credentials!"))

    const isValidPassword = bcrypt.compareSync(password, validUser.password)
    if (!isValidPassword) return next(errorHandler(401, "Wrong Credentials!"))

    const [token, userDetails] = generateToken(validUser)
    setCookie(token, res)

    res.status(200).send({
      ...userDetails,
    })
  } catch (error) {
    next(error)
  }
}

export const logout = async (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .send({ message: "User has been logged out" })
  } catch (error) {
    next(error)
  }
}

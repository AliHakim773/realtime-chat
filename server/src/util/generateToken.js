import jwt from "jsonwebtoken"

const generateToken = (user) => {
  const { password: hashedPassword, ...userDetails } = user._doc
  const token = jwt.sign(userDetails, process.env.JWT_SECRET, {
    expiresIn: "15d",
  })

  return [token, userDetails]
}

export default generateToken

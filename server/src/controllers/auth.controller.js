export const register = async (req, res, next) => {
  const { fullname, username, password, confirmpassword, gender } = req.body
  try {
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

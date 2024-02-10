const errorMiddleware = (error, req, res, next) => {
  const statusCode = error.statusCode || 500
  const message = error.message || "Internal Server Error"
  return res.status(statusCode).send({ success: false, message })
}

export default errorMiddleware

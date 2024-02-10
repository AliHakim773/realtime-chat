import authRoutes from "./auth.routes.js"

const siteRoutes = (app) => {
  // Auth Routes
  app.use("/api/v1/auth", authRoutes)
}

export default siteRoutes

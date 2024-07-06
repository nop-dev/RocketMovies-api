const { Router } = require("express");

const usersRoutes = require("./users.routes")
const movie_notesRouter = require("./movie_notes.routes")

const routes = Router();

routes.use("/users", usersRoutes)
routes.use("/user/:id", movie_notesRouter)

module.exports = routes;
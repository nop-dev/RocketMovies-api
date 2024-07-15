const { Router } = require("express");

const usersRoutes = require("./users.routes")
const movie_notesRouter = require("./movie_notes.routes")
const tags_notesRouter = require("./tags_notes.routes")

const routes = Router();

routes.use("/users", usersRoutes)
routes.use("/notes", movie_notesRouter)
routes.use("/notes/tags", tags_notesRouter)

module.exports = routes;
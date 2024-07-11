const { Router } = require("express");

const usersRoutes = require("./users.routes")
const movie_notesRouter = require("./movie_notes.routes")
const tags_notesRouter = require("./tags_notes.routes.js")

const routes = Router();

routes.use("/users", usersRoutes)
routes.use("/usernotes", movie_notesRouter)
routes.use("/usernotes", tags_notesRouter)

module.exports = routes;
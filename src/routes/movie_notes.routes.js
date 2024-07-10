const { Router } = require("express");

const MovieNotesController = require("../controllers/movie_notesController");

const movieNotesRoutes = Router();

const movieNotesController = new MovieNotesController();

movieNotesRoutes.post("/:id/createNote", movieNotesController.create)

module.exports = movieNotesRoutes;
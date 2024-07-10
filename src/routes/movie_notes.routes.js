const { Router } = require("express");

const MovieNotesController = require("../controllers/movie_notesController");

const movieNotesRoutes = Router();

const movieNotesController = new MovieNotesController();

movieNotesRoutes.post("/:user_id/createNote", movieNotesController.create)
movieNotesRoutes.put("/updateNote/:note_id", movieNotesController.update)
movieNotesRoutes.delete("/deleteNote/:note_id", movieNotesController.delete)

module.exports = movieNotesRoutes;
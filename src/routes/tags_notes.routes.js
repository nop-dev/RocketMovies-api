const { Router } = require("express");

const tagsNotesController = require("../controllers/tags_notesController.js");

const tagsRoutes = Router();

const tagsController = new tagsNotesController();

tagsRoutes.post("/:user_id/createtag/:note_id", tagsController.create)
tagsRoutes.put("/:user_id/updatetag/:tag_id", tagsController.update)
tagsRoutes.delete("/:user_id/deletetag/:tag_id", tagsController.delete)

module.exports = tagsRoutes;
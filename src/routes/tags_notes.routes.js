const { Router } = require("express");

const tags_notesController = require("../controllers/tags_notesController.js");

const tagsRoutes = Router();

const tagsController = new tags_notesController();

tagsRoutes.post("/:user_id/create", tagsController.create);
tagsRoutes.put("/:user_id/update/:tag_id", tagsController.update);
tagsRoutes.delete("/:user_id/delete/:tag_id", tagsController.delete);

module.exports = tagsRoutes;
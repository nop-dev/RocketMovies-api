const knex = require("../database/knex")
const AppError = require("../utils/AppError");
const { compare } = require("bcryptjs");

class tags_notesController {
    async create(req, res) {
        const { user_id, note_id } = req.params;
        const { tagName } = req.body;

        try {
            if(!tagName) {
                throw new AppError("Você precisa digitar um nome para sua nova tag...");
            };

            const user = await knex('users').where({ id : user_id }).first();

            if(!user) {
                throw new AppError("Usuário do id especificado não foi encontrado...");
            };

            const note = await knex('movie_notes').where({ id : note_id });

            if(!note) {
                throw new AppError("Essa nota não existe...");
            };

            let userIdFromNote = note[0].user_id

            console.log(userIdFromNote)

            if(userIdFromNote != user_id) {
                throw new AppError("Você não é o dono da nota que você quer criar uma tag...")
            }

            await knex("movie_tags").insert({
                note_id : note_id,
                user_id : user_id,
                name: tagName
            });

            res.status(201).json();

        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                console.error("Erro ao criar a tag:", error);
                res.status(500).json({ error: "Ocorreu um erro ao processar a requisição." });
            };
        };
    }

    async update(req, res) {

    }

    async delete(req, res) {

    }
};

module.exports = tags_notesController;
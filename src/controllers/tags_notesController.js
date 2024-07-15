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

            const userIdFromNote = note[0].user_id

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
        const { user_id, tag_id } = req.params;
        const { newTagName } = req.body;

        try {
            const user = await knex('users').where({ id : user_id }).first();

            if(!user) {
                throw new AppError("Usuário do id especificado não foi encontrado...");
             };

             const tag = await knex('movie_tags').where({ id : tag_id })

             if(!tag) {
                throw new AppError("Sua tag não foi encontrada...")
             }

            if(!newTagName) {
                throw new AppError("Você enviou uma requisição vazia...");
            };

            const userIdFromTag = tag[0].user_id

            if(userIdFromTag != user_id) {
                throw new AppError("Você não é o dono da tag que você quer atualizar...")
            }

            await knex('movie_tags').where({ id : tag_id }).update({
                name : newTagName
            });

            res.status(200).json({ message: "Tag atualizada com sucesso." });

        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                console.error("Erro ao atualizar a tag:", error);
                res.status(500).json({ error: "Ocorreu um erro ao processar a requisição." });
            };
        };
    }

    async delete(req, res) {
        const { user_id, tag_id } = req.params;

        try {
            const tag = await knex('movie_tags').where({ id : tag_id })

            if(tag.length === 0) {
                throw new AppError("Sua tag não foi encontrada...");
            }

            const user = await knex('users').where({ id : user_id }).first();

            if(!user) {
                throw new AppError("Usuário do id especificado não foi encontrado...");
             };

            const userIdFromTag = tag[0].user_id

            if(userIdFromTag != user_id) {
                throw new AppError("Você não é o dono da tag que você quer deletar...")
            }

            await knex('movie_tags').where({id : tag_id }).delete();

            res.status(202).json({ message: "Tag deletada com sucesso." });

        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                console.error("Erro ao deletar a tag:", error);
                res.status(500).json({ error: "Ocorreu um erro ao processar a requisição." });
            };
        };
        
    }
};

module.exports = tags_notesController;
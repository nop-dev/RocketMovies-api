const knex = require("../database/knex")
const AppError = require("../utils/AppError");
const { compare } = require("bcryptjs");

class movie_notesController {
    async create(req, res) {
        const { title, description, rating } = req.body;
        const { user_id } = req.params;

        try {
            const user = await knex('users').where({ id : user_id }).first();
            if(!user) {
                throw new AppError("Usuário do id especificado não foi encontrado...")
            }

            if(!user_id) {
                throw new AppError("Você não tem permissão para criar notas, faça seu login...")
            }

            if(!title) {
                throw new AppError("O título da nota é obrigatória...")
            }
        
            if(!description) {
                throw new AppError("A descrição da nota é obrigatória...")
            }
        
            if(!rating) {
                throw new AppError("A sua nota para o filme é obrigatória")
            }

            await knex("movie_notes").insert({
                user_id: user_id,
                title: title,
                description: description,
                rating: rating
            })

            res.status(201).json();
                
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                console.error("Erro ao atualizar usuário:", error);
                res.status(500).json({ error: "Ocorreu um erro ao processar a requisição." });
            }
        }
        
    };

    async update(req, res) {
        let { title, description, rating, user_id, password } = req.body;
        const { note_id } = req.params;

        try {
            const user = await knex('users').where({ id : user_id }).first();

            if(!user) {
                throw new AppError("ID do usuário informado é inválido ou inexistente...");
            };

            const note = await knex('movie_notes').where({id : note_id}).first();

            if(user_id != note.user_id) {
                throw new AppError("Você não tem permissão para modificar essa nota. Ela não te pertence...");
            };

            if(!password) {
                throw new AppError("A senha não foi informada. Nenhuma alteração feita. Tente novamente...");
            };

            const checkPassword = await compare(password, user.password);

            if(!checkPassword) {
                throw new AppError("A senha digitada não está correta. Nenhuma alteração feita. Tente novamente...");
            };

            if(!note) {
                throw new AppError("A nota requerida não foi encontrada. Tente novamente...");
            };

            title = title || note.title;
            description = description || note.description;
            rating = rating || note.rating;

            await knex('movie_notes').where({id : note_id}).update({
                title,
                description,
                rating
            });

            res.status(200).json({ message: "Nota atualizada com sucesso." });
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                console.error("Erro ao atualizar usuário:", error);
                res.status(500).json({ error: "Ocorreu um erro ao processar a requisição." });
            };
        };
    };

    async delete(req, res) {
        const { note_id } = req.params;
        const { user_id, password} = req.body;

        try {
            if(!user_id) {
                throw new AppError("O ID do usuário dono da nota não foi informado...");
            };

            if(!password) {
                throw new AppError("A senha do usuário dono da nota não foi informada...");
            };

            const note = await knex('movie_notes').where({id : note_id}).first();

            if(!note) {
                throw new AppError("A nota requerida não existe...");
            };

            const user = await knex('users').where({ id : user_id }).first();

            if(!user) {
                throw new AppError("ID do usuário informado é inválido ou inexistente...");
            };

            if(user_id != note.user_id) {
                throw new AppError("Você não tem permissão para deletar essa nota. Ela não te pertence...");
            };

            const checkPassword = compare(password, user.password);

            if(!checkPassword) {
                throw new AppError("A senha digitada não está correta. Nenhuma alteração feita. Tente novamente...");
            };

            await knex("movie_notes").where({ id : note_id }).delete();

            res.status(202).json({ message: "Nota deletada com sucesso." });

        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                console.error("Erro ao atualizar usuário:", error);
                res.status(500).json({ error: "Ocorreu um erro ao processar a requisição." });
            };
        };
    };
}

module.exports = movie_notesController;
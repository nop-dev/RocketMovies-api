const knex = require("../database/knex")
const AppError = require("../utils/AppError");

class movie_notesController {
    async create(req, res) {
        const { title, description, rating } = req.body;
        const { id } = req.params;

        try {
            const user = await knex('users').where({ id : id }).first();
            if(!user) {
                throw new AppError("Usuário do id especificado não foi encontrado...")
            }

            if(!id) {
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
                user_id: id,
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
};

module.exports = movie_notesController;
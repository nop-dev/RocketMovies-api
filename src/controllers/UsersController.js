const knex = require("../database/knex");
const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");

class UsersController {
    async create(req, res) {
        const { name, email, password } = req.body;

        if (!name) {
            throw new AppError("O nome é obrigatório...");
        }

        if(!email) {
            throw new AppError("O email é obrigatório...");
        }

        if(!password) {
            throw new AppError("A senha é obrigatória...");
        }

        const hashedPassword = await hash(password, 8);

        await knex("users").insert({
            name: name,
            email: email,
            password: hashedPassword
        });

        res.status(201).json();
    }

    async update(req, res) {
        try {
            let { name, email, new_password, old_password } = req.body;
            const { id } = req.params;

            const user = await knex('users').where({ id: id }).first();

            if (!user) {
                throw new AppError("Usuário não encontrado.", 404);
            }

            if (email !== user.email) {
                const userWithUpdatedEmail = await knex('users').where({ email: email }).first();
                if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
                    throw new AppError("Este email já está em uso.", 400);
                }
            }

            user.name = name ?? user.name;
            user.email = email ?? user.email;

            if (new_password && !old_password) {
                throw new AppError("Você precisa informar a senha antiga para definir uma nova senha.", 400);
            }

            if (new_password && old_password) {
                const checkOldPassword = await compare(old_password, user.password);
                if (!checkOldPassword) {
                    throw new AppError("A senha antiga não está correta.", 400);
                }

                const updatedpassword = await hash(new_password, 8);
                user.password = updatedpassword;
            }

            await knex("users").where({ id: id }).update({
                name: user.name,
                email: user.email,
                password: user.password
            });

            res.status(200).json({ message: "Usuário atualizado com sucesso." });
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ error: error.message });
            } else {
                console.error("Erro ao atualizar usuário:", error);
                res.status(500).json({ error: "Ocorreu um erro ao processar a requisição." });
            }
        }
    }

    async delete(req, res) {
        const { id } = req.params;
        const { password } = req.body;

        try {
            if(!password) {
                throw new AppError("A senha do usuário a ser deletado não foi informada...");
            };

            const user = await knex('users').where({id : id}).first();

            if(!user) {
                throw new AppError("Usuário a ser deletado não encontrado...");
            };

            const checkPassword = await compare(password, user.password);

            if(!checkPassword) {
                throw new AppError("A senha digitada não está correta, usuário não deletado. Tente novamente...");
            };

            await knex("users").where({ id : id }).delete();

            res.status(202).json({ message: "Usuário deletado com sucesso." });

            } catch (error) {
                if (error instanceof AppError) {
                    res.status(error.statusCode).json({ error: error.message });
                } else {
                    console.error("Erro ao deletar usuário:", error);
                    res.status(500).json({ error: "Ocorreu um erro ao processar a requisição.   " });
                };
            };
        };
    };

module.exports = UsersController;
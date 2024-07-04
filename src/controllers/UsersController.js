const knex = require("../database/knex");
const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");

class UsersController {
    async create(req, res) {
        const { name, email, password } = req.body;

        if (!name) {
            throw new AppError("O nome é obrigatório...");
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
        let { name, email, new_password, old_password } = req.body;
        const { id } = req.params;

        const user = await knex('users').where({ id: id }).first();

        if (!user) {
            throw new AppError("Usuário não encontrado...");
        }

        if (email !== user.email) {
            const userWithUpdatedEmail = await knex('users').where({ email: email }).first();
            if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
                throw new AppError("Este email já está em uso...");
            }
        }

        user.name = name ?? user.name;
        user.email = email ?? user.email;

        if (new_password && !old_password) {
            throw new AppError("Você precisa informar a senha antiga para definir uma nova senha...");
        }

        if (new_password && old_password) {
            const checkOldPassword = await compare(old_password, user.password);
            if (!checkOldPassword) {
                throw new AppError("A senha antiga não está correta.");
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
    }
}

module.exports = UsersController;
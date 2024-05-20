const { hash } = require("bcryptjs");
const AppError = require("../utils/AppError");

class UsersController {
    async create(req, res) {
        const { name, email, password } = req.body;

        if(!name) {
            throw new AppError("O nome é obrigatório...")
        }

        console.log(name)

        const hashedPassword = await hash(password, 12)
        
        res.status(201).json();

        return res.status(201).json();
    }
}

module.exports = UsersController
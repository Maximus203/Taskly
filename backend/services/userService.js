const UserRepository = require('../repositories/userRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserService = {
    async getAll() {
        return await UserRepository.findAll();
    },

    async getById(id) {
        return await UserRepository.findById(id);
    },

    async create(data) {
        return await UserRepository.create(data);
    },

    async update(id, data) {
        return await UserRepository.update(id, data);
    },

    async remove(id) {
        return await UserRepository.delete(id);
    },

    async signup(data) {
        data.role_id = 2;
        const user = await UserRepository.create(data);
        const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { user, token };
    },

    async login(credentials) {
        const user = await UserRepository.findByEmail(credentials.email);
        if (user && bcrypt.compareSync(credentials.mot_de_passe, user.mot_de_passe)) {
            const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return { token };
        }
        return null;
    }
};

module.exports = UserService;

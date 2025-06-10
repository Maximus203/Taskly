const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserService = {
    async getAll() {
        return await User.findAll();
    },

    async getById(id) {
        return await User.findByPk(id);
    },

    async create(data) {
        return await User.create(data);
    },

    async update(id, data) {
        const user = await User.findByPk(id);
        if (!user) return null;
        await user.update(data);
        return user;
    },

    async remove(id) {
        const user = await User.findByPk(id);
        if (!user) return null;
        await user.destroy();
        return user;
    },

    async signup(data) {
        data.role_id = 2;
        const user = await User.create(data);
        const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { user, token };
    },

    async login(credentials) {
        const user = await User.findOne({ where: { email: credentials.email } });
        if (user && bcrypt.compareSync(credentials.mot_de_passe, user.mot_de_passe)) {
            const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return { token };
        }
        return null;
    }
};

module.exports = UserService;

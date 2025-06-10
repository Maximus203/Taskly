const User = require('../models/user');

const UserRepository = {
    async findAll() {
        return await User.findAll();
    },

    async findById(id) {
        return await User.findByPk(id);
    },

    async findByEmail(email) {
        return await User.findOne({ where: { email } });
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

    async delete(id) {
        const user = await User.findByPk(id);
        if (!user) return null;
        await user.destroy();
        return user;
    }
};

module.exports = UserRepository;

const Task = require('../models/task');

const TaskService = {
    async getAll() {
        return await Task.findAll();
    },

    async getById(id) {
        return await Task.findByPk(id);
    },

    async create(data) {
        return await Task.create(data);
    },

    async update(id, data) {
        const task = await Task.findByPk(id);
        if (!task) return null;
        await task.update(data);
        return task;
    },

    async remove(id) {
        const task = await Task.findByPk(id);
        if (!task) return null;
        await task.destroy();
        return task;
    }
};

module.exports = TaskService;

const TaskRepository = require('../repositories/taskRepository');

const TaskService = {
    async getAll() {
        return await TaskRepository.findAll();
    },

    async getById(id) {
        return await TaskRepository.findById(id);
    },

    async create(data) {
        return await TaskRepository.create(data);
    },

    async update(id, data) {
        return await TaskRepository.update(id, data);
    },

    async remove(id) {
        return await TaskRepository.delete(id);
    }
};

module.exports = TaskService;

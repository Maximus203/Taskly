const ProjectRepository = require('../repositories/projectRepository');

const { translateStatus, translateImportance } = require('../utils/translationHelper');

const ProjectService = {
    async getAll() {
        return await ProjectRepository.findAll();
    },

    async getById(id) {
        const project = await ProjectRepository.findById(id);
        if (project) {
            project.status = translateStatus(project.status);
            project.importance = translateImportance(project.importance);
        }
        return project;
    },

    async create(data) {
        return await ProjectRepository.create(data);
    },

    async update(id, data) {
        return await ProjectRepository.update(id, data);
    },

    async remove(id) {
        return await ProjectRepository.delete(id);
    }
};

module.exports = ProjectService;

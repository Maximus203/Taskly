const Project = require('../models/project');
const { translateStatus, translateImportance } = require('../utils/translationHelper');

const ProjectService = {
    async getAll() {
        return await Project.findAll();
    },

    async getById(id) {
        const project = await Project.findByPk(id);
        if (project) {
            project.status = translateStatus(project.status);
            project.importance = translateImportance(project.importance);
        }
        return project;
    },

    async create(data) {
        return await Project.create(data);
    },

    async update(id, data) {
        const project = await Project.findByPk(id);
        if (!project) return null;
        await project.update(data);
        return project;
    },

    async remove(id) {
        const project = await Project.findByPk(id);
        if (!project) return null;
        await project.destroy();
        return project;
    }
};

module.exports = ProjectService;

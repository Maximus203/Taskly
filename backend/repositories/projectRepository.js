const Project = require('../models/project');

const ProjectRepository = {
    async findAll() {
        return await Project.findAll();
    },

    async findById(id) {
        return await Project.findByPk(id);
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

    async delete(id) {
        const project = await Project.findByPk(id);
        if (!project) return null;
        await project.destroy();
        return project;
    }
};

module.exports = ProjectRepository;

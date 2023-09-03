// backend/controllers/projectController.js
const Project = require('../models/project');
const { translateStatus, translateImportance } = require('../utils/translationHelper');
const projectController = {};

// Obtenir tous les projets
projectController.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.findAll();
        res.status(200).json({ success: true, message: "Projets récupérés avec succès", data: projects });
    } catch (error) {
        res.status(500).json({ success: false, message: "Erreur lors de la récupération des projets." });
    }
};

// Obtenir un projet par ID
projectController.getProjectById = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);
        if (project) {
            // Traduire le statut et l'importance en français pour la réponse
            project.status = translateStatus(project.status);
            project.importance = translateImportance(project.importance);
            res.status(200).json({ success: true, message: "Projet récupéré avec succès", data: project });
        } else {
            res.status(404).json({ success: false, message: "Projet non trouvé." });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Erreur lors de la récupération du projet." });
    }
};

// Créer un nouveau projet
projectController.createProject = async (req, res) => {
    try {
        const project = await Project.create(req.body);
        res.status(201).json({ success: true, message: "Projet créé avec succès", data: project });
    } catch (error) {
        res.status(500).json({ success: false, message: "Erreur lors de la création du projet." });
    }
};

// Mettre à jour un projet
projectController.updateProject = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);
        if (project) {
            await project.update(req.body);
            res.status(200).json({ success: true, message: "Projet mis à jour avec succès", data: project });
        } else {
            res.status(404).json({ success: false, message: "Projet non trouvé." });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Erreur lors de la mise à jour du projet." });
    }
};

// Supprimer un projet
projectController.deleteProject = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);
        if (project) {
            await project.destroy();
            res.status(200).json({ success: true, message: "Projet supprimé avec succès." });
        } else {
            res.status(404).json({ success: false, message: "Projet non trouvé." });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Erreur lors de la suppression du projet." });
    }
};

module.exports = projectController;

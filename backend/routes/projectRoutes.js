// backend/routes/projectRoutes.js
const express = require('express');
const router = express.Router();

const projectController = require('../controllers/projectController');
const authMiddleware = require('../middlewares/authMiddleware');
const projectValidation = require('../middlewares/projectValidation'); // Importation du middleware de validation
const adaptiveUpload = require('../middlewares/uploadMiddleware');

// Récupération de tous les projets
router.get('/', authMiddleware.verifyToken, projectController.getAllProjects);

// Récupération d'un projet par ID
router.get('/:id', authMiddleware.verifyToken, projectController.getProjectById);

// Création d'un nouveau projet
router.post('/',
    authMiddleware.verifyToken,
    adaptiveUpload("project"),
    projectValidation.createProjectRules(),
    projectValidation.validate,
    projectController.createProject
);

// Mise à jour d'un projet
router.put('/:id',
    authMiddleware.verifyToken,
    authMiddleware.verifyOwnership,
    adaptiveUpload("project"),
    projectValidation.updateProjectRules(),
    projectValidation.validate,
    projectController.updateProject
);

// Suppression d'un projet
router.delete('/:id', authMiddleware.verifyToken, authMiddleware.verifyOwnership, projectController.deleteProject);

module.exports = router;

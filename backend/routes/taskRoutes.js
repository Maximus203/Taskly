// backend/routes/taskRoutes.js
const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');
const taskValidation = require('../middlewares/taskValidation'); // Importation du middleware de validation

// Récupération de toutes les tâches
router.get('/', authMiddleware.verifyToken, taskController.getAllTasks);

// Récupération d'une tâche par ID
router.get('/:id', authMiddleware.verifyToken, taskController.getTaskById);

// Création d'une nouvelle tâche
router.post('/',
    authMiddleware.verifyToken,
    taskValidation.createTaskRules(), // Ajout du middleware de validation
    taskValidation.validate, // Valider les données entrantes
    taskController.createTask
);

// Mise à jour d'une tâche
router.put('/:id',
    authMiddleware.verifyToken,
    authMiddleware.verifyOwnership,
    taskValidation.updateTaskRules(), // Ajout du middleware de validation
    taskValidation.validate, // Valider les données entrantes
    taskController.updateTask
);

// Suppression d'une tâche
router.delete('/:id', authMiddleware.verifyToken, authMiddleware.verifyOwnership, taskController.deleteTask);

module.exports = router;

// backend/routes/taskRoutes.js
const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');

// Récupération de toutes les tâches
router.get('/', authMiddleware.verifyToken, taskController.getAllTasks);

// Récupération d'une tâche par ID
router.get('/:id', authMiddleware.verifyToken, taskController.getTaskById);

// Création d'une nouvelle tâche
router.post('/', authMiddleware.verifyToken, taskController.createTask);

// Mise à jour d'une tâche
router.put('/:id', authMiddleware.verifyToken, authMiddleware.verifyOwnership, taskController.updateTask);

// Suppression d'une tâche
router.delete('/:id', authMiddleware.verifyToken, authMiddleware.verifyOwnership, taskController.deleteTask);

module.exports = router;

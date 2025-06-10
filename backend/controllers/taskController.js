// backend/controllers/taskController.js

const TaskService = require('../services/taskService');

const taskController = {};

// Obtenir toutes les tâches
taskController.getAllTasks = async (req, res) => {
    try {
        const tasks = await TaskService.getAll();
        res.success("Tâches récupérées avec succès", tasks);
    } catch (error) {
        res.fail("Erreur lors de la récupération des tâches.", [], 500);
    }
};

// Obtenir une tâche par ID
taskController.getTaskById = async (req, res) => {
    try {
        const task = await TaskService.getById(req.params.id);
        if (task) {
            res.success("Tâche récupérée avec succès", task);
        } else {
            res.fail("Tâche non trouvée.", [], 404);
        }
    } catch (error) {
        res.fail("Erreur lors de la récupération de la tâche.", [], 500);
    }
};

// Créer une nouvelle tâche
taskController.createTask = async (req, res) => {
    try {
        const task = await TaskService.create(req.body);
        res.status(201);
        res.success("Tâche créée avec succès", task);
    } catch (error) {
        res.fail("Erreur lors de la création de la tâche.", [], 500);
    }
};

// Mettre à jour une tâche
taskController.updateTask = async (req, res) => {
    try {
        const task = await TaskService.update(req.params.id, req.body);
        if (task) {
            res.success("Tâche mise à jour avec succès", task);
        } else {
            res.fail("Tâche non trouvée.", [], 404);
        }
    } catch (error) {
        res.fail("Erreur lors de la mise à jour de la tâche.", [], 500);
    }
};

// Supprimer une tâche
taskController.deleteTask = async (req, res) => {
    try {
        const task = await TaskService.remove(req.params.id);
        if (task) {
            res.success("Tâche supprimée avec succès.");
        } else {
            res.fail("Tâche non trouvée.", [], 404);
        }
    } catch (error) {
        res.fail("Erreur lors de la suppression de la tâche.", [], 500);
    }
};

module.exports = taskController;

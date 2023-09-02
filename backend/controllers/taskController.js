// backend/controllers/taskController.js

const Task = require('../models/task');

const taskController = {};

// Obtenir toutes les tâches
taskController.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des tâches." });
    }
};

// Obtenir une tâche par ID
taskController.getTaskById = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (task) {
            res.status(200).json(task);
        } else {
            res.status(404).json({ message: "Tâche non trouvée." });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de la tâche." });
    }
};

// Créer une nouvelle tâche
taskController.createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création de la tâche." });
    }
};

// Mettre à jour une tâche
taskController.updateTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (task) {
            await task.update(req.body);
            res.status(200).json(task);
        } else {
            res.status(404).json({ message: "Tâche non trouvée." });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour de la tâche." });
    }
};

// Supprimer une tâche
taskController.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (task) {
            await task.destroy();
            res.status(200).json({ message: "Tâche supprimée avec succès." });
        } else {
            res.status(404).json({ message: "Tâche non trouvée." });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression de la tâche." });
    }
};

module.exports = taskController;

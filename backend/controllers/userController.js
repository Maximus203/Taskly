// backend/controllers/userController.js

const UserService = require('../services/userService');

const userController = {};


userController.getAllUsers = async (req, res) => {
    try {
        const users = await UserService.getAll();
        res.status(200).json({ success: true, message: "Utilisateurs récupérés avec succès", data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: "Erreur lors de la récupération des utilisateurs." });
    }
};

userController.getUserById = async (req, res) => {
    try {
        const user = await UserService.getById(req.params.id);
        if (user) {
            res.status(200).json({ success: true, message: "Utilisateur récupéré avec succès", data: user });
        } else {
            res.status(404).json({ success: false, message: "Utilisateur non trouvé." });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Erreur lors de la récupération de l'utilisateur." });
    }
};

userController.createUser = async (req, res) => {
    try {
        const user = await UserService.create(req.body);
        res.status(201).json({ success: true, message: "Utilisateur créé avec succès", data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Erreur lors de la création de l'utilisateur." });
    }
};

userController.updateUser = async (req, res) => {
    try {
        const user = await UserService.update(req.params.id, req.body);
        if (user) {
            res.status(200).json({ success: true, message: "Utilisateur mis à jour avec succès", data: user });
        } else {
            res.status(404).json({ success: false, message: "Utilisateur non trouvé." });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Erreur lors de la mise à jour de l'utilisateur." });
    }
};

userController.deleteUser = async (req, res) => {
    try {
        const user = await UserService.remove(req.params.id);
        if (user) {
            res.status(200).json({ success: true, message: "Utilisateur supprimé avec succès." });
        } else {
            res.status(404).json({ success: false, message: "Utilisateur non trouvé." });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Erreur lors de la suppression de l'utilisateur." });
    }
};

userController.signup = async (req, res) => {
    try {
        const { user, token } = await UserService.signup(req.body);
        res.status(201).json({ success: true, message: "Inscription réussie!", data: { token, user } });
    } catch (error) {
        res.status(500).json({ success: false, message: "Erreur lors de l'inscription." });
    }
};

userController.login = async (req, res) => {
    try {
        const result = await UserService.login(req.body);
        if (result) {
            res.status(200).json({ success: true, message: "Connexion réussie!", data: result });
        } else {
            res.status(401).json({ success: false, message: "Email ou mot de passe incorrect." });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Erreur lors de la connexion." });
    }
};

userController.logout = (req, res) => {
    res.status(200).json({ success: true, message: "Déconnexion réussie!" });
};

module.exports = userController;
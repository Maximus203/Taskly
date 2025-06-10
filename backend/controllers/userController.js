// backend/controllers/userController.js

const UserService = require('../services/userService');

const userController = {};


userController.getAllUsers = async (req, res) => {
    try {
        const users = await UserService.getAll();
        res.success("Utilisateurs récupérés avec succès", users);
    } catch (error) {
        res.fail("Erreur lors de la récupération des utilisateurs.", [], 500);
    }
};

userController.getUserById = async (req, res) => {
    try {
        const user = await UserService.getById(req.params.id);
        if (user) {
            res.success("Utilisateur récupéré avec succès", user);
        } else {
            res.fail("Utilisateur non trouvé.", [], 404);
        }
    } catch (error) {
        res.fail("Erreur lors de la récupération de l'utilisateur.", [], 500);
    }
};

userController.createUser = async (req, res) => {
    try {
        const user = await UserService.create(req.body);
        res.status(201);
        res.success("Utilisateur créé avec succès", user);
    } catch (error) {
        res.fail("Erreur lors de la création de l'utilisateur.", [], 500);
    }
};

userController.updateUser = async (req, res) => {
    try {
        const user = await UserService.update(req.params.id, req.body);
        if (user) {
            res.success("Utilisateur mis à jour avec succès", user);
        } else {
            res.fail("Utilisateur non trouvé.", [], 404);
        }
    } catch (error) {
        res.fail("Erreur lors de la mise à jour de l'utilisateur.", [], 500);
    }
};

userController.deleteUser = async (req, res) => {
    try {
        const user = await UserService.remove(req.params.id);
        if (user) {
            res.success("Utilisateur supprimé avec succès.");
        } else {
            res.fail("Utilisateur non trouvé.", [], 404);
        }
    } catch (error) {
        res.fail("Erreur lors de la suppression de l'utilisateur.", [], 500);
    }
};

userController.signup = async (req, res) => {
    try {
        const { user, token } = await UserService.signup(req.body);
        res.status(201);
        res.success("Inscription réussie!", { token, user });
    } catch (error) {
        res.fail("Erreur lors de l'inscription.", [], 500);
    }
};

userController.login = async (req, res) => {
    try {
        const result = await UserService.login(req.body);
        if (result) {
            res.success("Connexion réussie!", result);
        } else {
            res.fail("Email ou mot de passe incorrect.", [], 401);
        }
    } catch (error) {
        res.fail("Erreur lors de la connexion.", [], 500);
    }
};

userController.logout = (req, res) => {
    res.success("Déconnexion réussie!");
};

module.exports = userController;
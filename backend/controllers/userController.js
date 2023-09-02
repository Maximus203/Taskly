const User = require('../models/user');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const userController = {};


userController.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs." });
    }
};

userController.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "Utilisateur non trouvé." });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de l'utilisateur." });
    }
};

userController.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création de l'utilisateur." });
    }
};

userController.updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.update(req.body);
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "Utilisateur non trouvé." });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour de l'utilisateur." });
    }
};

userController.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.destroy();
            res.status(200).json({ message: "Utilisateur supprimé avec succès." });
        } else {
            res.status(404).json({ message: "Utilisateur non trouvé." });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur." });
    }
};

userController.signup = async (req, res) => {
    try {
        req.body.role_id = 2;
        const user = await User.create(req.body);
        const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token, user, message: "Inscription réussie!" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'inscription." });
    }
};

userController.login = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (user && bcrypt.compareSync(req.body.mot_de_passe, user.mot_de_passe)) {
            const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ token, message: "Connexion réussie!" });
        } else {
            res.status(401).json({ message: "Email ou mot de passe incorrect." });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la connexion." });
    }
};

userController.logout = (req, res) => {
    // Le token est effacer du cote du client.
    res.status(200).json({ message: "Déconnexion réussie!" });
};

module.exports = userController;

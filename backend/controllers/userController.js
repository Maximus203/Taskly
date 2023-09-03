// backend/controllers/userController.js

const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {};


userController.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json({ success: true, message: "Utilisateurs récupérés avec succès", data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: "Erreur lors de la récupération des utilisateurs." });
    }
};

userController.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
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
        const user = await User.create(req.body);
        res.status(201).json({ success: true, message: "Utilisateur créé avec succès", data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Erreur lors de la création de l'utilisateur." });
    }
};

userController.updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.update(req.body);
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
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.destroy();
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
        req.body.role_id = 2;
        const user = await User.create(req.body);
        const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ success: true, message: "Inscription réussie!", data: { token, user } });
    } catch (error) {
        res.status(500).json({ success: false, message: "Erreur lors de l'inscription." });
    }
};

userController.login = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (user && bcrypt.compareSync(req.body.mot_de_passe, user.mot_de_passe)) {
            const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ success: true, message: "Connexion réussie!", data: { token } });
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
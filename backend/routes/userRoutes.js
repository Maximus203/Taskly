// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// Récupération de tous les utilisateurs
router.get('/', authMiddleware.verifyToken, authMiddleware.roleAuthorized(1), userController.getAllUsers);

// Récupération d'un utilisateur par ID
router.get('/:id', authMiddleware.verifyToken, authMiddleware.verifyOwnership, userController.getUserById);

// Création d'un nouvel utilisateur (laissons-le ouvert pour l'inscription)
router.post('/', userController.createUser); // This can be left open for signups. But remember to hash passwords!

// Mise à jour d'un utilisateur
router.put('/:id', authMiddleware.verifyToken, authMiddleware.verifyOwnership, userController.updateUser);

// Suppression d'un utilisateur
router.delete('/:id', authMiddleware.verifyToken, authMiddleware.roleAuthorized(1), userController.deleteUser); // Only admin (role 1) can delete?

// Inscription
router.post('/signup', userController.signup); // This might not need any middleware since it's for new users

// Connexion
router.post('/login', userController.login); // This might not need any middleware since it's for logging in

// Déconnexion
router.post('/logout', authMiddleware.verifyToken, userController.logout);

module.exports = router;

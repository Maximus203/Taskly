// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const userValidation = require('../middlewares/userValidation');
const adaptiveUpload = require('../middlewares/uploadMiddleware');

// Récupération de tous les utilisateurs
router.get('/', authMiddleware.verifyToken, authMiddleware.roleAuthorized(1), userController.getAllUsers);

// Récupération d'un utilisateur par ID
router.get('/:id', authMiddleware.verifyToken, authMiddleware.verifyOwnership, userController.getUserById);

// Création d'un nouvel utilisateur (laissons-le ouvert pour l'inscription)
router.post('/',
    userValidation.createUserRules(),
    adaptiveUpload("profile"),
    userValidation.validate,
    userController.createUser
);

// Mise à jour d'un utilisateur
router.put('/:id',
    adaptiveUpload("profile"),
    authMiddleware.verifyToken,
    authMiddleware.verifyOwnership,
    userValidation.updateUserRules(),
    userValidation.validate,
    userController.updateUser
);

// Suppression d'un utilisateur
router.delete('/:id', authMiddleware.verifyToken, authMiddleware.roleAuthorized(1), userController.deleteUser);

// Inscription
router.post('/signup',
    adaptiveUpload("profile"),
    userValidation.signupRules(),
    userValidation.validate,
    userController.signup
);

// Connexion
router.post('/login',
    userValidation.loginRules(),
    userValidation.validate,
    userController.login
);

// Déconnexion
router.post('/logout', authMiddleware.verifyToken, userController.logout);

module.exports = router;

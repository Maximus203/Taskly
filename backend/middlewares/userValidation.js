// backend/middlewares/userValidation.js

const { body, validationResult } = require('express-validator');
const Role = require('../models/role');

const signupRules = () => [
    body('prenom')
        .isLength({ min: 1 })
        .withMessage('Le prénom est obligatoire.'),

    body('nom')
        .isLength({ min: 1 })
        .withMessage('Le nom est obligatoire.'),

    body('email')
        .isEmail()
        .withMessage('Doit être un email valide.')
        .normalizeEmail(),

    body('mot_de_passe')
        .isLength({ min: 5 })
        .withMessage('Le mot de passe doit contenir au moins 5 caractères.')
        .trim(),

    body('date_de_naissance')
        .optional({ checkFalsy: true })
        .isISO8601()
        .withMessage('Doit être une date valide.'),
];

const loginRules = () => [
    body('email')
        .isEmail()
        .withMessage('Doit être un email valide.')
        .normalizeEmail(),

    body('mot_de_passe')
        .exists()
        .withMessage('Le mot de passe est obligatoire.'),
];

const createUserRules = () => [
    body('role_id')
        .custom(async (value) => {
            if (value) {
                const role = await Role.findByPk(value);
                if (!role) {
                    return Promise.reject('Le rôle spécifié n\'existe pas.');
                }
            }
            return true;
        }),
    body('prenom')
        .isLength({ min: 1 })
        .withMessage('Le prénom est obligatoire.'),

    body('nom')
        .isLength({ min: 1 })
        .withMessage('Le nom est obligatoire.'),

    body('email')
        .isEmail()
        .withMessage('Doit être un email valide.')
        .normalizeEmail(),

    body('mot_de_passe')
        .isLength({ min: 5 })
        .withMessage('Le mot de passe doit contenir au moins 5 caractères.')
        .trim(),

    body('date_de_naissance')
        .optional({ checkFalsy: true })
        .isISO8601()
        .withMessage('Doit être une date valide.')
];

const updateUserRules = () => [
    body('prenom')
        .optional()
        .isLength({ min: 1 })
        .withMessage('Le prénom est obligatoire.'),

    body('nom')
        .optional()
        .isLength({ min: 1 })
        .withMessage('Le nom est obligatoire.'),

    body('email')
        .optional()
        .isEmail()
        .withMessage('Doit être un email valide.')
        .normalizeEmail(),

    body('mot_de_passe')
        .optional()
        .isLength({ min: 5 })
        .withMessage('Le mot de passe doit contenir au moins 5 caractères.')
        .trim(),
];

const updateProfileRules = () => [
    body('photo_de_profil')
        .optional()
        .isString()
        .withMessage('La photo de profil doit être une URL valide ou un chemin de fichier.'),

    body('date_de_naissance')
        .optional()
        .isISO8601()
        .withMessage('Doit être une date valide.')
];

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }

    const extractedErrors = {};
    errors.array().forEach(err => extractedErrors[err.param] = err.msg);

    return res.status(422).json({
        success: false,
        errors: extractedErrors,
    });
}

module.exports = {
    signupRules,
    loginRules,
    createUserRules,
    updateUserRules,
    updateProfileRules,
    validate,
}

// backend/middlewares/taskValidation.js
const { body, validationResult } = require('express-validator');
const Task = require('../models/task');

const VALID_STATUSES = ['pending', 'in_progress', 'completed'];

const createTaskRules = () => [
    body('libelle')
        .isLength({ min: 1 })
        .withMessage('Le libellé est obligatoire.'),

    body('description')
        .optional()
        .isString()
        .withMessage('La description doit être une chaîne de caractères.'),

    body('status')
        .isIn(VALID_STATUSES)
        .withMessage('Le status n\'est pas valide.'),

    body('delai')
        .optional()
        .isISO8601()
        .withMessage('Doit être une date valide.'),

    body('porteur_id')
        .optional()
        .isInt()
        .withMessage('Le porteur ID doit être un nombre entier.'),

    body('projet_id')
        .isInt()
        .withMessage('Le projet ID est obligatoire et doit être un nombre entier.')
];

const updateTaskRules = () => [
    body('libelle')
        .optional()
        .isLength({ min: 1 })
        .withMessage('Le libellé est obligatoire.'),

    body('description')
        .optional()
        .isString()
        .withMessage('La description doit être une chaîne de caractères.'),

    body('status')
        .optional()
        .isIn(VALID_STATUSES)
        .withMessage('Le status n\'est pas valide.'),

    body('delai')
        .optional()
        .isISO8601()
        .withMessage('Doit être une date valide.'),

    body('porteur_id')
        .optional()
        .isInt()
        .withMessage('Le porteur ID doit être un nombre entier.'),

    body('projet_id')
        .optional()
        .isInt()
        .withMessage('Le projet ID doit être un nombre entier.')
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
    createTaskRules,
    updateTaskRules,
    validate,
}

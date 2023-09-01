const { body, validationResult } = require('express-validator');
const Project = require('../models/project');

const createProjectRules = () => [
    body('titre')
        .isLength({ min: 1 })
        .withMessage('Le titre est obligatoire.'),

    body('description')
        .optional()
        .isString()
        .withMessage('La description doit être une chaîne de caractères.'),

    body('status')
        .isIn(['pending', 'in_progress', 'completed'])  // Adaptez cette liste selon vos besoins
        .withMessage('Le status n\'est pas valide.'),

    body('importance')
        .isIn(['low', 'medium', 'high']) // Supposition de trois niveaux d'importance
        .withMessage('L\'importance n\'est pas valide.'),

    body('image')
        .optional()
        .isString()
        .withMessage('L\'image doit être une chaîne de caractères.')
];

const updateProjectRules = () => [
    body('titre')
        .optional()
        .isLength({ min: 1 })
        .withMessage('Le titre est obligatoire.'),

    body('description')
        .optional()
        .isString()
        .withMessage('La description doit être une chaîne de caractères.'),

    body('status')
        .optional()
        .isIn(['pending', 'in_progress', 'completed'])
        .withMessage('Le status n\'est pas valide.'),

    body('importance')
        .optional()
        .isIn(['low', 'medium', 'high'])
        .withMessage('L\'importance n\'est pas valide.'),

    body('image')
        .optional()
        .isString()
        .withMessage('L\'image doit être une chaîne de caractères.')
];

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }

    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(422).json({
        errors: extractedErrors,
    });
}

module.exports = {
    createProjectRules,
    updateProjectRules,
    validate,
}

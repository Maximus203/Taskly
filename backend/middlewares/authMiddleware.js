// backend/middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authMiddleware = {};

// Middleware pour vérifier le JWT
authMiddleware.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    if (!token) return res.status(403).json({ message: 'Un token est requis.' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        console.log(verified)
        req.user = verified;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token invalide.' });
    }
};

// Middleware pour vérifier le rôle de l'utilisateur
authMiddleware.roleAuthorized = (role) => {
    return (req, res, next) => {
        User.findByPk(req.user.id)
            .then(user => {
                if (user && user.role_id === role) {
                    next();
                } else {
                    res.status(403).json({ message: "Accès refusé." });
                }
            })
            .catch(err => {
                res.status(500).json({ message: "Erreur lors de la vérification du rôle." });
            });
    };
};

// Middleware pour vérifier la propriété (si nécessaire)
authMiddleware.verifyOwnership = (req, res, next) => {
    const userId = req.params.id;

    if (req.user.id === parseInt(userId)) {
        next();
    } else {
        res.status(403).json({ message: "Vous n'avez pas les droits pour accéder à cette ressource." });
    }
};

module.exports = authMiddleware;

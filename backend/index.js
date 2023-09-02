const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./config/db');
const Role = require('./models/role');

// Synchronisez la base de données
sequelize.sync({ force: false })  // Utilisez { force: true } seulement si vous voulez recréer toutes les tables à chaque démarrage.
    .then(() => {
        console.log("Base de données synchronisée.");
        // Initialisez les rôles
        Role.initializeRoles();
    })
    .catch(error => {
        console.error("Erreur lors de la synchronisation de la base de données:", error);
    });

const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const projectRoutes = require('./routes/projectRoutes');

const app = express();

// 2. Middlewares Globaux
app.use(morgan('dev'));

// Utiliser les méthodes natives d'Express pour parser les requêtes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Utiliser CORS pour permettre les requêtes cross-origin (Si nécessaire)
app.use(cors());

// Ajoutez un middleware de sécurité si vous installez helmet
// const helmet = require('helmet');
// app.use(helmet());

// 3. Intégration des Routes
app.get('/taskly-api', (req, res) => {
    res.status(200).json({ message: 'Bienvenue dans Taskly' });
});
app.use('/taskly-api/users', userRoutes);
app.use('/taskly-api/tasks', taskRoutes);
app.use('/taskly-api/projects', projectRoutes);

// Pour d'autres routes non spécifiées, retournez une erreur 404
app.all('*', (req, res) => {
    res.status(404).json({ message: 'Page non trouvée.' });
});

//Ajoutez un middleware de gestion des erreurs
app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).json({ message: 'Erreur côté serveur.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}/taskly-api/`);
});

module.exports = app;

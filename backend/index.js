const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./config/db');
const Role = require('./models/role');

const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const projectRoutes = require('./routes/projectRoutes');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/static/uploads', express.static('./uploads'));

app.get('/taskly-api', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Bienvenue dans Taskly',
        data: {}
    });
});

app.use('/taskly-api/users', userRoutes);
app.use('/taskly-api/tasks', taskRoutes);
app.use('/taskly-api/projects', projectRoutes);

app.all('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Page non trouvée.',
        data: {}
    });
});

// Middleware de gestion des erreurs
app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Erreur côté serveur.',
        data: {}
    });
});

sequelize.sync({ force: false })
    .then(() => {
        console.log("Base de données synchronisée.");
        Role.initializeRoles();
    })
    .catch(error => {
        console.error("Erreur lors de la synchronisation de la base de données:", error);
    });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}/taskly-api/`);
});

module.exports = app;

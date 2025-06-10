const { Sequelize } = require('sequelize');

// Configuration pour SQLite
const DB_STORAGE = process.env.DB_STORAGE || 'taskly.sqlite';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: DB_STORAGE,
    logging: false
});

sequelize.authenticate()
    .then(() => {
        console.log('Connexion à la base de données établie avec succès.');
    })
    .catch(err => {
        console.error('Impossible de se connecter à la base de données :', err);
    });

module.exports = sequelize;

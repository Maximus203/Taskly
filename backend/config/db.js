const { Sequelize } = require('sequelize');

// Utilisation des informations de connexion par défaut pour MySQL
const DB_NAME = process.env.DB_NAME || 'taskly-db';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || '3306';
const DB_DIALECT = process.env.DB_DIALECT || 'mysql';

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT,
    logging: false, // Désactive les logs SQL dans la console
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
        acquire: 30000
    }
});

sequelize.authenticate()
    .then(() => {
        console.log('Connexion à la base de données établie avec succès.');
    })
    .catch(err => {
        console.error('Impossible de se connecter à la base de données :', err);
    });

module.exports = sequelize;

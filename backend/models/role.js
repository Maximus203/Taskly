const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Role = sequelize.define('Role', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom_role: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
}, {
    tableName: 'roles'
});

module.exports = Role;

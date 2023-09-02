const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Project = sequelize.define('Project', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('pending', 'in_progress', 'completed'),
        allowNull: false,
        defaultValue: 'pending'
    },
    importance: {
        type: DataTypes.ENUM('low', 'medium', 'high'),
        allowNull: false,
        defaultValue: 'medium'
    }

}, {
    tableName: 'projects'
});

module.exports = Project;

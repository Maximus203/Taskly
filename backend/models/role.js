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

Role.initializeRoles = async function () {
    try {
        const roles = ["admin", "simple_user"];

        for (let roleName of roles) {
            let role = await Role.findOne({ where: { nom_role: roleName } });

            if (!role) {
                await Role.create({ nom_role: roleName });
            }
        }

        console.log("Rôles initialisés avec succès.");
    } catch (error) {
        console.error("Erreur lors de l'initialisation des rôles:", error);
    }
};

module.exports = Role;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Role = require('./role'); // Importez le modèle Role
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    prenom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date_de_naissance: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    mot_de_passe: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            const hash = bcrypt.hashSync(value, 10);
            this.setDataValue('mot_de_passe', hash);
        }
    },
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: true
    },
    photo_de_profil: {
        type: DataTypes.STRING,
        allowNull: true
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Role,    // C'est une référence à un autre modèle (Role)
            key: 'id'       // Ceci est le champ qui sera utilisé pour la relation
        }
    }
}, {
    tableName: 'users',
    hooks: {
        beforeCreate: (user) => {
            if (user.mot_de_passe) {
                const salt = bcrypt.genSaltSync(10);
                user.mot_de_passe = bcrypt.hashSync(user.mot_de_passe, salt);
            }
        },
        beforeUpdate: (user) => {
            if (user.changed('mot_de_passe')) {
                const salt = bcrypt.genSaltSync(10);
                user.mot_de_passe = bcrypt.hashSync(user.mot_de_passe, salt);
            }
        }
    }
});

User.belongsTo(Role, { foreignKey: 'role_id' });  // Un User appartient à un Role
Role.hasMany(User, { foreignKey: 'role_id' });   // Un Role a plusieurs Users


module.exports = User;

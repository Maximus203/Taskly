const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
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
        allowNull: true
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

module.exports = User;

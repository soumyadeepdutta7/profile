const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Token = sequelize.define('Token', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    token: {
        type: DataTypes.STRING(512),
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('refresh', 'verification', 'reset'),
        allowNull: false
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

module.exports = Token;

const sequelize = require('../config/db');
const User = require('./User');
const Token = require('./Token');

// Define Associations
User.hasMany(Token, { foreignKey: 'userId', onDelete: 'CASCADE' });
Token.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
    sequelize,
    User,
    Token
};

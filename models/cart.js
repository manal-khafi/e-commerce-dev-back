const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const user = require('./user');

const cart = sequelize.define('cart', {
    id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
    idUtilisateur: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  produits: {
    type: DataTypes.JSON, // array de produits avec quantité
    allowNull: true,
  },
  prixTotal: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
}, {
  tableName: 'carts',
});

user.hasOne(cart, { foreignKey: 'idUtilisateur' });
cart.belongsTo(user, { foreignKey: 'idUtilisateur' });

module.exports = cart;

// models/User.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Import your Sequelize instance

const product = sequelize.define('product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  titre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  prix: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  quantite_stock: {
    type: DataTypes.INTEGER,
    allowNull: true,   
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: true,
    unique: true,
    },
});

module.exports = product;
